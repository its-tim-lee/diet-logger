import React, { useState, useEffect } from 'react';
import VoiceWaveform from './VoiceWaveform';

interface DailyNotesSectionProps {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

const DailyNotesSection: React.FC<DailyNotesSectionProps> = ({
  enabled,
  setEnabled,
  notes,
  setNotes
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (!enabled) return;
    if (isRecording) {
        setIsRecording(false);
        // Simulate speech-to-text conversion
        setNotes((prev) => (prev ? prev + "\n" : "") + "Had a really productive day today. Felt energized after the workout.");
    } else {
        setIsRecording(true);
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
  }

  // Simulate stopping automatically after 3 seconds for demo purposes
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isRecording) {
        timeout = setTimeout(() => {
            setIsRecording(false);
            setNotes((prev) => (prev ? prev + "\n" : "") + "Had a really productive day today. Felt energized after the workout.");
        }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isRecording, setNotes]);

  return (
    <section className={`bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-4 group transition-opacity ${enabled ? 'opacity-100' : 'opacity-80'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full transition-colors ${enabled ? 'bg-primary/20 text-primary' : 'bg-gray-700 text-gray-400'}`}>
            <span className="material-symbols-outlined">edit_note</span>
          </div>
          <h3 className={`text-lg font-bold transition-colors ${enabled ? 'text-white' : 'text-gray-500'}`}>Daily Notes</h3>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
      
      <div 
        className={`relative transition-all duration-300 ease-in-out ${
            enabled ? 'pointer-events-auto' : 'pointer-events-none grayscale'
        }`}
      >
        <textarea
          className="w-full bg-input-bg rounded-lg border-none text-sm text-white placeholder-gray-500 p-4 pr-12 focus:ring-1 focus:ring-primary min-h-[120px] resize-none"
          placeholder="Add any other notes about your day..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={!enabled}
        />
        <button 
          className={`absolute top-3 right-3 h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 group ${
            isRecording ? 'bg-primary text-background-dark' : 'bg-input-bg border border-gray-600 hover:border-primary text-gray-400 hover:text-primary'
          }`}
          onClick={toggleRecording}
          disabled={!enabled}
        >
          {isRecording ? (
            <VoiceWaveform />
          ) : (
            <span className="material-symbols-outlined text-[20px]">mic</span>
          )}
        </button>
      </div>
    </section>
  );
};

export default DailyNotesSection;