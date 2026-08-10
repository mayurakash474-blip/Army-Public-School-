import React, { useState } from 'react';
import { ShieldCheck, User, CheckCircle2, Trophy, AlertCircle, ArrowRight, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { FootballTeam, TeamRegistrationRequest } from '../types';
import { initialFootballTeams } from '../data';
import { saveTeamRegistration } from '../lib/firebase';

interface TeamRegistrationProps {
  loggedInUsername?: string;
  onRegistrationComplete: (reg: TeamRegistrationRequest) => void;
}

export default function TeamRegistration({ loggedInUsername, onRegistrationComplete }: TeamRegistrationProps) {
  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [selectedTeamId, setSelectedTeamId] = useState<string>('bimal-fc');
  const [position, setPosition] = useState<'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'>('Forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registrationModalData, setRegistrationModalData] = useState<TeamRegistrationRequest | null>(null);

  // Teams list (Bimal FC and Royal FC prominently displayed)
  const availableTeams: FootballTeam[] = initialFootballTeams;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name to proceed with team registration.');
      return;
    }

    if (!whatsappNumber.trim()) {
      setErrorMessage('Please enter your WhatsApp phone number (e.g. 03xxxxxxxxx).');
      return;
    }

    const selectedTeam = availableTeams.find(t => t.id === selectedTeamId) || availableTeams[0];

    setIsSubmitting(true);

    try {
      const regData = {
        fullName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        gender,
        teamId: selectedTeam.id,
        teamName: selectedTeam.name,
        registeredAt: new Date().toLocaleString(),
        username: loggedInUsername || 'User',
        status: 'Confirmed' as const,
        position
      };

      // Save to Firestore
      const savedDoc = await saveTeamRegistration(regData);

      // Save locally to persist session
      localStorage.setItem('pff_registered_team', JSON.stringify(savedDoc));

      setRegistrationModalData(savedDoc);
      setSuccessMessage(`You are registered to team ${selectedTeam.name}. We will send you message on WhatsApp.`);

    } catch (err) {
      console.error("Error submitting team registration:", err);
      // Fallback local registration
      const fallbackReg: TeamRegistrationRequest = {
        id: `local_reg_${Date.now()}`,
        fullName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        gender,
        teamId: selectedTeam.id,
        teamName: selectedTeam.name,
        registeredAt: new Date().toLocaleString(),
        username: loggedInUsername || 'User',
        status: 'Confirmed',
        position
      };
      localStorage.setItem('pff_registered_team', JSON.stringify(fallbackReg));
      setRegistrationModalData(fallbackReg);
      setSuccessMessage(`You are registered to team ${selectedTeam.name}. We will send you message on WhatsApp.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register-team" className="py-16 bg-slate-900 text-white relative">
      {/* Background Decorative Accents */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Official PFF Registration Portal
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mb-3">
            Register Your Team
          </h2>

          <p className="text-slate-300 text-sm font-normal">
            Select your club, enter your member details, and secure your place in the official Pakistan Football Federation player registry.
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-slate-950 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80">
          
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* ERROR & SUCCESS ALERTS */}
            {errorMessage && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs font-mono animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs font-mono animate-fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* STEP 1: PERSONAL INFORMATION */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-slate-950 font-black font-mono text-xs flex items-center justify-center">
                  1
                </div>
                <h3 className="text-base font-bold font-display uppercase tracking-wider text-emerald-400">
                  Your Personal Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Your Full Name */}
                <div>
                  <label htmlFor="fullNameInput" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Your Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="fullNameInput"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm font-sans text-white placeholder-slate-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* WhatsApp Number Input */}
                <div>
                  <label htmlFor="whatsappInput" className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                    WhatsApp Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="whatsappInput"
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="03xxxxxxxxx"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm font-sans text-white placeholder-slate-500 transition-colors"
                      required
                    />
                  </div>
                  <p className="text-[11px] font-mono text-emerald-400/90 mt-1">
                    Example: 03xxxxxxxxx
                  </p>
                </div>

                {/* Gender */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Gender <span className="text-rose-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <button
                      type="button"
                      onClick={() => setGender('Male')}
                      className={`py-3 px-4 rounded-xl border text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        gender === 'Male'
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Male</span>
                      {gender === 'Male' && <CheckCircle2 className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setGender('Female')}
                      className={`py-3 px-4 rounded-xl border text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        gender === 'Female'
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Female</span>
                      {gender === 'Female' && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Position Preference */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Preferred Playing Position
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
                        position === pos
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* STEP 2: SELECT YOUR TEAM */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-slate-950 font-black font-mono text-xs flex items-center justify-center">
                  2
                </div>
                <h3 className="text-base font-bold font-display uppercase tracking-wider text-emerald-400">
                  Select Your Team
                </h3>
              </div>

              <p className="text-slate-400 text-xs font-mono">
                Choose your official PFF club from the featured teams below:
              </p>

              {/* TEAM CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableTeams.map((team) => {
                  const isSelected = selectedTeamId === team.id;

                  return (
                    <div
                      key={team.id}
                      onClick={() => setSelectedTeamId(team.id)}
                      className={`relative rounded-2xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-xl shadow-emerald-950/80 ring-1 ring-emerald-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {/* Selection Badge */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase font-mono flex items-center gap-1 shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        {/* Team Logo Placeholder / Image */}
                        <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 p-1 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                          <img
                            src={team.logo}
                            alt={`${team.name} Logo`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-black font-display uppercase text-white">
                              {team.name}
                            </h4>
                            <span className="text-[10px] bg-slate-800 text-amber-400 font-mono font-bold px-2 py-0.5 rounded">
                              {team.code}
                            </span>
                          </div>

                          <p className="text-xs text-emerald-400 font-mono font-semibold mt-0.5">
                            {team.city} • Home: {team.stadium}
                          </p>

                          <p className="text-slate-300 text-xs mt-2 line-clamp-2 font-sans">
                            {team.description}
                          </p>
                        </div>
                      </div>

                      {/* Team Stats Summary */}
                      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-center font-mono text-[11px] bg-slate-950/60 rounded-xl p-2.5 my-2">
                        <div>
                          <p className="text-slate-500 uppercase text-[9px]">Played</p>
                          <p className="text-white font-bold">{team.stats.played}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 uppercase text-[9px]">Wins</p>
                          <p className="text-emerald-400 font-bold">{team.stats.won}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 uppercase text-[9px]">Points</p>
                          <p className="text-amber-400 font-extrabold">{team.stats.points}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 uppercase text-[9px]">Coach</p>
                          <p className="text-slate-300 font-semibold truncate">{team.coach}</p>
                        </div>
                      </div>

                      {/* Select Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTeamId(team.id);
                        }}
                        className={`w-full mt-3 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {isSelected ? 'Team Selected' : 'Select Team'}
                      </button>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* PROMINENT SUBMISSION BUTTON: "Enter My Team" */}
            <div className="pt-6 border-t border-slate-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-base uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-950/80 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Registration...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>ENTER MY TEAM</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* REGISTRATION CONFIRMATION MODAL */}
      {registrationModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black font-display uppercase tracking-tight text-white mb-2">
              Registration Confirmed!
            </h3>

            <div className="bg-emerald-950/90 border border-emerald-500/50 rounded-2xl p-4 my-4 text-emerald-300 text-sm font-semibold leading-relaxed">
              You are registered to team <span className="font-extrabold text-white underline decoration-emerald-400">{registrationModalData.teamName}</span>. We will send you message on WhatsApp.
            </div>

            <div className="space-y-1.5 text-xs font-mono text-slate-300 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-left my-4">
              <p>• Player Name: <strong className="text-white">{registrationModalData.fullName}</strong></p>
              <p>• Registered Team: <strong className="text-emerald-400">{registrationModalData.teamName}</strong></p>
              <p>• WhatsApp Number: <strong className="text-amber-400">{registrationModalData.whatsappNumber || whatsappNumber}</strong></p>
              <p>• Position: <strong className="text-white">{registrationModalData.position || 'Forward'}</strong></p>
            </div>

            <button
              type="button"
              onClick={() => {
                const data = registrationModalData;
                setRegistrationModalData(null);
                onRegistrationComplete(data);
              }}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950/80 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Go To Team Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
