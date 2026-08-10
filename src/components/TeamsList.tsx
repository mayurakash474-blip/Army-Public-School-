import { useState } from 'react';
import { Shield, MapPin, Users, Trophy, ArrowRight, Search } from 'lucide-react';
import { FootballTeam } from '../types';
import { initialFootballTeams } from '../data';

interface TeamsListProps {
  onSelectTeam: (teamId: string) => void;
  onRegisterTeamClick: () => void;
}

export default function TeamsList({ onSelectTeam, onRegisterTeamClick }: TeamsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const teams: FootballTeam[] = initialFootballTeams;

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="teams" className="py-16 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              PFF Affiliated Clubs
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
              PFF Premier League Teams
            </h2>

            <p className="text-slate-400 text-xs font-mono mt-1">
              Explore official Pakistan Football Federation clubs, rosters, achievements, and club statistics.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search club or city..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* TEAMS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-3xl p-6 shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Team Top Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 p-1 shrink-0 shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                    <img src={team.logo} alt={team.name} className="w-full h-full object-cover rounded-xl" />
                  </div>

                  <span className="bg-emerald-950 text-emerald-400 font-mono font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                    {team.code}
                  </span>
                </div>

                {/* Team Name */}
                <h3 className="text-2xl font-black font-display uppercase text-white group-hover:text-emerald-400 transition-colors">
                  {team.name}
                </h3>

                <p className="text-xs font-mono text-emerald-400 font-semibold mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{team.city} • Home: {team.stadium}</span>
                </p>

                <p className="text-slate-300 text-xs mt-3 line-clamp-3 font-sans">
                  {team.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800/80 text-center font-mono text-[11px] bg-slate-950/60 rounded-xl p-3">
                  <div>
                    <p className="text-slate-500 uppercase text-[9px]">Players</p>
                    <p className="text-white font-bold">{team.squad.length}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 uppercase text-[9px]">Wins</p>
                    <p className="text-emerald-400 font-bold">{team.stats.won}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 uppercase text-[9px]">Points</p>
                    <p className="text-amber-400 font-extrabold">{team.stats.points}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => onSelectTeam(team.id)}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>View Team Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
