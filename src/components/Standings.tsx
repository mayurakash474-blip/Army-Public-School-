import { useState } from 'react';
import { Trophy, Shield, ArrowUpDown, Sparkles, Activity } from 'lucide-react';
import { LeagueStanding } from '../types';
import { initialStandings } from '../data';

interface StandingsProps {
  customStandings?: LeagueStanding[];
  onSelectTeam?: (teamId: string) => void;
}

export default function Standings({ customStandings, onSelectTeam }: StandingsProps) {
  const standingsData = customStandings || initialStandings;

  // Sort standings by points (desc), then Goal Difference (desc), then Goals For (desc)
  const sortedStandings = [...standingsData].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });

  return (
    <section id="standings" className="py-16 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Official League Table
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
              PFF Premier League Standings
            </h2>
            
            <p className="text-slate-400 text-xs font-mono mt-1">
              Live standings automatically updated following every official matchday result.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              LIVE TABLE 2026
            </span>
          </div>
        </div>

        {/* STANDINGS TABLE CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="sm:hidden px-4 py-2 bg-slate-950 border-b border-slate-800 text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-between">
            <span>Swipe table left/right for full stats</span>
            <span>→</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider bg-slate-950/80">
                  <th className="py-4 px-4 font-bold text-center w-12">Pos</th>
                  <th className="py-4 px-6 font-bold">Team Name</th>
                  <th className="py-4 px-3 font-bold text-center">Played</th>
                  <th className="py-4 px-3 font-bold text-center text-emerald-400">Won</th>
                  <th className="py-4 px-3 font-bold text-center text-amber-400">Draw</th>
                  <th className="py-4 px-3 font-bold text-center text-rose-400">Lost</th>
                  <th className="py-4 px-3 font-bold text-center">GF</th>
                  <th className="py-4 px-3 font-bold text-center">GA</th>
                  <th className="py-4 px-3 font-bold text-center">GD</th>
                  <th className="py-4 px-4 font-extrabold text-center text-amber-400 bg-emerald-950/40">Points</th>
                  <th className="py-4 px-4 font-bold text-center hidden md:table-cell">Recent Form</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60">
                {sortedStandings.map((team, index) => {
                  const actualPosition = index + 1;
                  const isTopTeam = actualPosition === 1;

                  return (
                    <tr
                      key={team.teamId}
                      onClick={() => onSelectTeam && onSelectTeam(team.teamId)}
                      className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        isTopTeam ? 'bg-emerald-950/20' : ''
                      }`}
                    >
                      {/* Position */}
                      <td className="py-4 px-4 text-center">
                        <div className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center mx-auto ${
                          actualPosition === 1
                            ? 'bg-amber-400 text-slate-950 font-mono shadow-md shadow-amber-400/20'
                            : actualPosition === 2
                            ? 'bg-slate-300 text-slate-950 font-mono'
                            : actualPosition === 3
                            ? 'bg-amber-700/80 text-white font-mono'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {actualPosition}
                        </div>
                      </td>

                      {/* Team Name + Logo */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-700 p-0.5 shrink-0 overflow-hidden">
                            <img src={team.teamLogo} alt={team.teamName} className="w-full h-full object-cover rounded-lg" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-white text-sm font-display tracking-tight uppercase">
                                {team.teamName}
                              </span>
                              {actualPosition === 1 && (
                                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                                  Leaders
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">PFF Premier League</span>
                          </div>
                        </div>
                      </td>

                      {/* Played */}
                      <td className="py-4 px-3 text-center text-xs text-white font-bold">{team.played}</td>

                      {/* Won */}
                      <td className="py-4 px-3 text-center text-xs text-emerald-400 font-bold">{team.won}</td>

                      {/* Draw */}
                      <td className="py-4 px-3 text-center text-xs text-amber-400 font-bold">{team.draw}</td>

                      {/* Lost */}
                      <td className="py-4 px-3 text-center text-xs text-rose-400 font-bold">{team.lost}</td>

                      {/* GF */}
                      <td className="py-4 px-3 text-center text-xs text-slate-300">{team.gf}</td>

                      {/* GA */}
                      <td className="py-4 px-3 text-center text-xs text-slate-400">{team.ga}</td>

                      {/* GD */}
                      <td className={`py-4 px-3 text-center text-xs font-bold ${
                        team.gd > 0 ? 'text-emerald-400' : team.gd < 0 ? 'text-rose-400' : 'text-slate-400'
                      }`}>
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </td>

                      {/* Points */}
                      <td className="py-4 px-4 text-center font-black text-base text-amber-400 bg-emerald-950/40">
                        {team.points}
                      </td>

                      {/* Form Pills */}
                      <td className="py-4 px-4 text-center hidden md:table-cell">
                        <div className="flex justify-center gap-1">
                          {team.form && team.form.map((f, i) => (
                            <span
                              key={i}
                              className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center ${
                                f === 'W'
                                  ? 'bg-emerald-600 text-white'
                                  : f === 'D'
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-rose-600 text-white'
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* Table Legend Footer */}
          <div className="bg-slate-950 p-4 border-t border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
                <span>1st Place: AFC Champions League Spot</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                <span>2nd Place: National Cup Qualifier</span>
              </span>
            </div>

            <span>
              Updated by Pakistan Football Federation Competition Committee
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
