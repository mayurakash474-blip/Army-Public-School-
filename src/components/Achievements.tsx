import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Medal, Trophy, Compass, Award } from 'lucide-react';
import { achievementsData } from '../data';

// Intersection Observer driven counting component
function AnimatedCounter({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasTriggered) return;

    let start: number | null = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }, [hasTriggered, value, duration]);

  return <span ref={containerRef}>{count}</span>;
}

export default function Achievements() {
  const iconMap = {
    CheckCircle: CheckCircle,
    Medal: Medal,
    Trophy: Trophy,
    Compass: Compass,
    Award: Award,
  };

  return (
    <section id="achievements" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Dark theme architectural lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-800/40" />
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,#15803d,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-schoolgold-400 text-xs font-mono font-bold tracking-widest uppercase bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
            School Achievements
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-white tracking-tighter uppercase italic leading-[1.1]">
            Our Milestones of Discipline & Glory
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-400 text-xs sm:text-sm">
            Army Public School Aliabad Hunza consistently sets benchmarks in board certifications, athletics, and national competitions.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {achievementsData.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName as keyof typeof iconMap] || Trophy;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                key={stat.title}
                className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-slate-700/80 transition-all text-center flex flex-col justify-between"
              >
                <div>
                  {/* Icon container */}
                  <div className={`mx-auto p-3.5 rounded-xl w-fit ${stat.colorClass} border border-transparent flex items-center justify-center mb-5`}>
                    <IconComponent className="w-5 h-5 shrink-0" />
                  </div>

                  {/* Animated Counter with suffix */}
                  <h4 className="text-4xl sm:text-5xl font-display font-black text-white italic tracking-tighter leading-none mb-2">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-schoolgold-400 font-extrabold ml-0.5">{stat.suffix}</span>
                  </h4>

                  <h5 className="text-slate-100 font-display font-bold text-xs sm:text-sm tracking-wide leading-snug uppercase">
                    {stat.title}
                  </h5>

                  <p className="text-slate-400 text-xs leading-relaxed mt-3">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
