
import React, { useState } from 'react';
import { SharedWorkout, UserProfile, Workout } from '../types';

interface SocialFeedProps {
  user: UserProfile;
  feed: SharedWorkout[];
  workouts: Workout[];
  onShare: (workoutId: string, message: string) => void;
}

const SocialFeed: React.FC<SocialFeedProps> = ({ user, feed, workouts, onShare }) => {
  const [sharing, setSharing] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [message, setMessage] = useState('');

  const handleShare = () => {
    if (!selectedWorkoutId || !message) return;
    onShare(selectedWorkoutId, message);
    setSharing(false);
    setMessage('');
    setSelectedWorkoutId('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Fitness Feed</h2>
          <p className="text-slate-500">Stay inspired by the community.</p>
        </div>
        <button 
          onClick={() => setSharing(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-indigo-100 hover:scale-105 transition-transform"
        >
          Share Achievement
        </button>
      </header>

      {/* Share Modal */}
      {sharing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Post Achievement</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Select Workout</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none"
                  value={selectedWorkoutId}
                  onChange={(e) => setSelectedWorkoutId(e.target.value)}
                >
                  <option value="">Choose a workout...</option>
                  {workouts.map(w => (
                    <option key={w.id} value={w.id}>{w.exercise} ({new Date(w.date).toLocaleDateString()})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Add a message</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none"
                  placeholder="Tell your friends how it went!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setSharing(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feed Items */}
      <div className="space-y-6">
        {feed.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src={post.userPhoto} alt={post.userName} className="w-10 h-10 rounded-full border border-slate-100 shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{post.userName}</h4>
                  <p className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.workout.type}
                </div>
              </div>

              <p className="text-slate-600 mb-6 italic">"{post.message}"</p>

              <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-6">
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 text-sm">{post.workout.exercise}</h5>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1">⏱️ {post.workout.duration}m</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">🔥 {post.workout.calories} cal</span>
                  </div>
                </div>
                <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
                  <span className="text-xl">❤️</span>
                  <span className="text-[10px] font-bold mt-1">{post.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {feed.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="font-bold text-slate-800">Nothing to see yet</h3>
            <p className="text-slate-500">Be the first to share a workout achievement!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialFeed;
