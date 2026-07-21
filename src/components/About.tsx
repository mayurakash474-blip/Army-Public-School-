import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Flag, Lightbulb, Check } from 'lucide-react';
import { aboutContent } from '../data';

export default function About() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  const iconsMap = {
    'Discipline': ShieldCheck,
    'Excellence': Award,
    'Honor': Flag,
    'Innovation': Lightbulb
  };

  const colorsMap = {
    'Discipline': 'text-navy-600 bg-navy-50 border-navy-100',
    'Excellence': 'text-armygreen-600 bg-armygreen-50 border-armygreen-100',
    'Honor': 'text-schoolgold-600 bg-schoolgold-50 border-schoolgold-100',
    'Innovation': 'text-purple-600 bg-purple-50 border-purple-100'
  };

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy-50/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-armygreen-50/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-armygreen-600 text-xs font-mono font-bold tracking-widest uppercase bg-armygreen-50 px-3.5 py-1.5 rounded-full border border-armygreen-100/50">
            About Our Institution
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Committed to Discipline & Educational Innovation
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Intro + Tabbed Mission/Vision */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-slate-50/80 border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <h4 className="text-navy-900 font-display font-semibold text-lg sm:text-xl mb-4">
                A Legacy of Quality Education in Hunza
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {aboutContent.introduction}
              </p>
            </div>

            {/* Mission & Vision Tabs */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100">
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`flex-1 py-4 text-center font-display text-sm font-semibold transition-all ${
                    activeTab === 'mission'
                      ? 'text-armygreen-700 border-b-2 border-armygreen-600 bg-armygreen-50/30'
                      : 'text-slate-500 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`flex-1 py-4 text-center font-display text-sm font-semibold transition-all ${
                    activeTab === 'vision'
                      ? 'text-armygreen-700 border-b-2 border-armygreen-600 bg-armygreen-50/30'
                      : 'text-slate-500 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  Our Vision
                </button>
              </div>

              <div className="p-6 sm:p-8 min-h-[160px] flex flex-col justify-center">
                {activeTab === 'mission' ? (
                  <motion.div
                    key="mission-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="p-2.5 bg-armygreen-50 rounded-lg text-armygreen-600 shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-display font-semibold text-navy-900 text-sm sm:text-base mb-1">Empowering the Future</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{aboutContent.mission}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vision-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="p-2.5 bg-schoolgold-50 rounded-lg text-schoolgold-600 shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-display font-semibold text-navy-900 text-sm sm:text-base mb-1">Standard Leadership</h5>
                      <p className="text-slate-600 text-sm leading-relaxed">{aboutContent.vision}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Core Values Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 mb-2">
              <h4 className="text-navy-950 font-display font-bold text-lg">
                Our Pillars of Excellence
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm">
                Principles that drive daily learning, grooming, and achievements.
              </p>
            </div>

            {aboutContent.coreValues.map((value) => {
              const IconComponent = iconsMap[value.title as keyof typeof iconsMap] || ShieldCheck;
              const colorClass = colorsMap[value.title as keyof typeof colorsMap] || '';
              
              return (
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  key={value.title}
                  className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`p-3 rounded-xl w-fit ${colorClass} border mb-4`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h5 className="font-display font-bold text-navy-950 text-sm sm:text-base mb-2">
                      {value.title}
                    </h5>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
