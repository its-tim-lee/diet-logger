import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { ExerciseType } from '../types';
import TimePickerModal from './TimePickerModal';

interface ExerciseSectionProps {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  type: ExerciseType | string;
  setType: (val: ExerciseType | string) => void;
  duration: number;
  setDuration: (val: number) => void;
  startTime: string;
  setStartTime: (val: string) => void;
}

const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  enabled,
  setEnabled,
  type,
  setType,
  duration,
  setDuration,
  startTime,
  setStartTime
}) => {
  const types = [ExerciseType.CARDIO, ExerciseType.WORKOUT, ExerciseType.YOGA];
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customType, setCustomType] = useState('');
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customType.trim()) {
        setType(customType);
        setIsAddingCustom(false);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20 text-primary">
              <Icon icon="material-symbols:fitness-center" className="text-2xl" />
            </div>
            <h3 className="text-lg font-bold">Exercise</h3>
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

        {enabled && (
          <>
            <div className="flex flex-col gap-2 animate-fadeIn">
              <label className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                Type
              </label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 items-center">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                      type === t
                        ? "bg-primary text-background-dark shadow-[0_0_10px_rgba(91,236,19,0.3)] border-primary"
                        : "bg-input-bg text-gray-400 border-transparent hover:border-primary/30 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
                
                {!types.includes(type as ExerciseType) && type !== '' && !isAddingCustom && (
                    <button
                      onClick={() => setIsAddingCustom(true)}
                      className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border bg-primary text-background-dark shadow-[0_0_10px_rgba(91,236,19,0.3)] border-primary"
                    >
                      {type}
                    </button>
                )}

                {isAddingCustom ? (
                    <form onSubmit={handleCustomSubmit} className="flex-shrink-0">
                        <input 
                          autoFocus
                          type="text" 
                          value={customType} 
                          onChange={(e) => setCustomType(e.target.value)}
                          onBlur={() => { if(!customType) setIsAddingCustom(false); }}
                          className="bg-input-bg text-white border border-primary rounded-full px-4 py-1.5 text-sm focus:ring-0 w-28"
                          placeholder="Activity..."
                        />
                    </form>
                ) : (
                  <button 
                      onClick={() => setIsAddingCustom(true)}
                      className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-full transition-all bg-input-bg text-gray-400 border border-transparent hover:border-primary/30 hover:text-white group"
                  >
                      <Icon icon="material-symbols:add" className="text-xl group-hover:text-primary transition-colors" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                    Duration
                  </label>
                  <span className="text-primary font-bold text-lg">
                    {duration} <span className="text-xs text-white">min</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                  Start Time
                </label>
                <button
                  onClick={() => setIsTimePickerOpen(true)}
                  className="bg-input-bg rounded-full h-12 flex items-center px-4 w-full relative group hover:ring-1 ring-primary/50 transition-all"
                >
                  <Icon icon="material-symbols:schedule" className="text-gray-400 mr-2 text-sm" />
                  <span className="text-white font-bold text-sm flex-grow text-left">
                    {startTime}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <TimePickerModal
        isOpen={isTimePickerOpen}
        onClose={() => setIsTimePickerOpen(false)}
        initialTime={startTime}
        onSelectTime={setStartTime}
        title="Set Start Time"
      />
    </>
  );
};

export default ExerciseSection;