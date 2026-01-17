
import React from 'react';

type Tab = 'dashboard' | 'log' | 'progress' | 'social';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const tabs = [
    { id: 'dashboard' as const, label: 'Overview', icon: '📊' },
    { id: 'log' as const, label: 'Log', icon: '➕' },
    { id: 'progress' as const, label: 'Analytics', icon: '📈' },
    { id: 'social' as const, label: 'Feed', icon: '🌍' },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 md:hidden z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-200 sticky top-0 left-0 p-6">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-xl">
            F
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">FitPulse AI</h1>
        </div>

        <div className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={onLogout}
          className="mt-auto flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-medium"
        >
          <span>🚪</span>
          Logout
        </button>
      </aside>
    </>
  );
};

export default Navigation;
