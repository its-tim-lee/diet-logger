import React, { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import TimePickerModal from "./TimePickerModal";
import { useToggleState } from "../src/hooks/useToggleState";

interface SleepSectionProps {
  quality: number;
  setQuality: (val: number) => void;
  bedTime: string;
  setBedTime: (val: string) => void;
  wakeTime: string;
  setWakeTime: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
}

const SleepSection: React.FC<SleepSectionProps> = ({
  quality,
  setQuality,
  bedTime,
  setBedTime,
  wakeTime,
  setWakeTime,
  notes,
  setNotes,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pickerOpen, setPickerOpen] = useState<"bed" | "wake" | null>(null);
  const [isExpanded, toggle] = useToggleState("sleep");

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [notes]);

  const handleRating = (rating: number) => {
    setQuality(rating);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <>
      <section className={`bg-white dark:bg-card-dark rounded-xl shadow-sm transition-all duration-200 motion-reduce:transition-none ${
        isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'
      }`}>
        <div
          className={`flex items-center justify-between transition-opacity motion-reduce:transition-none ${
            !isExpanded ? "opacity-50" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20 text-primary">
              <Icon icon="material-symbols:bedtime" className="text-2xl" />
            </div>
            <h3 className="text-lg font-bold">Sleep Quality</h3>
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
          className={`transition-all duration-300 ease-in-out motion-reduce:transition-none overflow-hidden space-y-6 ${
            isExpanded
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
          style={{
            transitionProperty: "max-height, opacity",
            transitionDuration: "300ms, 200ms",
          }}
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
              How did you sleep?
            </label>
            <div className="flex justify-between items-center bg-input-bg rounded-full p-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <Icon
                    icon={
                      star <= quality
                        ? "material-symbols:star"
                        : "material-symbols:star-outline"
                    }
                    className={`text-3xl transition-colors ${
                      star <= quality ? "text-primary" : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                Bed Time
              </label>
              <button
                onClick={() => setPickerOpen("bed")}
                className="bg-input-bg rounded-full h-12 flex items-center px-4 relative group hover:ring-1 ring-primary/50 transition-all text-white font-bold text-sm"
              >
                {bedTime}
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                Wake Time
              </label>
              <button
                onClick={() => setPickerOpen("wake")}
                className="bg-input-bg rounded-full h-12 flex items-center px-4 relative group hover:ring-1 ring-primary/50 transition-all text-white font-bold text-sm"
              >
                {wakeTime}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
              Notes
            </label>
            <textarea
              ref={textareaRef}
              className="w-full bg-input-bg rounded-lg border-none text-sm text-white placeholder-gray-500 p-4 focus:ring-1 focus:ring-primary min-h-[80px] overflow-hidden resize-none transition-all"
              placeholder="Briefly describe your sleep or dreams..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </section>

      <TimePickerModal
        isOpen={pickerOpen === "bed"}
        onClose={() => setPickerOpen(null)}
        initialTime={bedTime}
        onSelectTime={setBedTime}
        title="Set Bed Time"
      />
      <TimePickerModal
        isOpen={pickerOpen === "wake"}
        onClose={() => setPickerOpen(null)}
        initialTime={wakeTime}
        onSelectTime={setWakeTime}
        title="Set Wake Time"
      />
    </>
  );
};

export default SleepSection;
