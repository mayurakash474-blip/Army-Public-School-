import { useState } from 'react';
import { 
  ShieldCheck, 
  Trophy, 
  UserCheck, 
  Calendar, 
  Activity, 
  Award, 
  Users, 
  ChevronRight,
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { FootballTeam, TeamRegistrationRequest, MatchFixture } from '../types';
import { initialFootballTeams, initialFixtures } from '../data';

interface TeamDashboardProps {
  userRegistration?: TeamRegistrationRequest | null;
  onOpenRegisterNewTeam?: () => void;
}

export default function TeamDashboard({ userRegistration, onOpenRegisterNewTeam }: TeamDashboardProps) {
  // Available teams to view
  const teams: FootballTeam[] = initialFootballTeams;

  // Determine active team to display in dashboard
  const defaultTeamId = userRegistration ? userRegistration.teamId : 'bimal-fc';
  const [activeTeamId, setActiveTeamId] = useState<string>(defaultTeamId);
  const [activeTab, setActiveTab] = useState<'overview' | 'squad' | 'fixtures' | 'results'>('overview');

  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  // Team fixtures & results
  const teamFixtures = initialFixtures.filter(
    f => f.homeTeamId === activeTeam.id || f.awayTeamId === activeTeam.id
  );

  const upcomingMatches = teamFixtures.filter(f => f.status === 'Upcoming');
  const completedMatches = teamFixtures.filter(f => f.status === 'Completed');

  return (
    <section id="my-team" className="py-12 bg-slate-950 text-white min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* TOP TEAM SWITCHER & USER BADGE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl shadow-lg">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/30">
                PFF Premier League Club Dashboard
              </span>
            </div>
            
            <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white mt-1">
              {activeTeam.name} Official Dashboard
            </h2>
          </div>

          {/* Quick Team Switcher Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">Select Team:</span>
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTeamId(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  activeTeamId === t.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {t.name}
              </button>
            ))}

            {onOpenRegisterNewTeam && (
              <button
                onClick={onOpenRegisterNewTeam}
                className="px-3 py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer"
              >
                + Register
              </button>
            )}
          </div>

        </div>

        {/* USER REGISTRATION STATUS BANNER (If user is registered) */}
        {userRegistration && userRegistration.teamId === activeTeam.id && (
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/50 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-extrabold text-base font-display uppercase">
                    Registration Confirmed
                  </h3>
                  <span className="bg-emerald-600 text-slate-950 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
                    CONFIRMED
                  </span>
                </div>
                <p className="text-emerald-300 text-xs font-semibold mt-1">
                  You are registered to team <strong className="text-white">{userRegistration.teamName}</strong>. We will send you message on WhatsApp.
                </p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">
                  Member: <strong className="text-white">{userRegistration.fullName}</strong> • WhatsApp: <strong className="text-amber-400">{userRegistration.whatsappNumber || 'N/A'}</strong> • Position: <strong className="text-emerald-400">{userRegistration.position || 'Forward'}</strong>
                </p>
              </div>
            </div>

            <div className="text-right text-[11px] font-mono text-slate-400">
              Registered on: <span className="text-slate-200 font-bold">{userRegistration.registeredAt}</span>
            </div>
          </div>
        )}

        {/* TEAM HERO HEADER CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Logo + Details */}
            <div className="md:col-span-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-950 border-2 border-emerald-500/50 p-2 shrink-0 shadow-2xl overflow-hidden">
                <img src={activeTeam.logo} alt={activeTeam.name} className="w-full h-full object-cover rounded-xl" />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
                    {activeTeam.name}
                  </h1>
                  <span className="text-xs bg-slate-800 text-amber-400 font-mono font-bold px-2.5 py-1 rounded-md border border-slate-700">
                    {activeTeam.code}
                  </span>
                </div>

                <p className="text-emerald-400 font-mono text-xs font-semibold mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeTeam.city} • Founded {activeTeam.founded} • Stadium: {activeTeam.stadium}</span>
                </p>

                <p className="text-slate-300 text-xs mt-3 max-w-xl font-sans">
                  {activeTeam.description}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-xs font-mono text-slate-400">
                  <span>Head Coach: <strong className="text-white">{activeTeam.coach}</strong></span>
                  <span>•</span>
                  <span>League Rank: <strong className="text-amber-400 font-bold">1st Place</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Form Pills */}
            <div className="md:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800/80 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2 font-bold">Recent Form</span>
              <div className="flex gap-1.5 mb-3">
                {activeTeam.recentForm.map((f, idx) => (
                  <span
                    key={idx}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-black flex items-center justify-center shadow-md ${
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
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                {activeTeam.stats.points} Points in PFF Premier League
              </span>
            </div>

          </div>
        </div>

        {/* TEAM STATISTICS GRID (Wins, Draws, Losses, Goals, Points) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Matches Played</p>
            <p className="text-2xl font-black font-mono text-white mt-1">{activeTeam.stats.played}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Wins</p>
            <p className="text-2xl font-black font-mono text-emerald-400 mt-1">{activeTeam.stats.won}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-amber-400 font-bold">Draws</p>
            <p className="text-2xl font-black font-mono text-amber-400 mt-1">{activeTeam.stats.draw}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-rose-400 font-bold">Losses</p>
            <p className="text-2xl font-black font-mono text-rose-400 mt-1">{activeTeam.stats.lost}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Goals For (GF)</p>
            <p className="text-2xl font-black font-mono text-white mt-1">{activeTeam.stats.gf}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Goal Diff (GD)</p>
            <p className="text-2xl font-black font-mono text-emerald-400 mt-1">+{activeTeam.stats.gd}</p>
          </div>

          <div className="bg-emerald-950 border-2 border-emerald-500/40 rounded-2xl p-4 text-center shadow-lg col-span-2 sm:col-span-1">
            <p className="text-[10px] font-mono uppercase text-amber-400 font-extrabold">Total Points</p>
            <p className="text-3xl font-black font-mono text-amber-400 mt-1">{activeTeam.stats.points}</p>
          </div>

        </div>

        {/* DASHBOARD TAB NAVIGATION */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider rounded-t-xl transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab('squad')}
            className={`px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider rounded-t-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'squad'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Squad ({activeTeam.squad.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('fixtures')}
            className={`px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider rounded-t-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fixtures'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming Fixtures ({upcomingMatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider rounded-t-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'results'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white bg-slate-900/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Recent Results ({completedMatches.length})</span>
          </button>
        </div>

        {/* TAB CONTENTS */}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Squad Snapshot Column */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-black text-lg uppercase text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  Official Squad Roster
                </h3>
                <button
                  onClick={() => setActiveTab('squad')}
                  className="text-xs font-mono font-bold text-emerald-400 hover:underline"
                >
                  View Full Squad →
                </button>
              </div>

              <div className="space-y-3">
                {activeTeam.squad.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-xs">
                        #{player.number}
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold font-mono">{player.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{player.position} • {player.gender}</p>
                      </div>
                    </div>

                    <div className="text-right text-[11px] font-mono">
                      <span className="text-amber-400 font-bold">{player.goals || 0} Goals</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Match Snapshot Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-black text-lg uppercase text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  Next Scheduled Match
                </h3>

                {upcomingMatches.length > 0 ? (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="text-center text-[10px] font-mono uppercase text-emerald-400 font-extrabold mb-3">
                      {upcomingMatches[0].competition} • {upcomingMatches[0].round}
                    </div>

                    <div className="grid grid-cols-3 items-center text-center my-4">
                      <div>
                        <p className="font-black text-sm text-white uppercase">{upcomingMatches[0].homeTeamName}</p>
                      </div>
                      <div>
                        <span className="text-xl font-mono font-black text-amber-400">VS</span>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">{upcomingMatches[0].time}</p>
                      </div>
                      <div>
                        <p className="font-black text-sm text-white uppercase">{upcomingMatches[0].awayTeamName}</p>
                      </div>
                    </div>

                    <div className="text-center text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-3 mt-2">
                      📍 {upcomingMatches[0].venue} • {upcomingMatches[0].date}
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500 text-xs font-mono">No upcoming match scheduled at this time.</p>
                )}
              </div>

              {/* Recent Result Snapshot */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-black text-lg uppercase text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Latest Match Result
                </h3>

                {completedMatches.length > 0 ? (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="text-center text-[10px] font-mono uppercase text-slate-400 mb-2">
                      {completedMatches[0].competition}
                    </div>

                    <div className="flex items-center justify-between font-mono font-extrabold text-base my-2">
                      <span className="text-white">{completedMatches[0].homeTeamName}</span>
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg">
                        {completedMatches[0].homeScore} - {completedMatches[0].awayScore}
                      </span>
                      <span className="text-white">{completedMatches[0].awayTeamName}</span>
                    </div>

                    {completedMatches[0].scorers && completedMatches[0].scorers.length > 0 && (
                      <div className="text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800 text-center">
                        Goalscorers: {completedMatches[0].scorers.join(', ')}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-500 text-xs font-mono">No recent match results logged yet.</p>
                )}
              </div>

            </div>

          </div>
        )}

        {/* SQUAD TAB */}
        {activeTab === 'squad' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-display font-black text-xl uppercase text-white mb-6">
              Complete {activeTeam.name} Player Squad
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTeam.squad.map((player) => (
                <div
                  key={player.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-lg">
                      #{player.number}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{player.name}</h4>
                      <p className="text-xs text-emerald-400 font-mono">{player.position}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">Gender: {player.gender}</p>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <p className="text-amber-400 font-bold">{player.goals || 0} Goals</p>
                    <p className="text-slate-500 text-[10px]">{player.matchesPlayed || 0} Apps</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FIXTURES TAB */}
        {activeTab === 'fixtures' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-display font-black text-xl uppercase text-white mb-4">
              Upcoming Match Schedule
            </h3>

            {upcomingMatches.length === 0 ? (
              <p className="text-slate-500 text-xs font-mono">No upcoming matches scheduled.</p>
            ) : (
              upcomingMatches.map((fix) => (
                <div key={fix.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{fix.competition} • {fix.round}</p>
                    <p className="text-base font-extrabold text-white uppercase mt-1">{fix.homeTeamName} vs {fix.awayTeamName}</p>
                  </div>

                  <div className="text-center sm:text-right font-mono text-xs text-slate-300">
                    <p className="font-bold text-amber-400">{fix.date} at {fix.time}</p>
                    <p className="text-slate-500 text-[11px]">📍 {fix.venue}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* RESULTS TAB */}
        {activeTab === 'results' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-display font-black text-xl uppercase text-white mb-4">
              Match History & Results
            </h3>

            {completedMatches.length === 0 ? (
              <p className="text-slate-500 text-xs font-mono">No completed match results recorded.</p>
            ) : (
              completedMatches.map((res) => (
                <div key={res.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">{res.competition}</p>
                    <div className="flex items-center gap-3 font-mono font-extrabold text-lg my-1">
                      <span className="text-white">{res.homeTeamName}</span>
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm">{res.homeScore} - {res.awayScore}</span>
                      <span className="text-white">{res.awayTeamName}</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right font-mono text-xs text-slate-400">
                    <p>{res.date}</p>
                    <p className="text-[10px]">{res.venue}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </section>
  );
}
