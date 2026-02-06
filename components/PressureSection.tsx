import React from "react";
import { Icon } from "@iconify/react";
import { PressureLevel } from "../types";
import { useToggleState } from "../src/hooks/useToggleState";

interface PressureSectionProps {
  level: PressureLevel;
  setLevel: (val: PressureLevel) => void;
}

const PressureSection: React.FC<PressureSectionProps> = ({
  level,
  setLevel,
}) => {
  const [isExpanded, toggle] = useToggleState("pressure");
  const levels = [
    {
      value: PressureLevel.LOW,
      icon: "sentiment_very_satisfied",
      label: "Low",
    },
    { value: PressureLevel.LOW_MID, icon: "sentiment_satisfied", label: "." },
    { value: PressureLevel.MID, icon: "sentiment_neutral", label: "." },
    {
      value: PressureLevel.HIGH_MID,
      icon: "sentiment_dissatisfied",
      label: ".",
    },
    {
      value: PressureLevel.HIGH,
      icon: "sentiment_very_dissatisfied",
      label: "High",
    },
  ];

  const handleSelect = (val: PressureLevel) => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    setLevel(val);
  };

  return (
    <section className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-4">
      <div
        className={`flex items-center justify-between transition-opacity motion-reduce:transition-none ${
          !isExpanded ? "opacity-50" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Icon icon="material-symbols:speed" />
          </div>
          <h3 className="text-lg font-bold">Pressure Level</h3>
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
        className={`transition-all duration-300 ease-in-out motion-reduce:transition-none overflow-hidden ${
          isExpanded
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          transitionProperty: "max-height, opacity",
          transitionDuration: "300ms, 200ms",
        }}
      >
        <div className="flex justify-between items-center gap-2">
          {levels.map((l) => {
            const isSelected = level === l.value;
            return (
              <div
                key={l.value}
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => handleSelect(l.value)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                    isSelected
                      ? "bg-primary/20 scale-125"
                      : "bg-input-bg group-hover:bg-primary/10 opacity-50 scale-100"
                  }`}
                >
                  <Icon
                    icon={`material-symbols:${l.icon.replace(/_/g, "-")}`}
                    className={`text-2xl transition-colors ${
                      isSelected
                        ? "text-primary"
                        : "text-gray-400 group-hover:text-primary"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold transition-opacity ${
                    l.label === "." ? "text-transparent" : "text-gray-500"
                  }`}
                >
                  {l.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PressureSection;
