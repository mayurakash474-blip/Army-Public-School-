import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, X, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import { newsEventsData } from '../data';
import { NewsEvent } from '../types';

export default function NewsEvents() {
  const [activeStory, setActiveStory] = useState<NewsEvent | null>(null);

  const categoryColor = {
    Announcement: 'text-rose-600 bg-rose-50 border-rose-100/50',
    Event: 'text-armygreen-600 bg-armygreen-50 border-armygreen-100/50',
    Sports: 'text-schoolgold-600 bg-schoolgold-50 border-schoolgold-100/50',
    Academic: 'text-navy-600 bg-navy-50 border-navy-100/50',
  };

  return (
    <section id="news" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-armygreen-600 text-xs font-mono font-bold tracking-widest uppercase bg-armygreen-50 px-3.5 py-1.5 rounded-full border border-armygreen-100/50">
            News & Events Bulletin
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Latest Updates & Campus Bulletins
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-500 text-xs sm:text-sm">
            Stay updated with admissions timelines, STEM fairs, community notifications, and student excellence programs.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsEventsData.map((item, idx) => {
            const badgeStyle = categoryColor[item.category as keyof typeof categoryColor] || '';

            return (
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                key={item.id}
                className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col h-full group"
              >
                {/* Story Image Stage with calendar tag overlay */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Date Flag */}
                  <div className="absolute top-4 left-4 bg-navy-950/95 backdrop-blur-md rounded-xl p-2.5 text-center shadow-lg border border-white/15 min-w-[50px] flex flex-col justify-center leading-none">
                    <span className="text-white font-display font-extrabold text-sm sm:text-base tracking-tight block">
                      {item.date}
                    </span>
                    <span className="text-schoolgold-300 font-mono text-[9px] font-bold uppercase block mt-1 tracking-wider">
                      {item.month}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag */}
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border mb-3 ${badgeStyle}`}>
                      {item.category}
                    </span>

                    <h4 className="font-display font-bold text-navy-950 text-sm sm:text-base leading-snug group-hover:text-armygreen-700 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-slate-500 text-xs leading-relaxed mt-2.5 line-clamp-3">
                      {item.shortDesc}
                    </p>
                  </div>

                  {/* Read More link button */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setActiveStory(item)}
                      className="text-navy-950 font-display font-bold text-xs hover:text-armygreen-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Story Modal popup */}
        <AnimatePresence>
          {activeStory && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveStory(null)}
                className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
              />

              {/* Story Modal Content Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]"
              >
                {/* Header Banner */}
                <div className="relative aspect-video bg-slate-100">
                  <img
                    src={activeStory.image}
                    alt={activeStory.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Date Over */}
                  <div className="absolute bottom-4 left-4 bg-navy-950/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg border border-white/10 text-white font-mono text-[10px] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-schoolgold-400" />
                    {activeStory.date} {activeStory.month}, 2026
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setActiveStory(null)}
                    className="absolute top-4 right-4 p-2 bg-navy-950/85 hover:bg-navy-900 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body details */}
                <div className="p-6 overflow-y-auto flex-1">
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border mb-3 ${categoryColor[activeStory.category as keyof typeof categoryColor]}`}>
                    {activeStory.category}
                  </span>

                  <h4 className="text-lg sm:text-xl font-display font-bold text-navy-950 leading-snug">
                    {activeStory.title}
                  </h4>

                  <div className="w-8 h-0.5 bg-schoolgold-400 my-4" />

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {activeStory.longDesc}
                  </p>
                </div>

                {/* Footer close bar */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
                  <button
                    onClick={() => setActiveStory(null)}
                    className="bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold font-display px-6 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Close Article
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
