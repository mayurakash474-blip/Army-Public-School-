import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Baby, BookOpen, GraduationCap, FileText, Award, X, Check, ArrowRight } from 'lucide-react';
import { academicsCards } from '../data';
import { AcademicCard } from '../types';

interface AcademicsProps {
  onSelectProgramForInquiry: (programName: string) => void;
}

export default function Academics({ onSelectProgramForInquiry }: AcademicsProps) {
  const [selectedProgram, setSelectedProgram] = useState<AcademicCard | null>(null);

  // Map string icon names to Lucide icon components
  const iconMap = {
    Baby: Baby,
    BookOpen: BookOpen,
    GraduationCap: GraduationCap,
    FileText: FileText,
    Award: Award,
  };

  const colorClasses = {
    Baby: 'text-pink-600 bg-pink-50 border-pink-100/50 hover:bg-pink-100/30',
    BookOpen: 'text-sky-600 bg-sky-50 border-sky-100/50 hover:bg-sky-100/30',
    GraduationCap: 'text-armygreen-600 bg-armygreen-50 border-armygreen-100/50 hover:bg-armygreen-100/30',
    FileText: 'text-purple-600 bg-purple-50 border-purple-100/50 hover:bg-purple-100/30',
    Award: 'text-schoolgold-600 bg-schoolgold-50 border-schoolgold-100/50 hover:bg-schoolgold-100/30',
  };

  return (
    <section id="academics" className="py-20 bg-white relative overflow-hidden">
      {/* Visual top dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-navy-600 text-xs font-mono font-bold tracking-widest uppercase bg-navy-50 px-3.5 py-1.5 rounded-full border border-navy-100/50">
            Academics Programs
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Academic Excellence from Montessori to FSc
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-500 text-xs sm:text-sm">
            Curriculums meticulously tailored under the Federal Board (FBISE) standards to cultivate core mathematical, analytical, and leadership attributes.
          </p>
        </div>

        {/* Academics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {academicsCards.map((card, idx) => {
            const IconComponent = iconMap[card.iconName as keyof typeof iconMap] || BookOpen;
            const styleColor = colorClasses[card.iconName as keyof typeof colorClasses] || '';

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={card.title}
                className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`p-4 rounded-2xl w-fit border transition-colors mb-5 ${styleColor}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {card.ageGroup.split('(')[0]}
                  </span>
                  
                  <h4 className="font-display font-bold text-navy-950 text-base sm:text-lg mt-1 group-hover:text-armygreen-700 transition-colors">
                    {card.title}
                  </h4>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-3 line-clamp-3">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setSelectedProgram(card)}
                    className="w-full bg-slate-50 hover:bg-navy-950 hover:text-white text-navy-950 font-display font-bold text-xs py-3 rounded-xl border border-slate-150 hover:border-navy-950 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    View Curriculum
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Program Info Modal */}
        <AnimatePresence>
          {selectedProgram && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProgram(null)}
                className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]"
              >
                {/* Header Banner */}
                <div className="bg-navy-950 text-white p-6 relative">
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-mono text-schoolgold-400 uppercase tracking-widest font-bold">
                    Academics Overview
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-bold mt-1 text-white">
                    {selectedProgram.title} Program
                  </h4>
                  <p className="text-slate-300 text-xs mt-1.5 font-medium">
                    {selectedProgram.ageGroup}
                  </p>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
                  {/* Long Description */}
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                      Program Description
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {selectedProgram.description}
                    </p>
                  </div>

                  {/* Program Highlights */}
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">
                      Key Highlights & Competencies
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProgram.highlights.map((point) => (
                        <div key={point} className="flex gap-2 items-start">
                          <div className="p-1 bg-armygreen-50 rounded text-armygreen-600 mt-0.5 shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-xs text-slate-600 font-medium">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum Details */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1 font-bold">
                      Curriculum Framework
                    </h5>
                    <p className="text-slate-700 text-xs sm:text-sm font-medium">
                      {selectedProgram.curriculum}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 flex gap-3">
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="flex-1 bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold font-display py-3 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onSelectProgramForInquiry(selectedProgram.title);
                      setSelectedProgram(null);
                    }}
                    className="flex-1 bg-armygreen-600 hover:bg-armygreen-500 text-white text-xs font-bold font-display py-3 rounded-xl shadow-md border border-armygreen-500 hover:border-armygreen-400 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Admission Inquiry
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
