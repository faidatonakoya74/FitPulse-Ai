
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Workout } from '../types';

interface AnalyticsProps {
  workouts: Workout[];
}

const Analytics: React.FC<AnalyticsProps> = ({ workouts }) => {
  // Process data for charts
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayWorkouts = workouts.filter(w => w.date.startsWith(dateStr));
    return {
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      calories: dayWorkouts.reduce((sum, w) => sum + w.calories, 0),
      duration: dayWorkouts.reduce((sum, w) => sum + w.duration, 0),
    };
  });

  const categoryData = workouts.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.type);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: curr.type, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Your Progress</h2>
        <p className="text-slate-500">Data-driven insights to help you hit your goals.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weekly Calories Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Calories Burned (Last 7 Days)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="calories" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Duration Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Workout Duration (Mins)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                   cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="duration" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workout Split */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Activity Mix</h3>
          <div className="flex flex-wrap gap-4">
            {categoryData.map((item, i) => (
              <div key={i} className="flex-1 min-w-[120px] bg-slate-50 p-4 rounded-2xl flex flex-col items-center">
                <span className="text-2xl mb-2">
                    {item.name === 'Cardio' ? '🏃‍♂️' : item.name === 'Strength' ? '🏋️' : '🤸'}
                </span>
                <span className="text-sm font-bold text-slate-800">{item.name}</span>
                <span className="text-xs text-slate-400">{item.value} workouts</span>
              </div>
            ))}
            {categoryData.length === 0 && (
              <p className="text-slate-400 w-full text-center py-10">No categories recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
