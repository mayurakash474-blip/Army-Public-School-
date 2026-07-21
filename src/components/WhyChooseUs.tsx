import { motion } from 'motion/react';
import { Users, Tv, Beaker, Monitor, Library, Trophy, ShieldAlert, ShieldCheck } from 'lucide-react';
import { whyChooseUs } from '../data';

export default function WhyChooseUs() {
  // Mapping strings in data.ts to active Lucide components
  const iconMap = {
    Users: Users,
    Tv: Tv,
    Beaker: Beaker,
    Monitor: Monitor,
    Library: Library,
    Trophy: Trophy,
    ShieldAlert: ShieldAlert,
    ShieldCheck: ShieldCheck,
  };

  const styleColors = {
    Users: 'text-sky-600 bg-sky-50 border-sky-100/50',
    Tv: 'text-indigo-600 bg-indigo-50 border-indigo-100/50',
    Beaker: 'text-emerald-600 bg-emerald-50 border-emerald-100/50',
    Monitor: 'text-purple-600 bg-purple-50 border-purple-100/50',
    Library: 'text-pink-600 bg-pink-50 border-pink-100/50',
    Trophy: 'text-schoolgold-600 bg-schoolgold-50 border-schoolgold-100/50',
    ShieldAlert: 'text-red-600 bg-red-50 border-red-100/50',
    ShieldCheck: 'text-armygreen-600 bg-armygreen-50 border-armygreen-100/50',
  };

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background visual elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-navy-100/30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-armygreen-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-armygreen-600 text-xs font-mono font-bold tracking-widest uppercase bg-armygreen-50 px-3.5 py-1.5 rounded-full border border-armygreen-100/50">
            Why Choose Our School
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Comprehensive Facilities For Modern Leadership
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-500 text-xs sm:text-sm">
            Army Public School Aliabad Hunza integrates standardized state-of-the-art facilities with military-grade discipline.
          </p>
        </div>

        {/* Feature Bento-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName as keyof typeof iconMap] || ShieldCheck;
            const styleColor = styleColors[feature.iconName as keyof typeof styleColors] || '';

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.01 }}
                key={feature.title}
                className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3.5 rounded-xl w-fit border mb-5 ${styleColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h4 className="font-display font-bold text-navy-950 text-base leading-snug">
                    {feature.title}
                  </h4>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2.5">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Highlight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-navy-950 border border-navy-800 p-6 sm:p-8 rounded-2xl text-center relative overflow-hidden"
        >
          {/* Subtle logo element in water-mark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-display font-black text-6xl select-none uppercase pointer-events-none tracking-widest">
            APS CRITERIA
          </div>
          
          <p className="text-schoolgold-400 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1.5">
            Strict Standards Of Safety & Quality
          </p>
          <p className="text-slate-200 font-display font-semibold text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            "Our standards are verified under the Army Public Schools and Colleges System (APSACS) guidelines, providing consistent pedagogical testing, child security, and staff vetting."
          </p>
        </motion.div>

      </div>
    </section>
  );
}
