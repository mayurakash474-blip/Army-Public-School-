import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll testimonials every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonialsData[activeIndex];

  const relationBadgeColor = {
    Parent: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    Student: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Alumnus: 'bg-schoolgold-50 text-schoolgold-700 border-schoolgold-100'
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Visual background vector designs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy-50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-armygreen-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-navy-600 text-xs font-mono font-bold tracking-widest uppercase bg-navy-50 px-3.5 py-1.5 rounded-full border border-navy-100/50 flex items-center gap-1 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-schoolgold-500" /> Community Voices
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Trusted By Parents & Elite Alumni
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Swipeable Slides Area */}
        <div className="relative min-h-[340px] flex items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm relative"
            >
              {/* Giant decorative quotes */}
              <Quote className="absolute top-6 left-6 w-16 h-16 text-slate-200/50 -z-10" />

              {/* Star Ratings */}
              <div className="flex gap-1 mb-5">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 fill-schoolgold-400 text-schoolgold-400" />
                ))}
              </div>

              {/* Message text */}
              <p className="text-slate-700 font-serif italic text-sm sm:text-base leading-relaxed md:text-lg">
                "{activeTestimonial.text}"
              </p>

              {/* Divider */}
              <div className="w-12 h-px bg-slate-200 my-6" />

              {/* Reviewer Details */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                    <h5 className="font-display font-bold text-navy-950 text-sm sm:text-base leading-none">
                      {activeTestimonial.name}
                    </h5>
                    {/* Relation Badge */}
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border w-fit ${relationBadgeColor[activeTestimonial.relation]}`}>
                      {activeTestimonial.relation}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1 font-medium leading-none">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows for desk */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 bg-white border border-slate-150 text-slate-500 hover:text-navy-950 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 bg-white border border-slate-150 text-slate-500 hover:text-navy-950 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 bg-armygreen-600'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
