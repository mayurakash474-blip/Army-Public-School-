import { motion } from 'motion/react';
import { Quote, Sparkles, Award } from 'lucide-react';
import { principalMessage } from '../data';

export default function PrincipalMessage() {
  return (
    <section id="principal" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-schoolgold-100/30 rounded-full blur-3xl -z-10 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Principal Image Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full">
              {/* Outer floating golden shadow frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-schoolgold-400 to-armygreen-600 rounded-3xl opacity-20 blur-sm" />
              
              <div className="relative bg-white p-4 rounded-3xl shadow-xl border border-slate-100 overflow-hidden group">
                {/* Principal Photo */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={principalMessage.image}
                    alt={principalMessage.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Badge ribbon overlay */}
                <div className="absolute top-6 right-6 bg-navy-950 text-schoolgold-400 px-3.5 py-1.5 rounded-full shadow-lg border border-schoolgold-400/40 flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-semibold">
                  <Award className="w-3.5 h-3.5 text-schoolgold-400" />
                  Principal
                </div>

                {/* Name & Designation Frame */}
                <div className="mt-5 text-center bg-gradient-to-br from-navy-900 to-navy-950 p-4 rounded-xl border border-navy-800">
                  <h4 className="text-white font-display font-bold text-base sm:text-lg">
                    {principalMessage.name}
                  </h4>
                  <p className="text-schoolgold-400 text-xs font-semibold uppercase tracking-wider mt-1">
                    {principalMessage.designation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Message Text content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-8 bg-armygreen-600 rounded" />
              <span className="text-armygreen-600 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Welcome Address
              </span>
            </div>

            <div className="relative">
              {/* Decorative quotation icon */}
              <Quote className="absolute -top-6 -left-4 w-12 h-12 text-slate-200/80 -z-10" />
              
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 leading-snug tracking-tight">
                "{principalMessage.welcomeText}"
              </h3>
            </div>

            {/* Principal message text split into paragraph lines */}
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed flex flex-col gap-4">
              {principalMessage.message.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Principal Motto & Signoff */}
            <div className="border-t border-slate-200 pt-6 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-navy-950 font-display font-semibold italic text-sm">
                  "{principalMessage.signatureText}"
                </p>
                <p className="text-slate-400 text-[11px] font-mono mt-1">
                  OFFICE OF THE PRINCIPAL • APS ALIABAD
                </p>
              </div>

              {/* Graphical representation of military signature */}
              <div className="px-5 py-2.5 bg-white border border-slate-150 rounded-xl flex flex-col items-center">
                <span className="font-serif italic font-semibold text-armygreen-700 tracking-wider text-sm select-none">
                  Tariq Baig
                </span>
                <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase border-t border-slate-100 pt-1 mt-1">
                  Authorized Sign
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
