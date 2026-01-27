import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { FoodItem } from "../types";

interface FoodDetailsSectionProps {
  items: FoodItem[];
  addItem: (name: string) => void;
  updateItem: (id: string, name: string) => void;
  deleteItem: (id: string) => void;
  onOpenSearch: () => void;
}

const FoodDetailsSection: React.FC<FoodDetailsSectionProps> = ({
  items,
  addItem,
  updateItem,
  deleteItem,
  onOpenSearch,
}) => {
  const [suggestions, setSuggestions] = useState([
    "Lemon Dressing",
    "Feta Cheese",
    "Avocado",
  ]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [removedChip, setRemovedChip] = useState<string | null>(null);

  const handleAddSuggestion = (suggestion: string) => {
    setRemovedChip(suggestion);
    setTimeout(() => {
      addItem(suggestion);
      setSuggestions(suggestions.filter((s) => s !== suggestion));
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

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
    if (editId === id) {
      setEditId(null);
      setEditValue("");
    }
  };

  return (
    <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Icon icon="material-symbols:menu-book" />
          </div>
          <h3 className="text-lg font-bold">Food Details</h3>
        </div>
        <button
          className="flex items-center justify-center h-8 w-8 rounded-full bg-input-bg hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
          onClick={onOpenSearch}
        >
          <Icon icon="material-symbols:add" className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-input-bg rounded-[12px] p-4 flex items-center justify-between gap-3 relative group animate-fadeIn"
          >
            <div className="flex flex-col flex-grow">
              {editId === item.id ? (
                <input
                  className="bg-transparent border-b border-primary text-white font-bold text-base focus:outline-none p-0 focus:ring-0"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                  onBlur={() => handleSaveEdit(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(item.id);
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
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() =>
                  editId === item.id
                    ? handleSaveEdit(item.id)
                    : handleStartEdit(item)
                }
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                <Icon
                  icon={
                    editId === item.id
                      ? "material-symbols:check"
                      : "material-symbols:edit"
                  }
                  className="text-lg"
                />
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="h-8 w-8 flex items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
              >
                <Icon icon="material-symbols:delete" className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <div className="flex items-center gap-2 mb-3">
          <Icon
            icon="material-symbols:auto-awesome"
            className="text-primary text-sm animate-pulse"
          />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            AI Suggestions based on photo
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 min-h-[40px]">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleAddSuggestion(s)}
              className={`flex items-center gap-1 bg-[#102410] hover:bg-[#1a351a] border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                removedChip === s ? "animate-fade-out" : ""
              }`}
            >
              <Icon icon="material-symbols:add" className="text-sm" />
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodDetailsSection;
