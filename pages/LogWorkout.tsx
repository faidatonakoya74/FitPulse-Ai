
import React, { useState } from 'react';
import { WorkoutType, Workout } from '../types';

interface LogWorkoutProps {
  onAdd: (workout: Omit<Workout, 'id' | 'userId'>) => void;
}

const LogWorkout: React.FC<LogWorkoutProps> = ({ onAdd }) => {
  const [type, setType] = useState<WorkoutType>('Strength');
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise || !duration || !calories) return;

    onAdd({
      type,
      exercise,
      duration: parseInt(duration),
      calories: parseInt(calories),
      date: new Date(date).toISOString()
    });

    setExercise('');
    setDuration('');
    setCalories('');
    alert('Workout logged successfully!');
  };

  const types: WorkoutType[] = ['Strength', 'Cardio', 'Yoga', 'HIIT', 'Pilates', 'Other'];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Log Your Workout</h2>
        <p className="text-slate-500">Keep track of your hard work and watch your progress grow.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600">Workout Type</label>
          <div className="grid grid-cols-3 gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  type === t 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Exercise Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Bench Press, Morning Run"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Duration (mins)</label>
              <input
                type="number"
                required
                placeholder="45"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">Calories Burned</label>
              <input
                type="number"
                required
                placeholder="350"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 gradient-bg text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:opacity-90 active:scale-[0.98] transition-all mt-4"
        >
          Add Workout Record
        </button>
      </form>
    </div>
  );
};

export default LogWorkout;
