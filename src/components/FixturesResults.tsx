import { useState } from 'react';
import { Calendar, Trophy, MapPin, Clock, Activity, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MatchFixture } from '../types';
import { initialFixtures } from '../data';

interface FixturesResultsProps {
  customFixtures?: MatchFixture[];
}

export default function FixturesResults({ customFixtures }: FixturesResultsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');

  const fixtures = customFixtures || initialFixtures;

  const filtered = fixtures.filter(f => {
    if (activeTab === 'upcoming') return f.status === 'Upcoming';
    if (activeTab === 'completed') return f.status === 'Completed';
    return true;
  });

  return (
    <section id="fixtures" className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              PFF Official Match Center
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
              Fixtures & Match Results
            </h2>

            <p className="text-slate-300 text-xs font-mono mt-1">
              Official match schedule, venues, scores, and goal statistics for PFF Premier League 2026.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Matches ({fixtures.length})
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming ({fixtures.filter(f => f.status === 'Upcoming').length})
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Results ({fixtures.filter(f => f.status === 'Completed').length})
            </button>
          </div>

        </div>

        {/* MATCH CARDS LIST */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="bg-slate-950 p-12 text-center rounded-3xl border border-slate-800 text-slate-500 font-mono text-xs">
              No fixtures found for selected filter.
            </div>
          ) : (
            filtered.map((match) => {
              const isCompleted = match.status === 'Completed';

              return (
                <div
                  key={match.id}
                  className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-xl transition-all"
                >
                  {/* Top Match Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6 text-xs font-mono">
                    <span className="text-emerald-400 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      {match.competition} • {match.round}
                    </span>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                    }`}>
                      {match.status}
                    </span>
                  </div>

                  {/* Teams Matchup Center */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4">
                    
                    {/* Home Team */}
                    <div className="md:col-span-5 flex items-center justify-center md:justify-end gap-4 text-center md:text-right">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black font-display uppercase text-white">
                          {match.homeTeamName}
                        </h3>
                        <p className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Home Team</p>
                      </div>

                      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 p-1 shrink-0 overflow-hidden shadow-md">
                        <img src={match.homeTeamLogo} alt={match.homeTeamName} className="w-full h-full object-cover rounded-xl" />
                      </div>
                    </div>

                    {/* Score / VS Display */}
                    <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
                      {isCompleted ? (
                        <div className="px-5 py-2 bg-emerald-600 text-white rounded-2xl font-mono font-black text-2xl shadow-lg shadow-emerald-950">
                          {match.homeScore} - {match.awayScore}
                        </div>
                      ) : (
                        <div className="px-5 py-2 bg-slate-900 border border-slate-800 text-amber-400 rounded-2xl font-mono font-black text-xl italic">
                          VS
                        </div>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono mt-2 font-bold">{match.time}</span>
                    </div>

                    {/* Away Team */}
                    <div className="md:col-span-5 flex items-center justify-center md:justify-start gap-4 text-center md:text-left">
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 p-1 shrink-0 overflow-hidden shadow-md">
                        <img src={match.awayTeamLogo} alt={match.awayTeamName} className="w-full h-full object-cover rounded-xl" />
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-black font-display uppercase text-white">
                          {match.awayTeamName}
                        </h3>
                        <p className="text-[10px] font-mono text-blue-400 uppercase font-bold">Away Team</p>
                      </div>
                    </div>

                  </div>

                  {/* Match Footer Details & Goals */}
                  <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1.5 text-slate-200 font-bold">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        {match.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        {match.venue}
                      </span>
                    </div>

                    {/* Completed Scorers / Statistics */}
                    {isCompleted && match.scorers && match.scorers.length > 0 && (
                      <div className="text-right text-[11px] text-emerald-300 font-mono">
                        ⚽ Goals: {match.scorers.join(', ')}
                      </div>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
