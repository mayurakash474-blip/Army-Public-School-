import { useState, useEffect } from 'react';
import { User, Shield, Search, Calendar, Filter, Sparkles } from 'lucide-react';
import { FootballPlayer, TeamRegistrationRequest } from '../types';
import { initialFootballTeams } from '../data';
import { fetchTeamRegistrations } from '../lib/firebase';

export default function PlayersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | 'Male' | 'Female'>('All');
  const [selectedPosition, setSelectedPosition] = useState<string>('All');
  const [customRegistrations, setCustomRegistrations] = useState<TeamRegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Combine initial squad players from all teams + firestore registrations
  useEffect(() => {
    async function loadRegistrations() {
      try {
        const firestoreRegs = await fetchTeamRegistrations();
        setCustomRegistrations(firestoreRegs);
      } catch (err) {
        console.error("Error loading player registrations:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRegistrations();
  }, []);

  // Base players from dataset
  const basePlayers: FootballPlayer[] = initialFootballTeams.flatMap(t => t.squad);

  // Map custom registrations into player objects
  const registeredPlayers: FootballPlayer[] = customRegistrations.map(reg => ({
    id: reg.id || `reg_${Math.random()}`,
    name: reg.fullName,
    teamId: reg.teamId,
    teamName: reg.teamName,
    number: Math.floor(Math.random() * 50) + 12,
    position: reg.position || 'Forward',
    gender: reg.gender,
    registeredAt: reg.registeredAt || new Date().toLocaleDateString(),
    goals: 0,
    assists: 0,
    matchesPlayed: 1
  }));

  const allPlayers = [...registeredPlayers, ...basePlayers];

  const filteredPlayers = allPlayers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender === 'All' || p.gender === selectedGender;
    const matchesPosition = selectedPosition === 'All' || p.position === selectedPosition;
    return matchesSearch && matchesGender && matchesPosition;
  });

  return (
    <section id="players" className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              National Player Registry
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
              Registered Football Athletes
            </h2>

            <p className="text-slate-300 text-xs font-mono mt-1">
              Official database of players registered across Bimal FC and Royal FC.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            
            {/* Gender Filter */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {(['All', 'Male', 'Female'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors cursor-pointer ${
                    selectedGender === g
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Position Filter */}
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs font-mono text-white rounded-xl px-3 py-2.5 focus:border-emerald-500"
            >
              <option value="All">All Positions</option>
              <option value="Goalkeeper">Goalkeeper</option>
              <option value="Defender">Defender</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Forward">Forward</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search player or club..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:border-emerald-500"
              />
            </div>

          </div>
        </div>

        {/* PLAYERS TABLE / CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-sm">
                    #{player.number}
                  </div>

                  <span className="bg-slate-900 border border-slate-800 text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {player.position}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display uppercase text-white">
                  {player.name}
                </h3>

                <p className="text-xs text-emerald-400 font-mono font-semibold mt-0.5">
                  Club: {player.teamName}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                  <p className="flex justify-between">
                    <span>Gender:</span>
                    <strong className="text-slate-200">{player.gender}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Registered:</span>
                    <strong className="text-slate-300">{player.registeredAt}</strong>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-center font-mono text-xs">
                <span className="text-amber-400 font-extrabold">{player.goals || 0} Goals</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
