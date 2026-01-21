import React, { useRef, useEffect, useState } from 'react';
import TimePickerModal from './TimePickerModal';

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
  setNotes
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pickerOpen, setPickerOpen] = useState<'bed' | 'wake' | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [notes]);

  const handleRating = (rating: number) => {
    setQuality(rating);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <>
      <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <span className="material-symbols-outlined">bedtime</span>
          </div>
          <h3 className="text-lg font-bold">Sleep Quality</h3>
        </div>
        
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
                <span
                  className={`material-symbols-outlined text-[28px] transition-colors ${
                    star <= quality 
                      ? "text-primary fill-1" 
                      : "text-gray-600"
                  }`}
                  style={{ fontVariationSettings: star <= quality ? "'FILL' 1" : "'FILL' 0" }}
                >
                  star
                </span>
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
              onClick={() => setPickerOpen('bed')}
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
              onClick={() => setPickerOpen('wake')}
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
      </section>

      <TimePickerModal 
        isOpen={pickerOpen === 'bed'} 
        onClose={() => setPickerOpen(null)}
        initialTime={bedTime}
        onSelectTime={setBedTime}
        title="Set Bed Time"
      />
      <TimePickerModal 
        isOpen={pickerOpen === 'wake'} 
        onClose={() => setPickerOpen(null)}
        initialTime={wakeTime}
        onSelectTime={setWakeTime}
        title="Set Wake Time"
      />
    </>
  );
};

export default SleepSection;