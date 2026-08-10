import { Shield, Trophy, ArrowUp } from 'lucide-react';
import { pffFederationInfo } from '../data';

interface FooterProps {
  onNavClick: (section: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 font-mono text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                PFF
              </div>
              <div>
                <h3 className="text-white font-black font-display text-base uppercase tracking-tight">
                  Pakistan Football Federation
                </h3>
                <p className="text-emerald-400 text-[10px] font-bold uppercase">
                  PFF Official Competition Platform
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-sans">
              The central governing body for association football in Pakistan. Empowering clubs, athletes, and referees across all provinces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold font-display uppercase tracking-wider mb-3">
              Quick Sections
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavClick('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">Home</button></li>
              <li><button onClick={() => onNavClick('teams')} className="hover:text-emerald-400 transition-colors cursor-pointer">PFF Teams (Bimal FC & Royal FC)</button></li>
              <li><button onClick={() => onNavClick('register-team')} className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-bold">Register Your Team</button></li>
              <li><button onClick={() => onNavClick('standings')} className="hover:text-emerald-400 transition-colors cursor-pointer">League Standings</button></li>
              <li><button onClick={() => onNavClick('fixtures')} className="hover:text-emerald-400 transition-colors cursor-pointer">Fixtures & Results</button></li>
            </ul>
          </div>

          {/* Affiliation */}
          <div className="space-y-2">
            <h4 className="text-white font-bold font-display uppercase tracking-wider mb-3">
              Affiliations
            </h4>
            <div className="space-y-1.5 text-slate-400">
              <p>• FIFA Member Association</p>
              <p>• Asian Football Confederation (AFC)</p>
              <p>• South Asian Football Federation (SAFF)</p>
              <p className="text-amber-400 font-bold mt-2">PFF Premier League 2026</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} Pakistan Football Federation (PFF). All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
