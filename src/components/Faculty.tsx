import { motion } from 'motion/react';
import { Award, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react';
import { facultyData } from '../data';

export default function Faculty() {
  return (
    <section id="faculty" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-armygreen-100/20 rounded-full blur-3xl -z-10 -translate-y-1/2 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-navy-600 text-xs font-mono font-bold tracking-widest uppercase bg-navy-50 px-3.5 py-1.5 rounded-full border border-navy-100/50">
            Our Elite Educators
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Highly Expert & Disciplined Faculty
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-500 text-xs sm:text-sm">
            Educators undergo rigorous vetting and continuous professional pedagogy training to prepare future high-achieving leaders.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyData.map((member, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              key={member.id}
              className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Profile Photo */}
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-navy-950/90 backdrop-blur-xs text-schoolgold-400 text-[9px] font-mono font-bold px-2.5 py-1 rounded-md shadow-md border border-schoolgold-400/20 uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-schoolgold-400" />
                    Verified APS Staff
                  </div>
                </div>

                {/* Details */}
                <h4 className="mt-5 font-display font-bold text-navy-950 text-base sm:text-lg group-hover:text-armygreen-700 transition-colors">
                  {member.name}
                </h4>
                
                <p className="text-armygreen-600 font-mono text-[11px] font-bold uppercase tracking-wider mt-1.5">
                  {member.designation}
                </p>

                {/* Separator line */}
                <div className="w-8 h-px bg-slate-200 my-4" />

                <div className="flex flex-col gap-2">
                  {/* Qualification */}
                  <div className="flex gap-2.5 items-start">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-xs leading-tight font-medium">
                      {member.qualification}
                    </span>
                  </div>

                  {/* Experience */}
                  <div className="flex gap-2.5 items-center">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-600 text-xs leading-none">
                      <span className="text-navy-950 font-semibold">{member.experience}</span> of Teaching Experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge footer design accent */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-400">
                  APS Aliabad
                </span>
                <Award className="w-4 h-4 text-slate-300 group-hover:text-schoolgold-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
