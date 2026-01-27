import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { FoodPhoto } from "../types";

interface FoodPhotosSectionProps {
  photos: FoodPhoto[];
  onEnhanceComplete: () => void;
}

const FoodPhotosSection: React.FC<FoodPhotosSectionProps> = ({
  photos,
  onEnhanceComplete,
}) => {
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
    <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Icon icon="material-symbols:restaurant" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold">Food Photos</h3>
            <span className="text-xs text-primary font-medium">
              {selectedCount} Selected
            </span>
          </div>
        </div>
        <button
          onClick={handleAddPhoto}
          className="flex items-center justify-center h-8 w-8 rounded-full bg-input-bg hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
        >
          <Icon icon="material-symbols:add-a-photo" className="text-xl" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-1 px-1 pb-2">
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
              className={`absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/10 ${
                photo.selected ? "hover:bg-black/80" : ""
              } transition-colors z-10 active:scale-95`}
            >
              <Icon
                icon="material-symbols:auto-fix-high"
                className="text-primary text-xs"
              />
              Re-enhance
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodPhotosSection;
