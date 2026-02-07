import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import VoiceWaveform from "./VoiceWaveform";
import { useToggleState } from "../src/hooks/useToggleState";

interface DailyNotesSectionProps {
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

const DailyNotesSection: React.FC<DailyNotesSectionProps> = ({
  notes,
  setNotes,
}) => {
  // Use hook for toggle state with localStorage persistence
  const [isExpanded, toggle] = useToggleState("daily-notes");

  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (!isExpanded) return;
    if (isRecording) {
      setIsRecording(false);
      // Simulate speech-to-text conversion
      setNotes(
        (prev) =>
          (prev ? prev + "\n" : "") +
          "Had a really productive day today. Felt energized after the workout."
      );
    } else {
      setIsRecording(true);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  // Simulate stopping automatically after 3 seconds for demo purposes
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isRecording) {
      timeout = setTimeout(() => {
        setIsRecording(false);
        setNotes(
          (prev) =>
            (prev ? prev + "\n" : "") +
            "Had a really productive day today. Felt energized after the workout."
        );
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isRecording, setNotes]);


  return (
    <section className={`bg-white dark:bg-card-dark rounded-xl shadow-sm transition-all duration-200 motion-reduce:transition-none ${
      isExpanded ? 'p-5 space-y-4' : 'py-3 px-5'
    }`}>
      <div
        className={`flex items-center justify-between transition-opacity duration-200 motion-reduce:transition-none ${
          !isExpanded ? "opacity-50" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Icon icon="material-symbols:edit-note" className="text-2xl" />
          </div>
          <h3 className="text-lg font-bold">Daily Notes</h3>
        </div>
        <button
          onClick={toggle}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
          aria-expanded={isExpanded}
        >
          <Icon
            icon="material-symbols:expand-more"
            className={`text-2xl transition-transform ${isExpanded ? "" : "-rotate-90"}`}
          />
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out motion-reduce:transition-none overflow-hidden ${
          isExpanded
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {isExpanded && (
          <div className="relative">
            <textarea
              className="w-full bg-input-bg rounded-lg border-none text-sm text-white placeholder-gray-500 p-4 pr-12 focus:ring-1 focus:ring-primary min-h-[120px] resize-none"
              placeholder="Add any other notes about your day..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={!isExpanded}
            />
            <button
              className={`absolute top-3 right-3 h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 group ${
                isRecording
                  ? "bg-primary text-background-dark"
                  : "bg-input-bg border border-gray-600 hover:border-primary text-gray-400 hover:text-primary"
              }`}
              onClick={toggleRecording}
              disabled={!isExpanded}
            >
              {isRecording ? (
                <VoiceWaveform />
              ) : (
                <Icon icon="material-symbols:mic" className="text-xl" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyNotesSection;
