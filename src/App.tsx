import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// PFF Modular Components
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import Hero from './components/Hero';
import TeamRegistration from './components/TeamRegistration';
import TeamDashboard from './components/TeamDashboard';
import TeamsList from './components/TeamsList';
import PlayersList from './components/PlayersList';
import Standings from './components/Standings';
import FixturesResults from './components/FixturesResults';
import NewsEvents from './components/NewsEvents';
import Footer from './components/Footer';

// Login & Admin Components (Strictly Preserved)
import InstagramLogin from './components/InstagramLogin';
import AdminPanel from './components/AdminPanel';

import { TeamRegistrationRequest } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Authentication states
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [studentUsername, setStudentUsername] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // User's Registered Team State
  const [userRegistration, setUserRegistration] = useState<TeamRegistrationRequest | null>(null);

  // Check persisted logins & registrations on mount
  useEffect(() => {
    const studentSess = localStorage.getItem('session_student');
    if (studentSess) {
      setIsStudentLoggedIn(true);
      setStudentUsername(studentSess);
    }
    const adminSess = localStorage.getItem('session_admin');
    if (adminSess === 'true') {
      setIsAdminLoggedIn(true);
    }

    const regData = localStorage.getItem('pff_registered_team');
    if (regData) {
      try {
        setUserRegistration(JSON.parse(regData));
      } catch (e) {
        console.error("Error parsing stored team registration:", e);
      }
    }
  }, []);

  const handleStudentLogin = (username: string) => {
    localStorage.setItem('session_student', username);
    setIsStudentLoggedIn(true);
    setStudentUsername(username);
  };

  const handleAdminLogin = () => {
    localStorage.setItem('session_admin', 'true');
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('session_student');
    localStorage.removeItem('session_admin');
    setIsStudentLoggedIn(false);
    setStudentUsername('');
    setIsAdminLoggedIn(false);
  };

  const handleRegistrationComplete = (reg: TeamRegistrationRequest) => {
    setUserRegistration(reg);
    // Scroll directly to My Team Dashboard!
    const element = document.getElementById('my-team');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleSelectTeamFromList = (teamId: string) => {
    // Scroll to dashboard and view selected team
    const element = document.getElementById('my-team');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 1. Render Admin Panel if logged in as administrator (STRICTLY PRESERVED)
  if (isAdminLoggedIn) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  // 2. Render Login Screen if not logged in (STRICTLY PRESERVED LOGIN UI)
  if (!isStudentLoggedIn) {
    return (
      <InstagramLogin 
        onUserLogin={handleStudentLogin} 
        onAdminLogin={handleAdminLogin} 
      />
    );
  }

  // 3. Render Official PFF Football Federation Platform when logged in
  return (
    <div id="pff-platform-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-emerald-500 selection:text-slate-950 pb-16 lg:pb-0">
      
      {/* Official PFF Header Navigation */}
      <Header 
        activeSection={activeSection} 
        onSelectSection={handleSelectSection}
        loggedInUsername={studentUsername}
        userRegisteredTeamName={userRegistration?.teamName}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col">
        {/* PFF Hero Banner & Featured Clash */}
        <Hero 
          onRegisterTeamClick={() => {
            const el = document.getElementById('register-team');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewStandingsClick={() => {
            const el = document.getElementById('standings');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* User Team Registration (Full Name, Gender, Select Bimal FC or Royal FC) */}
        <TeamRegistration 
          loggedInUsername={studentUsername}
          onRegistrationComplete={handleRegistrationComplete}
        />

        {/* User Team Dashboard (Team details, Squad, Fixtures, Stats) */}
        <TeamDashboard 
          userRegistration={userRegistration}
          onOpenRegisterNewTeam={() => {
            const el = document.getElementById('register-team');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* League Standings (Dynamic League Table) */}
        <Standings onSelectTeam={handleSelectTeamFromList} />

        {/* Fixtures & Results (Match Center) */}
        <FixturesResults />

        {/* PFF Teams Directory (Bimal FC, Royal FC) */}
        <TeamsList 
          onSelectTeam={handleSelectTeamFromList}
          onRegisterTeamClick={() => {
            const el = document.getElementById('register-team');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Registered Players Roster */}
        <PlayersList />

        {/* PFF Official News & Governance */}
        <NewsEvents />
      </main>

      {/* PFF Federation Footer */}
      <Footer onNavClick={(section) => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Mobile Bottom Bar Navigation */}
      <MobileBottomNav 
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        userRegisteredTeamName={userRegistration?.teamName}
      />

      {/* Floating Scroll-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="pff-scroll-top"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={handleScrollToTop}
            className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 p-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-full shadow-2xl border border-emerald-400 z-50 transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[3]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
