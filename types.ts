
export type WorkoutType = 'Strength' | 'Cardio' | 'Yoga' | 'HIIT' | 'Pilates' | 'Other';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  age: number;
  weight: number;
  goals: string;
  streak: number;
}

export interface Workout {
  id: string;
  userId: string;
  type: WorkoutType;
  exercise: string;
  duration: number; // in minutes
  calories: number;
  date: string; // ISO string
}

export interface SharedWorkout {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  workout: Workout;
  message: string;
  likes: number;
  createdAt: string;
}

export interface FitnessInsight {
  title: string;
  advice: string;
  type: 'encouragement' | 'warning' | 'tip';
}
