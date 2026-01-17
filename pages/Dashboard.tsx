
import React, { useState, useEffect } from 'react';
import { UserProfile, Workout, FitnessInsight } from '../types';
import { getFitnessInsights } from '../services/geminiService';

interface DashboardProps {
  user: UserProfile;
  workouts: Workout[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, workouts }) => {
  const [insights, setInsights] = useState<FitnessInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const data = await getFitnessInsights(workouts, user.goals);
      setInsights(data);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [workouts, user.goals]);

  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const avgDuration = workouts.length ? Math.round(totalMinutes / workouts.length) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {user.name}!</h2>
        <p className="text-slate-500">Here's what's happening with your fitness today.</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Calories', value: totalCalories, icon: '🔥', color: 'bg-orange-50 text-orange-600' },
          { label: 'Workouts', value: workouts.length, icon: '💪', color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Avg. Duration', value: `${avgDuration}m`, icon: '⏱️', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Day Streak', value: user.streak, icon: '⚡', color: 'bg-amber-50 text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* AI Insights Section */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-9xl">🤖</span>
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs">AI</div>
                <h3 className="font-bold text-lg text-slate-800">Pulse AI Coach</h3>
            </div>

            {loadingInsights ? (
                <div className="flex items-center gap-4 animate-pulse">
                    <div className="flex-1 space-y-4">
                        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {insights.map((insight, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${
                            insight.type === 'encouragement' ? 'bg-indigo-50/50 border-indigo-100' : 
                            insight.type === 'warning' ? 'bg-rose-50/50 border-rose-100' : 
                            'bg-amber-50/50 border-amber-100'
                        }`}>
                            <h4 className="font-bold text-slate-800 mb-1">{insight.title}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{insight.advice}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </section>

      {/* Recent Activity List */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-800">Recent Activity</h3>
          <button className="text-sm font-medium text-indigo-600">View All</button>
        </div>
        <div className="space-y-3">
          {workouts.slice(0, 3).map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-xl">
                {workout.type === 'Cardio' ? '🏃‍♂️' : workout.type === 'Strength' ? '🏋️' : workout.type === 'Yoga' ? '🧘' : '👟'}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">{workout.exercise}</h4>
                <p className="text-xs text-slate-400">{new Date(workout.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-indigo-600">{workout.calories} kcal</div>
                <div className="text-xs text-slate-400">{workout.duration} min</div>
              </div>
            </div>
          ))}
          {workouts.length === 0 && (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400">No workouts logged yet. Start moving!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
