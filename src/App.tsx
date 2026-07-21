import { useState, useEffect } from 'react';
import { ArrowUp, Award, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import custom modular components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PrincipalMessage from './components/PrincipalMessage';
import Academics from './components/Academics';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Achievements from './components/Achievements';
import Faculty from './components/Faculty';
import NewsEvents from './components/NewsEvents';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// New authentication components
import InstagramLogin from './components/InstagramLogin';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [inquirySubject, setInquirySubject] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Authentication states with local storage persistence
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [studentUsername, setStudentUsername] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check persisted logins on mount
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


  // Scroll to top visibility listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for highlighting active section in Header Nav
  useEffect(() => {
    const sections = [
      'home',
      'about',
      'principal',
      'academics',
      'why-choose-us',
      'gallery',
      'achievements',
      'faculty',
      'news',
      'contact'
    ];

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-35% 0px -55% 0px' // Optimal trigger boundary for scrolling active highlights
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectProgramInquiry = (programName: string) => {
    setInquirySubject(programName);
  };

  const handleClearInquirySubject = () => {
    setInquirySubject('');
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Render Admin Panel if logged in as administrator
  if (isAdminLoggedIn) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  // Render Instagram Authentication if not logged in as student or admin
  if (!isStudentLoggedIn) {
    return (
      <InstagramLogin 
        onUserLogin={handleStudentLogin} 
        onAdminLogin={handleAdminLogin} 
      />
    );
  }

  return (
    <div id="school-site-root" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col relative">
      {/* Sticky Top Header Navigation with Student identity */}
      <Header 
        activeSection={activeSection} 
        loggedInUsername={studentUsername}
        onLogout={handleLogout}
      />

      {/* Main Content Areas */}
      <main className="flex-1 flex flex-col">
        {/* Full Screen Hero Section */}
        <Hero />


        {/* Floating News / Alert Ticker Bar */}
        <div className="bg-navy-900 border-y border-navy-800/80 text-white py-3.5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 flex-col sm:flex-row text-center sm:text-left">
            <span className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-schoolgold-400">
              <Sparkles className="w-4 h-4 animate-spin text-schoolgold-400" /> Announcements:
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-xs sm:text-sm font-medium truncate">
                Admissions are officially open for Fall 2026 session (Montessori Prep to Higher Secondary FSc) - Apply before Aug 30!
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('news');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-schoolgold-400 hover:text-white font-display font-bold text-xs flex items-center gap-1 transition-colors underline decoration-dotted"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* About Section (Introduction, Vision, Mission, Core Values) */}
        <About />

        {/* Principal Welcoming Address section */}
        <PrincipalMessage />

        {/* Academics Sections (Pre School, Primary, Middle, Secondary, FSc cards) */}
        <Academics onSelectProgramForInquiry={handleSelectProgramInquiry} />

        {/* Why Choose Us features grid */}
        <WhyChooseUs />

        {/* Image Gallery categories masonry grid */}
        <Gallery />

        {/* Metric Achievements Counters (Board results, scholarships, trophies) */}
        <Achievements />

        {/* Faculty members profile directory */}
        <Faculty />

        {/* News Bulletins & Event cards */}
        <NewsEvents />

        {/* Parent / Student Testimonials swipeable slider */}
        <Testimonials />

        {/* Contact details, Map integration and Inquiry form */}
        <Contact 
          inquirySubject={inquirySubject}
          onClearInquirySubject={handleClearInquirySubject}
        />
      </main>

      {/* Footer information and copyrights */}
      <Footer />

      {/* Animated Floating Scroll-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scroll-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3.5 bg-armygreen-600 hover:bg-armygreen-500 text-white rounded-full shadow-2xl border border-armygreen-500 hover:border-armygreen-400 z-50 transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
