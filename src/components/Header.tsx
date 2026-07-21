import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { schoolContact, schoolLogoUrl } from '../data';

interface HeaderProps {
  activeSection: string;
  loggedInUsername?: string;
  onLogout?: () => void;
}

export default function Header({ activeSection, loggedInUsername, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Principal', id: 'principal' },
    { label: 'Academics', id: 'academics' },
    { label: 'Admissions', id: 'admissions' },
    { label: 'Why Us', id: 'why-choose-us' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Faculty', id: 'faculty' },
    { label: 'News', id: 'news' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-navy-950 text-white py-1 px-4 text-xs font-mono border-b border-navy-800/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-schoolgold-400" /> {schoolContact.phone}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-schoolgold-400" /> {schoolContact.email}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-schoolgold-400" /> {schoolContact.officeHours.split('|')[0]}
            </span>
            <span className="bg-armygreen-600 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded text-white animate-pulse">
              Admissions Open 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`fixed top-0 md:top-auto left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-navy-950/95 backdrop-blur-md shadow-lg py-2.5 border-b border-navy-800/40' 
            : 'bg-navy-900/80 backdrop-blur-sm py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo Crest */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Real Official Crest Logo */}
            <div className="relative w-11 h-11 bg-white rounded-xl p-0.5 shadow-inner border border-schoolgold-400/80 flex items-center justify-center transform transition-transform group-hover:scale-105 duration-300 overflow-hidden">
              <img 
                src={schoolLogoUrl} 
                alt="APS Aliabad Hunza Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <h1 className="text-white font-display font-bold text-sm sm:text-base leading-none tracking-wide group-hover:text-schoolgold-400 transition-colors">
                ARMY PUBLIC SCHOOL
              </h1>
              <p className="text-schoolgold-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed">
                ALIABAD HUNZA
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest font-display transition-all ${
                  activeSection === item.id
                    ? 'text-white bg-armygreen-600 shadow-md border-b-2 border-schoolgold-400'
                    : 'text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            {loggedInUsername && (
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/20">
                <span className="text-[10px] bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold font-mono px-2.5 py-1 rounded-full shadow-sm">
                  @{loggedInUsername}
                </span>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="text-slate-300 hover:text-red-400 font-bold text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick('admissions')}
              className="bg-armygreen-600 hover:bg-armygreen-500 text-white font-semibold text-[10px] uppercase font-display tracking-widest px-3 py-1.5 rounded-lg shadow-md transition-colors"
            >
              Admissions
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white bg-navy-800/50 rounded-xl border border-navy-700/40"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-navy-950/70 z-40 backdrop-blur-sm lg:hidden"
            />

            {/* Menu List */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-navy-950 z-50 p-6 flex flex-col justify-between border-l border-navy-800/60 shadow-2xl lg:hidden"
            >
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-navy-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-6 h-6 text-schoolgold-400" />
                    <div>
                      <h4 className="text-white font-bold font-display text-sm">APS ALIABAD</h4>
                      <p className="text-slate-400 text-[10px] tracking-widest uppercase">Hunza Valley</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800/80"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {loggedInUsername && (
                  <div className="mb-6 p-3 bg-gradient-to-r from-purple-950/40 to-pink-950/40 border border-pink-500/20 rounded-xl flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-pink-400 font-extrabold uppercase tracking-widest leading-none mb-1">Logged In Student</span>
                      <span className="text-white font-bold text-xs">@{loggedInUsername}</span>
                    </div>
                    {onLogout && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onLogout();
                        }}
                        className="bg-red-500/15 hover:bg-red-500/25 text-red-400 px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  {navItems.map((item, index) => (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left px-4 py-3 rounded-xl font-display text-sm transition-all flex items-center justify-between ${
                        activeSection === item.id
                          ? 'text-white bg-gradient-to-r from-armygreen-700 to-armygreen-600 font-bold border-l-4 border-schoolgold-400 shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-navy-900/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRightSymbol active={activeSection === item.id} />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Contact Info */}
              <div className="border-t border-navy-800 pt-6 mt-6">
                <p className="text-slate-400 text-xs font-display mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-schoolgold-400" /> {schoolContact.phone}
                </p>
                <p className="text-slate-400 text-xs font-display flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-schoolgold-400" /> {schoolContact.email}
                </p>
                <div className="mt-4 bg-armygreen-950/60 border border-armygreen-800/40 p-3 rounded-xl">
                  <p className="text-schoolgold-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-1">
                    Admissions Active
                  </p>
                  <p className="text-slate-300 text-[10px] leading-tight font-sans">
                    FSc & Secondary registrations are open.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ChevronRightSymbol({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 transition-transform duration-300 ${
        active ? 'text-schoolgold-400 translate-x-1' : 'text-slate-500'
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
