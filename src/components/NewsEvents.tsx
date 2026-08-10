import { Newspaper, Calendar, Shield, ArrowRight } from 'lucide-react';
import { pffNewsArticles, pffFederationInfo } from '../data';

export default function NewsEvents() {
  return (
    <section id="news" className="py-16 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-2">
              <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
              Official Federation Bulletins
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
              PFF News & Competitions
            </h2>

            <p className="text-slate-400 text-xs font-mono mt-1">
              Official press releases, tournament announcements, and grassroots development updates.
            </p>
          </div>
        </div>

        {/* NEWS ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pffNewsArticles.map((article) => (
            <div
              key={article.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl overflow-hidden shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-md">
                    {article.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{article.date} • By {article.author}</span>
                  </div>

                  <h3 className="font-bold font-display text-base uppercase text-white leading-snug group-hover:text-emerald-400 transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-3 font-sans">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex justify-between items-center text-xs font-mono text-emerald-400 font-bold">
                <span>Read Full Directive</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* FEDERATION INFO BANNER */}
        <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
                Governance & Affiliation
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-white mt-1">
                {pffFederationInfo.name}
              </h3>
              <p className="text-slate-300 text-sm mt-3 font-sans max-w-2xl">
                The Pakistan Football Federation is the official governing body for association football, futsal, and beach soccer in Pakistan. Formed in 1947, PFF is affiliated with FIFA, the Asian Football Confederation (AFC), and the South Asian Football Federation (SAFF).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs font-mono text-slate-300">
                <div>
                  <p className="text-slate-500 uppercase text-[10px]">Headquarters</p>
                  <p className="font-bold text-white mt-0.5">Lahore, Pakistan</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase text-[10px]">Affiliations</p>
                  <p className="font-bold text-emerald-400 mt-0.5">FIFA • AFC • SAFF</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase text-[10px]">Official Motto</p>
                  <p className="font-bold text-amber-400 mt-0.5">Unity & Excellence</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs font-mono space-y-3">
              <h4 className="text-white font-extrabold font-display uppercase border-b border-slate-800 pb-2">
                Federation Contact
              </h4>
              <p><span className="text-slate-500">Phone:</span> {pffFederationInfo.contact.phone}</p>
              <p><span className="text-slate-500">Email:</span> {pffFederationInfo.contact.email}</p>
              <p><span className="text-slate-500">Address:</span> {pffFederationInfo.contact.address}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
