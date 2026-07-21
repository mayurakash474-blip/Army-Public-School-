import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { galleryItems } from '../data';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Campus',
    'Classrooms',
    'Events',
    'Sports',
    'Science Lab',
    'Computer Lab',
    'Annual Functions',
    'Student Activities'
  ];

  // Filter items based on selected category
  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // Handle previous image in lightbox
  const showPrev = () => {
    if (lightboxIndex === null) return;
    const prevIndex = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
  };

  // Handle next image in lightbox
  const showNext = () => {
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIndex);
  };

  // Listen to keyboard arrow and escape keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-navy-600 text-xs font-mono font-bold tracking-widest uppercase bg-navy-50 px-3.5 py-1.5 rounded-full border border-navy-100/50">
            School Gallery
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Visual Glimpses Of Campus Life
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-500 text-xs sm:text-sm">
            Capturing milestones, high-altitude sports, scientific investigation, and community assemblies in the Hunza region.
          </p>
        </div>

        {/* Category Filters (Horizontal scrollable on mobile) */}
        <div className="flex justify-start md:justify-center items-center gap-1.5 overflow-x-auto pb-4 mb-10 -mx-4 px-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest font-display transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === cat
                  ? 'bg-armygreen-600 text-white shadow-md border-b-2 border-schoolgold-400'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-navy-950 border border-slate-150'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-2xl border border-slate-150 bg-slate-50 aspect-4/3 cursor-zoom-in shadow-sm hover:shadow-lg transition-all"
              >
                {/* Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  <span className="bg-schoolgold-400 text-navy-950 text-[9px] font-mono font-bold px-2 py-0.5 rounded w-fit mb-2">
                    {item.category}
                  </span>
                  <h5 className="text-white font-display font-bold text-sm sm:text-base leading-tight">
                    {item.title}
                  </h5>
                  <p className="text-slate-300 text-[11px] leading-relaxed mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state if category has no items */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100">
            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-medium">No images uploaded in this category yet.</p>
          </div>
        )}

        {/* Lightbox Preview Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredItems[lightboxIndex] && (
            <>
              {/* Dark backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="fixed inset-0 bg-slate-950 z-50 backdrop-blur-sm"
              />

              {/* Lightbox container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:max-w-4xl md:mx-auto z-50 outline-none flex flex-col gap-4"
              >
                {/* Top close bar */}
                <div className="flex justify-between items-center text-white px-2">
                  <span className="text-xs font-mono font-bold text-schoolgold-400">
                    APS GALLERY • IMAGE {lightboxIndex + 1} OF {filteredItems.length}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="p-2 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
                    aria-label="Close lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main image stage with navigation controls */}
                <div className="relative aspect-video max-h-[60vh] bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
                  <img
                    src={filteredItems[lightboxIndex].url}
                    alt={filteredItems[lightboxIndex].title}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />

                  {/* Left arrow */}
                  <button
                    onClick={(e) => { e.stopPropagation(); showPrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-navy-950/80 hover:bg-navy-900 text-white rounded-full shadow-lg border border-white/10 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right arrow */}
                  <button
                    onClick={(e) => { e.stopPropagation(); showNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-navy-950/80 hover:bg-navy-900 text-white rounded-full shadow-lg border border-white/10 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Image details card below */}
                <div className="bg-slate-900/90 border border-white/10 p-5 rounded-2xl text-white">
                  <span className="bg-armygreen-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white mt-2">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
