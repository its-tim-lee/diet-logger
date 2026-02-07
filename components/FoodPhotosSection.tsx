import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { FoodPhoto } from "../types";
import { useToggleState } from "../src/hooks/useToggleState";

interface FoodPhotosSectionProps {
  photos: FoodPhoto[];
  onEnhanceComplete: () => void;
}

const FoodPhotosSection: React.FC<FoodPhotosSectionProps> = ({
  photos,
  onEnhanceComplete,
}) => {
  const [isExpanded, toggle] = useToggleState("food-photos");
  const [localPhotos, setLocalPhotos] = useState<FoodPhoto[]>(photos);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedCount = localPhotos.filter((p) => p.selected).length;
  const [enhancingId, setEnhancingId] = useState<string | null>(null);

  const handleToggleSelect = (id: string) => {
    setLocalPhotos(
      localPhotos.map((p) =>
        p.id === id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const handleReEnhance = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEnhancingId(id);
    setTimeout(() => {
      setEnhancingId(null);
      onEnhanceComplete();
    }, 2000); // Stop shimmer after 2s
  };

  const handleAddPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const newPhoto: FoodPhoto = {
        id: Date.now().toString(),
        url,
        selected: true,
        alt: "New upload",
      };
      setLocalPhotos([newPhoto, ...localPhotos]);
    }
  };

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
            <Icon icon="material-symbols:restaurant" className="text-2xl" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold">Food Photos</h3>
            {isExpanded && (
              <span className="text-xs text-primary font-medium">
                {selectedCount} Selected
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <button
              onClick={handleAddPhoto}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-input-bg hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
            >
              <Icon icon="material-symbols:add-a-photo" className="text-xl" />
            </button>
          )}
          <button
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-input-bg text-gray-400 hover:text-primary transition-colors"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
            aria-expanded={isExpanded}
          >
            <Icon
              icon="material-symbols:expand-more"
              className={`text-2xl transition-transform duration-200 motion-reduce:transition-none ${
                isExpanded ? "" : "-rotate-90"
              }`}
            />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
      </div>

      <div
        className={`flex gap-4 overflow-x-auto no-scrollbar -mx-1 px-1 pb-2 overflow-hidden transition-all duration-300 ease-in-out motion-reduce:transition-none ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        {localPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => handleToggleSelect(photo.id)}
            className={`relative flex-shrink-0 w-44 aspect-square rounded-[12px] overflow-hidden group transition-opacity cursor-pointer ${
              photo.selected ? "" : "opacity-80"
            }`}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className={`w-full h-full object-cover transition-all duration-500 ${
                photo.selected ? "" : "grayscale-[60%]"
              }`}
            />

            {enhancingId === photo.id && <div className="shimmer-effect"></div>}

            <div className="absolute top-2 right-2">
              {photo.selected ? (
                <button className="h-7 w-7 rounded-full bg-primary text-background-dark flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                  <Icon
                    icon="material-symbols:check"
                    className="text-lg font-bold"
                  />
                </button>
              ) : (
                <button className="h-7 w-7 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-transform hover:scale-110">
                  <Icon icon="material-symbols:add" className="text-lg" />
                </button>
              )}
            </div>

            <button
              onClick={(e) => handleReEnhance(photo.id, e)}
              className={`absolute bottom-2 right-2 overflow-hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-primary/30 bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-colors motion-reduce:transition-none z-10 active:scale-95 ${
                photo.selected ? "" : "opacity-80"
              }`}
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 opacity-60 animate-pulse-slow motion-reduce:animate-none" />
              <Icon
                icon="material-symbols:auto-fix-high"
                className="relative text-primary text-xl drop-shadow-glow-primary"
              />
              <span className="relative text-white">Re-enhance</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodPhotosSection;
