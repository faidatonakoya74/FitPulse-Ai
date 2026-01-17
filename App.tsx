
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, Workout, SharedWorkout } from './types';
import { authService, workoutService, socialService } from './services/firebaseService';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import Analytics from './pages/Analytics';
import SocialFeed from './pages/SocialFeed';
import Auth from './pages/Auth';

type Tab = 'dashboard' | 'log' | 'progress' | 'social';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [feed, setFeed] = useState<SharedWorkout[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setWorkouts(workoutService.getWorkouts(currentUser.uid));
    }
    setFeed(socialService.getFeed());
    setIsLoaded(true);
  }, []);

  const handleLogin = (email: string) => {
    const loggedUser = authService.login(email);
    setUser(loggedUser);
    setWorkouts(workoutService.getWorkouts(loggedUser.uid));
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setWorkouts([]);
    setActiveTab('dashboard');
  };

  const handleAddWorkout = (workoutData: Omit<Workout, 'id' | 'userId'>) => {
    if (!user) return;
    const newWorkout = workoutService.addWorkout({
      ...workoutData,
      userId: user.uid
    });
    setWorkouts(prev => [newWorkout, ...prev]);
    setActiveTab('dashboard');
  };

  const handleShareWorkout = (workoutId: string, message: string) => {
    if (!user) return;
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;

    socialService.shareWorkout(user.uid, user.name, user.photoURL, workout, message);
    setFeed(socialService.getFeed());
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 max-w-6xl mx-auto overflow-x-hidden">
        {activeTab === 'dashboard' && <Dashboard user={user} workouts={workouts} />}
        {activeTab === 'log' && <LogWorkout onAdd={handleAddWorkout} />}
        {activeTab === 'progress' && <Analytics workouts={workouts} />}
        {activeTab === 'social' && (
          <SocialFeed 
            user={user} 
            feed={feed} 
            workouts={workouts} 
            onShare={handleShareWorkout} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
