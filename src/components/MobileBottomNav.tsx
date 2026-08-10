import React from 'react';
import { Home, Shield, Calendar, Trophy, Sparkles, UserCheck } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  userRegisteredTeamName?: string;
}

export default function MobileBottomNav({
  activeSection,
  onSelectSection,
  userRegisteredTeamName
}: MobileBottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'teams', label: 'Teams', icon: Shield },
    { id: 'fixtures', label: 'Fixtures', icon: Calendar },
    { id: 'standings', label: 'Table', icon: Trophy },
    { id: 'register-team', label: 'Register', icon: Sparkles, isCta: true },
    ...(userRegisteredTeamName ? [{ id: 'my-team', label: 'My Team', icon: UserCheck }] : [])
  ];

  const handleClick = (id: string) => {
    onSelectSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-emerald-900/40 lg:hidden shadow-[0_-8px_20px_rgba(0,0,0,0.6)] px-1 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          if (item.isCta) {
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 scale-105 font-black shadow-lg shadow-amber-400/20'
                    : 'bg-emerald-600 text-white font-extrabold active:scale-95'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] uppercase font-mono tracking-tighter leading-none">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all min-w-[50px] min-h-[44px] ${
                isActive
                  ? 'text-emerald-400 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono tracking-tight leading-none mt-0.5 ${isActive ? 'font-bold text-emerald-400' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
