
import { UserProfile, Workout, SharedWorkout } from '../types';

// NOTE: In a real app, you would use firebase/auth and firebase/firestore
// This mock simulates the behavior for demonstration.

const STORAGE_KEYS = {
  USER: 'fitpulse_user',
  WORKOUTS: 'fitpulse_workouts',
  SHARED: 'fitpulse_shared'
};

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const authService = {
  getCurrentUser: (): UserProfile | null => {
    return getFromStorage<UserProfile | null>(STORAGE_KEYS.USER, null);
  },
  login: (email: string): UserProfile => {
    const user: UserProfile = {
      uid: 'user_123',
      name: email.split('@')[0],
      email: email,
      photoURL: `https://picsum.photos/seed/${email}/200`,
      age: 28,
      weight: 75,
      goals: 'Lose 5kg and run a 5k',
      streak: 4
    };
    saveToStorage(STORAGE_KEYS.USER, user);
    return user;
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  updateProfile: (profile: Partial<UserProfile>) => {
    const current = authService.getCurrentUser();
    if (current) {
      const updated = { ...current, ...profile };
      saveToStorage(STORAGE_KEYS.USER, updated);
      return updated;
    }
    return null;
  }
};

export const workoutService = {
  getWorkouts: (userId: string): Workout[] => {
    return getFromStorage<Workout[]>(STORAGE_KEYS.WORKOUTS, [])
      .filter(w => w.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  addWorkout: (workout: Omit<Workout, 'id'>): Workout => {
    const workouts = getFromStorage<Workout[]>(STORAGE_KEYS.WORKOUTS, []);
    const newWorkout = { ...workout, id: Math.random().toString(36).substr(2, 9) };
    workouts.push(newWorkout);
    saveToStorage(STORAGE_KEYS.WORKOUTS, workouts);
    return newWorkout;
  },
  deleteWorkout: (id: string) => {
    const workouts = getFromStorage<Workout[]>(STORAGE_KEYS.WORKOUTS, []);
    const filtered = workouts.filter(w => w.id !== id);
    saveToStorage(STORAGE_KEYS.WORKOUTS, filtered);
  },
  updateWorkout: (id: string, updates: Partial<Workout>) => {
    const workouts = getFromStorage<Workout[]>(STORAGE_KEYS.WORKOUTS, []);
    const index = workouts.findIndex(w => w.id === id);
    if (index !== -1) {
      workouts[index] = { ...workouts[index], ...updates };
      saveToStorage(STORAGE_KEYS.WORKOUTS, workouts);
    }
  }
};

export const socialService = {
  getFeed: (): SharedWorkout[] => {
    return getFromStorage<SharedWorkout[]>(STORAGE_KEYS.SHARED, [])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  shareWorkout: (userId: string, userName: string, userPhoto: string, workout: Workout, message: string) => {
    const shared = getFromStorage<SharedWorkout[]>(STORAGE_KEYS.SHARED, []);
    const newShare: SharedWorkout = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      userName,
      userPhoto,
      workout,
      message,
      likes: 0,
      createdAt: new Date().toISOString()
    };
    shared.push(newShare);
    saveToStorage(STORAGE_KEYS.SHARED, shared);
    return newShare;
  }
};
