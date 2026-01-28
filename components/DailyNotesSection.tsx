import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import VoiceWaveform from "./VoiceWaveform";
import { useToggleState } from "../src/hooks/useToggleState";

interface DailyNotesSectionProps {
  enabled?: boolean;
  setEnabled?: (val: boolean) => void;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
}

const DailyNotesSection: React.FC<DailyNotesSectionProps> = ({
  enabled,
  setEnabled,
  notes,
  setNotes,
}) => {
  // Use hook for toggle state with localStorage persistence
  const [isExpanded, toggle] = useToggleState("daily-notes");
  // Use hook value if props not provided (backwards compatibility)
  const expanded = enabled ?? isExpanded;

  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    if (!expanded) return;
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

  const handleToggle = () => {
    if (setEnabled) {
      // If props are provided, use them (backwards compatibility)
      setEnabled(!expanded);
    } else {
      // Otherwise use hook toggle
      toggle();
    }
  };

  return (
    <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-4">
      <div
        className={`flex items-center justify-between transition-opacity duration-200 motion-reduce:transition-none ${
          expanded ? "opacity-100" : "opacity-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Icon icon="material-symbols:edit-note" className="text-2xl" />
          </div>
          <h3 className="text-lg font-bold">Daily Notes</h3>
        </div>
        <button
          onClick={handleToggle}
          className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={expanded ? "Collapse section" : "Expand section"}
          aria-expanded={expanded}
        >
          <Icon
            icon="mdi:chevron-down"
            className={`text-2xl text-gray-400 transition-transform duration-200 motion-reduce:transition-none ${
              expanded ? "rotate-0" : "-rotate-90"
            }`}
          />
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out motion-reduce:transition-none overflow-hidden ${
          expanded
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {expanded && (
          <div className="relative">
            <textarea
              className="w-full bg-input-bg rounded-lg border-none text-sm text-white placeholder-gray-500 p-4 pr-12 focus:ring-1 focus:ring-primary min-h-[120px] resize-none"
              placeholder="Add any other notes about your day..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={!expanded}
            />
            <button
              className={`absolute top-3 right-3 h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 group ${
                isRecording
                  ? "bg-primary text-background-dark"
                  : "bg-input-bg border border-gray-600 hover:border-primary text-gray-400 hover:text-primary"
              }`}
              onClick={toggleRecording}
              disabled={!expanded}
            >
              {isRecording ? (
                <VoiceWaveform />
              ) : (
                <Icon icon="material-symbols:mic" className="text-[20px]" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyNotesSection;
