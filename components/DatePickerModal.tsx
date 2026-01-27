import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ isOpen, onClose, selectedDate, onSelectDate }) => {
  const [visible, setVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setCurrentMonth(new Date(selectedDate));
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelectDate(newDate);
    onClose();
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  if (!visible && !isOpen) return null;

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div 
        className={`relative w-full max-w-md bg-[#1f2e18] rounded-t-[2rem] p-6 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col gap-6 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto cursor-grab" />
        
        <div className="flex items-center justify-between text-white">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <Icon icon="material-symbols:chevron-left" />
          </button>
          <h3 className="text-lg font-bold">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-full">
            <Icon icon="material-symbols:chevron-right" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center gap-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <div key={d} className="text-xs text-gray-500 font-bold py-2">{d}</div>
          ))}
          {blanks.map(b => <div key={`blank-${b}`} />)}
          {days.map(d => {
            const isSelected = 
              d === selectedDate.getDate() && 
              currentMonth.getMonth() === selectedDate.getMonth() && 
              currentMonth.getFullYear() === selectedDate.getFullYear();
            
            return (
              <button
                key={d}
                onClick={() => handleDateClick(d)}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all mx-auto ${
                  isSelected 
                    ? 'bg-primary text-background-dark shadow-[0_0_10px_rgba(91,236,19,0.3)]' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;