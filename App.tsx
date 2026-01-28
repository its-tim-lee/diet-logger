import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import SleepSection from "./components/SleepSection";
import ExerciseSection from "./components/ExerciseSection";
import PressureSection from "./components/PressureSection";
import DailyNotesSection from "./components/DailyNotesSection";
import SupplementsSection from "./components/SupplementsSection";
import FoodPhotosSection from "./components/FoodPhotosSection";
import FoodDetailsSection from "./components/FoodDetailsSection";
import DatePickerModal from "./components/DatePickerModal";
import FoodSearchModal from "./components/FoodSearchModal";
import Toast from "./components/Toast";
import {
  Supplement,
  FoodItem,
  FoodPhoto,
  ExerciseType,
  PressureLevel,
} from "./types";

const App: React.FC = () => {
  // Global Glow State
  const [glowPos, setGlowPos] = useState({ x: -100, y: -100 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // State for Date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // State for Modals
  const [isFoodSearchOpen, setIsFoodSearchOpen] = useState(false);

  // State for Sleep
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [bedTime, setBedTime] = useState<string>("22:30");
  const [wakeTime, setWakeTime] = useState<string>("06:45");
  const [sleepNotes, setSleepNotes] = useState<string>("");

  // State for Exercise
  const [exerciseType, setExerciseType] = useState<ExerciseType | string>(
    ExerciseType.CARDIO
  );
  const [exerciseDuration, setExerciseDuration] = useState<number>(45);
  const [exerciseStartTime, setExerciseStartTime] = useState<string>("07:00");

  // State for Pressure
  const [pressureLevel, setPressureLevel] = useState<PressureLevel>(
    PressureLevel.LOW
  );

  // State for Daily Notes
  const [dailyNotes, setDailyNotes] = useState<string>("");

  // State for Supplements
  const [supplements, setSupplements] = useState<Supplement[]>([
    { id: "1", name: "Omega-3 Fish Oil", qty: "2 caps" },
    { id: "2", name: "Vitamin D3", qty: "1000iu" },
    { id: "3", name: "Multivitamin", qty: "1 pill" },
  ]);

  // State for Food
  const [foodPhotos] = useState<FoodPhoto[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop",
      selected: true,
      alt: "Salad",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1533089862017-ec32e3b32cfa?q=80&w=300&auto=format&fit=crop",
      selected: true,
      alt: "Breakfast",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300&auto=format&fit=crop",
      selected: false,
      alt: "Dinner",
    },
  ]);

  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: "1",
      name: "Grilled Chicken Breast",
      amount: "150g",
      meal: "Lunch",
      time: "12:45 PM",
    },
    {
      id: "2",
      name: "Quinoa Salad",
      amount: "1 cup",
      meal: "Lunch",
      time: "12:45 PM",
    },
  ]);

  // Touch Move Glow Effect
  useEffect(() => {
    const handleMove = (e: TouchEvent | MouseEvent) => {
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      setGlowPos({ x: clientX, y: clientY });
    };

    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const addFoodItem = (name: string) => {
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name,
      amount: "1 serving",
      meal: "Snack",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setFoodItems([...foodItems, newItem]);
  };

  const updateFoodItem = (id: string, name: string) => {
    setFoodItems(
      foodItems.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const deleteFoodItem = (id: string) => {
    setFoodItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
  };

  // Validation Logic: Assume essential data is sleep quality set and supplements > 0
  const isFormValid = sleepQuality > 0 && supplements.length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    // Simulate navigation
    setTimeout(() => {
      alert("Review Screen (Transition Complete)");
      setIsSubmitting(false);
    }, 500);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div
      className={`relative mx-auto max-w-md w-full min-h-screen flex flex-col pb-24 overflow-hidden transition-transform duration-500 ease-in-out ${
        isSubmitting ? "-translate-x-full opacity-0" : ""
      }`}
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(91, 236, 19, 0.15), transparent 40%)`,
        }}
      />

      <main className="flex-1 flex flex-col gap-6 px-5 pt-6 z-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Daily Check-in
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              {formatDate(currentDate)}
            </h2>
          </div>
          <button
            onClick={() => setIsDatePickerOpen(true)}
            className="h-10 w-10 rounded-full bg-input-bg flex items-center justify-center transition-colors hover:bg-primary/20 hover:text-primary group"
          >
            <Icon
              icon="material-symbols:calendar-today"
              className="text-primary text-xl"
            />
          </button>
        </div>

        <SleepSection
          quality={sleepQuality}
          setQuality={setSleepQuality}
          bedTime={bedTime}
          setBedTime={setBedTime}
          wakeTime={wakeTime}
          setWakeTime={setWakeTime}
          notes={sleepNotes}
          setNotes={setSleepNotes}
        />

        <ExerciseSection
          type={exerciseType}
          setType={setExerciseType}
          duration={exerciseDuration}
          setDuration={setExerciseDuration}
          startTime={exerciseStartTime}
          setStartTime={setExerciseStartTime}
        />

        <PressureSection level={pressureLevel} setLevel={setPressureLevel} />

        <DailyNotesSection
          notes={dailyNotes}
          setNotes={setDailyNotes}
        />

        <SupplementsSection
          supplements={supplements}
          setSupplements={setSupplements}
        />

        <FoodPhotosSection
          photos={foodPhotos}
          onEnhanceComplete={() => showToast("Photo Enhanced Successfully")}
        />

        <FoodDetailsSection
          items={foodItems}
          addItem={addFoodItem}
          updateItem={updateFoodItem}
          deleteItem={deleteFoodItem}
          onOpenSearch={() => setIsFoodSearchOpen(true)}
        />
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40 max-w-md mx-auto">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full bg-primary text-background-dark text-lg font-bold py-4 rounded-full shadow-[0_0_20px_rgba(91,236,19,0.3)] transition-all transform flex items-center justify-center gap-2 ${
            isFormValid
              ? "hover:bg-[#4dd010] active:scale-[0.98] animate-pulse-glow"
              : "opacity-50 cursor-not-allowed grayscale"
          }`}
        >
          Proceed to Review
          <Icon icon="material-symbols:arrow-forward" className="inline" />
        </button>
      </div>

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selectedDate={currentDate}
        onSelectDate={handleDateSelect}
      />

      <FoodSearchModal
        isOpen={isFoodSearchOpen}
        onClose={() => setIsFoodSearchOpen(false)}
        onAdd={addFoodItem}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default App;
