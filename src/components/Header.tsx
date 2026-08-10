import { useState, useEffect } from 'react';
import { Menu, X, Trophy, Shield, User, LogOut, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { pffFederationInfo } from '../data';

interface HeaderProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  loggedInUsername?: string;
  userRegisteredTeamName?: string;
  onLogout?: () => void;
}

export default function Header({ 
  activeSection, 
  onSelectSection, 
  loggedInUsername, 
  userRegisteredTeamName,
  onLogout 
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Teams', id: 'teams' },
    { label: 'Players', id: 'players' },
    { label: 'Fixtures & Results', id: 'fixtures' },
    { label: 'Standings', id: 'standings' },
    { label: 'News', id: 'news' },
    { label: 'Register Team', id: 'register-team', isCta: true },
    ...(userRegisteredTeamName ? [{ label: 'My Team', id: 'my-team', isBadge: true }] : [])
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onSelectSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
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
    <>
      {/* Top Federation Utility Ticker Bar */}
      <div className="bg-slate-950 text-white py-1.5 px-4 text-xs font-mono border-b border-emerald-950/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-300 overflow-hidden">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold shrink-0">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              PFF PREMIER LEAGUE 2026
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="truncate hidden sm:inline text-slate-300">
              Official Tournament Registration Open • Bimal FC vs Royal FC Matchday 11 Clash
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] uppercase font-mono font-bold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
              AFFILIATED WITH FIFA & AFC
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-950/95 backdrop-blur-md shadow-xl py-3 border-b border-emerald-900/40' 
            : 'bg-slate-900/90 backdrop-blur-sm py-4 border-b border-emerald-900/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* PFF Official Federation Brand Crest */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 bg-gradient-to-br from-emerald-600 via-emerald-800 to-slate-950 rounded-xl p-0.5 shadow-lg border border-emerald-400/60 flex items-center justify-center transform transition-transform group-hover:scale-105 duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex flex-col items-center justify-center text-emerald-400 p-1">
                <Shield className="w-5 h-5 fill-emerald-500/20 text-emerald-400" />
                <span className="text-[7px] font-mono font-black text-amber-400 tracking-tighter uppercase leading-none">PFF</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-white font-display font-black text-sm sm:text-base leading-none tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
                  Pakistan Football Federation
                </h1>
              </div>
              <p className="text-emerald-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                PFF Official Competition Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.isCta) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`ml-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-amber-400 text-slate-950 shadow-amber-400/20'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-emerald-600/30'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider font-display transition-all rounded-lg cursor-pointer ${
                    activeSection === item.id
                      ? 'text-emerald-400 bg-emerald-950/60 border-b-2 border-emerald-400 font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Logged in User Bar */}
            {loggedInUsername && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-800">
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">
                    @{loggedInUsername}
                  </span>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('register-team')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md transition-colors"
            >
              Register Team
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 z-40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-slate-950 z-50 p-6 flex flex-col justify-between border-l border-emerald-900/40 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-6 h-6 text-emerald-400" />
                    <div>
                      <h4 className="text-white font-bold font-display text-sm uppercase">PFF PLATFORM</h4>
                      <p className="text-slate-400 text-[10px] tracking-widest uppercase">Pakistan Football Federation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {loggedInUsername && (
                  <div className="mb-6 p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-400" />
                      <div>
                        <p className="text-[9px] font-mono text-emerald-400 font-extrabold uppercase tracking-widest">Active Member</p>
                        <p className="text-white font-bold text-xs">@{loggedInUsername}</p>
                      </div>
                    </div>
                    {onLogout && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onLogout();
                        }}
                        className="bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left px-4 py-3 rounded-xl font-display text-sm transition-all flex items-center justify-between ${
                        activeSection === item.id
                          ? 'text-white bg-emerald-700 font-bold shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`w-4 h-4 ${activeSection === item.id ? 'text-white' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6 mt-6">
                <p className="text-slate-400 text-xs font-mono">
                  {pffFederationInfo.contact.phone}
                </p>
                <p className="text-slate-400 text-xs font-mono">
                  {pffFederationInfo.contact.email}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
