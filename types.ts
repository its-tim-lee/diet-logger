export interface Supplement {
  id: string;
  name: string;
  qty: string;
}

export interface FoodItem {
  id: string;
  name: string;
  amount: string;
  meal: string;
  time: string;
}

export interface FoodPhoto {
  id: string;
  url: string;
  selected: boolean;
  alt: string;
}

export enum ExerciseType {
  CARDIO = 'Cardio',
  WORKOUT = 'Workout',
  YOGA = 'Yoga',
  OTHER = 'Other'
}

export enum PressureLevel {
  LOW = 1,
  LOW_MID = 2,
  MID = 3,
  HIGH_MID = 4,
  HIGH = 5
}
