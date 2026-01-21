import React, { useState } from 'react';
import { FoodItem } from '../types';

interface FoodDetailsSectionProps {
  items: FoodItem[];
  addItem: (name: string) => void;
  updateItem: (id: string, name: string) => void;
  onOpenSearch: () => void;
}

const FoodDetailsSection: React.FC<FoodDetailsSectionProps> = ({ items, addItem, updateItem, onOpenSearch }) => {
  const [suggestions, setSuggestions] = useState(["Lemon Dressing", "Feta Cheese", "Avocado"]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [removedChip, setRemovedChip] = useState<string | null>(null);

  const handleAddSuggestion = (suggestion: string) => {
    setRemovedChip(suggestion);
    setTimeout(() => {
        addItem(suggestion);
        setSuggestions(suggestions.filter(s => s !== suggestion));
        setRemovedChip(null);
    }, 400); // Wait for animation
  };

  const handleStartEdit = (item: FoodItem) => {
    setEditId(item.id);
    setEditValue(item.name);
  };

  const handleSaveEdit = (id: string) => {
      if (editValue.trim()) {
          updateItem(id, editValue);
      }
      setEditId(null);
  };

  return (
    <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <span className="material-symbols-outlined">menu_book</span>
          </div>
          <h3 className="text-lg font-bold">Food Details</h3>
        </div>
        <button 
          className="flex items-center justify-center h-8 w-8 rounded-full bg-input-bg hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
          onClick={onOpenSearch}
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-input-bg rounded-[12px] p-4 flex items-center justify-between gap-3 relative group animate-fadeIn">
            <div className="flex flex-col flex-grow">
              {editId === item.id ? (
                  <input 
                    className="bg-transparent border-b border-primary text-white font-bold text-base focus:outline-none p-0 focus:ring-0"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                    onBlur={() => handleSaveEdit(item.id)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(item.id);
                    }}
                  />
              ) : (
                <h4 className="font-bold text-white text-base">{item.name}</h4>
              )}
              
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1 font-medium">
                <span>{item.amount}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-500"></span>
                <span>{item.meal}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-gray-500"></span>
                <span>{item.time}</span>
              </div>
            </div>
            <button 
                onClick={() => editId === item.id ? handleSaveEdit(item.id) : handleStartEdit(item)}
                className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">{editId === item.id ? 'check' : 'edit'}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary text-sm animate-pulse">auto_awesome</span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">AI Suggestions based on photo</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 min-h-[40px]">
          {suggestions.map((s) => (
            <button 
              key={s} 
              onClick={() => handleAddSuggestion(s)}
              className={`flex items-center gap-1 bg-[#102410] hover:bg-[#1a351a] border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  removedChip === s ? 'animate-fade-out' : ''
              }`}
            >
              <span className="material-symbols-outlined text-sm">add</span>
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodDetailsSection;