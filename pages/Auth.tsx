
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 gradient-bg rounded-2xl items-center justify-center text-white font-bold text-3xl mb-4 shadow-xl shadow-indigo-100">
            F
          </div>
          <h1 className="text-3xl font-bold text-slate-800">FitPulse AI</h1>
          <p className="text-slate-400 mt-2 font-medium">Your journey to a healthier you starts here.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 px-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 px-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 gradient-bg text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:opacity-90 active:scale-[0.98] transition-all text-lg"
          >
            Get Started
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center gap-4">
          <button 
            onClick={() => onLogin('demo@fitpulse.ai')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Continue as Guest / Demo
          </button>
          
          <div className="flex items-center gap-4 w-full">
            <div className="h-px bg-slate-100 flex-1"></div>
            <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">Or login with</span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          <button className="w-full py-4 px-6 rounded-2xl border border-slate-200 text-slate-600 font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
