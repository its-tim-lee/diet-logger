import React, { useState, useEffect } from 'react';

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTime: string;
  onSelectTime: (time: string) => void;
  title: string;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ isOpen, onClose, initialTime, onSelectTime, title }) => {
  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const [h, m] = initialTime.split(':');
      setSelectedHour(h);
      setSelectedMinute(m);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialTime]);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleSave = () => {
    onSelectTime(`${selectedHour}:${selectedMinute}`);
    onClose();
  };

  if (!visible && !isOpen) return null;

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
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>

        <div className="flex justify-center items-center gap-4 h-48 relative">
           {/* Selection Indicator */}
           <div className="absolute top-1/2 left-0 right-0 h-10 -mt-5 bg-primary/10 border-y border-primary/30 pointer-events-none" />

          {/* Hours */}
          <div className="h-full overflow-y-scroll no-scrollbar py-20 snap-y snap-mandatory text-center w-20">
            {hours.map(h => (
              <div 
                key={h} 
                onClick={() => setSelectedHour(h)}
                className={`h-10 flex items-center justify-center snap-center text-xl font-bold transition-all cursor-pointer ${selectedHour === h ? 'text-primary scale-110' : 'text-gray-500'}`}
              >
                {h}
              </div>
            ))}
          </div>

          <span className="text-2xl font-bold text-white pb-1">:</span>

          {/* Minutes */}
          <div className="h-full overflow-y-scroll no-scrollbar py-20 snap-y snap-mandatory text-center w-20">
            {minutes.map(m => (
              <div 
                key={m} 
                onClick={() => setSelectedMinute(m)}
                className={`h-10 flex items-center justify-center snap-center text-xl font-bold transition-all cursor-pointer ${selectedMinute === m ? 'text-primary scale-110' : 'text-gray-500'}`}
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-primary text-background-dark py-4 rounded-full font-bold text-lg shadow-[0_0_15px_rgba(91,236,19,0.3)] active:scale-95 transition-transform"
        >
          Set Time
        </button>
      </div>
    </div>
  );
};

export default TimePickerModal;