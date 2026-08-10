import { Trophy, Shield, Calendar, MapPin, Sparkles, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { pffFederationInfo, initialFixtures } from '../data';

interface HeroProps {
  onRegisterTeamClick: () => void;
  onViewStandingsClick: () => void;
}

export default function Hero({ onRegisterTeamClick, onViewStandingsClick }: HeroProps) {
  const featuredMatch = initialFixtures[0]; // Bimal FC vs Royal FC

  return (
    <section id="home" className="relative bg-slate-950 text-white overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Stadium/Field Background Backdrop */}
      <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"
           style={{ backgroundImage: `url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-lg shadow-emerald-950/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>PFF PREMIER LEAGUE 2026 REGISTRATION IS LIVE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            <div className="inline-flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                OFFICIAL NATIONAL PLATFORM
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight leading-none text-white mb-6">
              PAKISTAN <span className="text-emerald-500 underline decoration-emerald-500/50">FOOTBALL</span> FEDERATION
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed mb-8">
              Welcome to the official competition portal for Pakistani football. Register your team for <strong className="text-emerald-400">Bimal FC</strong>, <strong className="text-emerald-400">Royal FC</strong>, or affiliated clubs, track league standings, fixtures, and national tournament statistics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onRegisterTeamClick}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Register Your Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewStandingsClick}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>View Standings</span>
              </button>
            </div>

            {/* Federation Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-800/80 w-full max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono">120+</p>
                <p className="text-[11px] text-slate-400 font-mono uppercase">Affiliated Clubs</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">4,500+</p>
                <p className="text-[11px] text-slate-400 font-mono uppercase">Active Players</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">18</p>
                <p className="text-[11px] text-slate-400 font-mono uppercase">National Stadiums</p>
              </div>
            </div>

          </div>

          {/* Featured Match Card Column */}
          <div className="lg:col-span-5 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-slate-900/90 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/80 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-emerald-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
                <Activity className="w-3 h-3 animate-pulse" />
                <span>Featured Derby</span>
              </div>

              <div className="text-center mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold">
                  {featuredMatch.competition}
                </span>
                <h3 className="text-lg font-black text-white uppercase mt-1">
                  {featuredMatch.round}
                </h3>
              </div>

              {/* Matchup Banner */}
              <div className="grid grid-cols-3 gap-2 items-center bg-slate-950 p-6 rounded-2xl border border-slate-800 mb-6">
                {/* Home Team */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/50 p-1 flex items-center justify-center shadow-lg overflow-hidden mb-2">
                    <img src={featuredMatch.homeTeamLogo} alt={featuredMatch.homeTeamName} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h4 className="font-extrabold text-white text-sm uppercase">{featuredMatch.homeTeamName}</h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">1st Place</span>
                </div>

                {/* VS */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-2xl font-black text-amber-400 font-mono italic">VS</span>
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-full mt-1">
                    LIVE DERBY
                  </span>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-950 border-2 border-blue-500/50 p-1 flex items-center justify-center shadow-lg overflow-hidden mb-2">
                    <img src={featuredMatch.awayTeamLogo} alt={featuredMatch.awayTeamName} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h4 className="font-extrabold text-white text-sm uppercase">{featuredMatch.awayTeamName}</h4>
                  <span className="text-[10px] text-blue-400 font-mono font-bold">2nd Place</span>
                </div>
              </div>

              {/* Match Venue Details */}
              <div className="space-y-2 text-xs text-slate-300 font-mono bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Date & Time:
                  </span>
                  <span className="font-bold text-white">{featuredMatch.date} • {featuredMatch.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Venue:
                  </span>
                  <span className="font-bold text-white truncate max-w-[180px]">{featuredMatch.venue}</span>
                </div>
              </div>

              <button
                onClick={onRegisterTeamClick}
                className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Register to Play in this League</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
