import { Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram, ShieldAlert, ArrowUp } from 'lucide-react';
import { schoolContact, schoolLogoUrl } from '../data';

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300 relative border-t border-navy-900 overflow-hidden">
      {/* Decorative vector overlays */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-armygreen-950 opacity-20 rounded-full blur-3xl -z-10" />

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Col 1: Crest & Mission Summary */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div 
            onClick={() => handleScrollTo('home')}
            className="flex items-center gap-3 cursor-pointer group w-fit"
          >
            {/* Real Official Crest Logo */}
            <div className="relative w-11 h-11 bg-white rounded-xl p-0.5 shadow-inner border border-schoolgold-400/80 flex items-center justify-center transform transition-transform group-hover:scale-105 duration-300 overflow-hidden">
              <img 
                src={schoolLogoUrl} 
                alt="APS Aliabad Hunza Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <h2 className="text-white font-display font-bold text-sm sm:text-base leading-none tracking-wide">
                ARMY PUBLIC SCHOOL
              </h2>
              <p className="text-schoolgold-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed">
                ALIABAD HUNZA
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Educating, grooming, and preparing disciplined future leaders of Pakistan. Proudly operating under the Federal Board of Intermediate and Secondary Education (FBISE) standards in Gilgit-Baltistan.
          </p>

          {/* Social Handles */}
          <div className="flex gap-3.5 mt-2">
            <a
              href={schoolContact.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-navy-900 hover:bg-armygreen-600 hover:text-white rounded-xl text-slate-400 border border-navy-800 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={schoolContact.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-navy-900 hover:bg-armygreen-600 hover:text-white rounded-xl text-slate-400 border border-navy-800 transition-colors"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={schoolContact.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-navy-900 hover:bg-armygreen-600 hover:text-white rounded-xl text-slate-400 border border-navy-800 transition-colors"
              aria-label="Follow us on Youtube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={schoolContact.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-navy-900 hover:bg-armygreen-600 hover:text-white rounded-xl text-slate-400 border border-navy-800 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest text-schoolgold-400 border-b border-navy-800 pb-2">
            Quick Navigation
          </h4>
          <nav className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <button
              onClick={() => handleScrollTo('home')}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Home Campus Landing
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              About & Core Values
            </button>
            <button
              onClick={() => handleScrollTo('principal')}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Principal's Welcome
            </button>
            <button
              onClick={() => handleScrollTo('academics')}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Academics & Curriculum
            </button>
            <button
              onClick={() => handleScrollTo('gallery')}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Visual Image Gallery
            </button>
            <button
              onClick={() => handleScrollTo('news')}
              className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              News & Events Bulletin
            </button>
          </nav>
        </div>

        {/* Col 3: Contact Directory Details */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest text-schoolgold-400 border-b border-navy-800 pb-2">
            Campus Information
          </h4>
          <div className="flex flex-col gap-3.5 text-xs sm:text-sm text-slate-400">
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-4.5 h-4.5 text-schoolgold-400 shrink-0 mt-0.5" />
              <span>{schoolContact.address}</span>
            </div>
            
            <div className="flex gap-2.5 items-center">
              <Phone className="w-4.5 h-4.5 text-schoolgold-400 shrink-0" />
              <span className="select-all hover:text-white">{schoolContact.phone}</span>
            </div>

            <div className="flex gap-2.5 items-center">
              <Mail className="w-4.5 h-4.5 text-schoolgold-400 shrink-0" />
              <span className="select-all hover:text-white truncate">{schoolContact.email}</span>
            </div>

            <div className="mt-2 bg-navy-900 border border-navy-800 p-3.5 rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-schoolgold-400 shrink-0" />
              <p className="text-[10px] sm:text-xs text-slate-300">
                Admissions open for matric and FSc parts! Contact administrative desk during office hours.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lower Copyright Panel */}
      <div className="bg-navy-950/80 border-t border-navy-900 py-6 text-center text-[11px] sm:text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Army Public School Aliabad Hunza. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-600">Affiliated with FBISE Islamabad</span>
            <span>•</span>
            <span className="text-slate-600">Secure Campus Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
