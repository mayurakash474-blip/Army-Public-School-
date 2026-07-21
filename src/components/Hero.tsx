import { ArrowDown, Compass, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { heroCampus } from '../data';

export default function Hero() {
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

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-navy-950 pt-16"
    >
      {/* Background Image with optimized lazy loader and high quality */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroCampus} 
          alt="Army Public School Aliabad Hunza Campus" 
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Deep, premium military/institutional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-navy-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/20" />
      </div>

      {/* Floating Sparkle/Grid Graphic Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-8 sm:mt-0">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-armygreen-600/90 backdrop-blur-md text-white border border-armygreen-400/30 px-3 py-1.5 rounded-full shadow-lg mb-6 sm:mb-8 text-[11px] font-mono tracking-widest uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-schoolgold-400 animate-ping" />
          Federal Board (FBISE) Affiliated School & College
        </motion.div>

        {/* School Name displaying Poppins elegant font */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <p className="text-schoolgold-400 text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase font-mono">
            ARMY PUBLIC SCHOOL ALIABAD HUNZA
          </p>
          <h1 className="text-white font-display font-black text-6xl sm:text-8xl md:text-9xl leading-[0.85] tracking-tighter uppercase italic">
            Building<br />
            Future<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-schoolgold-400 via-schoolgold-300 to-armygreen-400">
              Leaders.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle / Punchlines */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-slate-300 font-sans font-medium text-xs sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Inspiring academic excellence and building character in the heart of Gilgit-Baltistan. Proudly serving under FBISE standards.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-0"
        >
          {/* Explore school button with ripple-styled shadow */}
          <button
            onClick={() => handleScrollTo('about')}
            className="w-full sm:w-auto relative group overflow-hidden bg-armygreen-600 hover:bg-armygreen-500 text-white font-display font-semibold uppercase tracking-wider text-xs px-8 py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 border border-armygreen-400/20 active:scale-95"
          >
            <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
            Explore School
          </button>

          {/* Contact button */}
          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto bg-navy-950/60 hover:bg-navy-900/80 text-white font-display font-semibold uppercase tracking-wider text-xs px-8 py-4 rounded-xl shadow-lg border border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 hover:border-schoolgold-400 active:scale-95"
          >
            <Phone className="w-4 h-4 text-schoolgold-400" />
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Floating Animated scroll down prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => handleScrollTo('about')}
          className="p-2 bg-navy-900/80 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-navy-800 transition-colors shadow-lg backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}
