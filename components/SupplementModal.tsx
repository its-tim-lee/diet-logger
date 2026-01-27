import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface SupplementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const COMMON_SUPPLEMENTS = [
  "Magnesium Glycinate", "Vitamin C", "Zinc", "Probiotics", "Creatine Monohydrate",
  "Ashwagandha", "Melatonin", "Iron", "Vitamin B12", "Collagen Peptides", "L-Theanine"
];

const SupplementModal: React.FC<SupplementModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setSearchTerm('');
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filtered = COMMON_SUPPLEMENTS.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!visible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div 
        className={`relative w-full max-w-md bg-[#1f2e18] rounded-t-[2rem] p-6 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col gap-6 max-h-[80vh] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto cursor-grab" />
        
        <h3 className="text-xl font-bold text-white text-center">Add Supplement</h3>

        <div className="bg-input-bg rounded-xl flex items-center px-4 h-12 border border-transparent focus-within:border-primary/50 transition-colors">
          <Icon icon="material-symbols:search" className="text-gray-400 mr-2" />
          <input 
            className="bg-transparent border-none text-white w-full focus:ring-0 p-0 text-sm placeholder-gray-500"
            placeholder="Search supplements..."
            autoFocus
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {filtered.map((supp) => (
            <button
              key={supp}
              onClick={() => { onAdd(supp); onClose(); }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors group"
            >
              <span className="font-medium">{supp}</span>
              <Icon icon="material-symbols:add-circle" className="text-gray-500 group-hover:text-primary transition-colors" />
            </button>
          ))}
          {filtered.length === 0 && searchTerm && (
            <button
                onClick={() => { onAdd(searchTerm); onClose(); }}
                className="flex items-center justify-between p-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20"
            >
                <span className="font-medium">Add "{searchTerm}"</span>
                <Icon icon="material-symbols:add" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplementModal;