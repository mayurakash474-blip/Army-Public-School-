import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MailCheck, Trash2, Eye, ShieldCheck } from 'lucide-react';
import { schoolContact } from '../data';
import { ContactSubmission } from '../types';
import { saveAdmissionSubmission, fetchAdmissionSubmissions, deleteAdmissionSubmission } from '../lib/firebase';

interface ContactProps {
  inquirySubject: string;
  onClearInquirySubject: () => void;
}

export default function Contact({ inquirySubject, onClearInquirySubject }: ContactProps) {
  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showAdminInbox, setShowAdminInbox] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  // Pre-fill subject if redirected from Academics program selection
  useEffect(() => {
    if (inquirySubject) {
      setSubject(`Inquiry regarding ${inquirySubject} program`);
      
      // Scroll smoothly to contact form
      const element = document.getElementById('contact');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      onClearInquirySubject(); // Clear once loaded
    }
  }, [inquirySubject]);

  // Load submissions from Firebase Firestore
  const loadSubmissions = async () => {
    try {
      const subs = await fetchAdmissionSubmissions();
      setSubmissions(subs);
    } catch (err) {
      console.error("Error loading submissions from Firebase:", err);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    try {
      const newSubmissionData = {
        name,
        email,
        phone: phone || 'N/A',
        subject: subject || 'General Inquiry',
        message,
        submittedAt: new Date().toLocaleString()
      };

      const savedDoc = await saveAdmissionSubmission(newSubmissionData);

      setSubmissions(prev => [savedDoc, ...prev]);

      setIsSubmitting(false);
      setIsSuccess(true);

      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');

      // Auto clear success banner after 5s
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Error saving submission to Firebase:", err);
      setIsSubmitting(false);
    }
  };

  // Delete submission
  const handleDeleteSubmission = async (id: string) => {
    try {
      await deleteAdmissionSubmission(id);
      setSubmissions(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting submission:", err);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-navy-50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-armygreen-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-navy-600 text-xs font-mono font-bold tracking-widest uppercase bg-navy-50 px-3.5 py-1.5 rounded-full border border-navy-100/50">
            Get In Touch
          </span>
          <h3 className="mt-4 text-3xl sm:text-5xl font-display font-black text-navy-950 tracking-tighter uppercase italic leading-[1.1]">
            Contact School Administration
          </h3>
          <div className="w-16 h-1 bg-schoolgold-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-slate-500 text-xs sm:text-sm">
            For academic admissions, documents collection, and employment queries, please write to us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: School details cards & Map */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex gap-3.5 items-start">
                <div className="p-2 bg-navy-50 text-navy-600 rounded-xl border border-navy-100">
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-navy-950 text-xs uppercase tracking-wider">Campus Location</h5>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1">{schoolContact.address}</p>
                </div>
              </div>

              {/* Phones */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex gap-3.5 items-start">
                <div className="p-2 bg-armygreen-50 text-armygreen-600 rounded-xl border border-armygreen-100">
                  <Phone className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-navy-950 text-xs uppercase tracking-wider">Phone Lines</h5>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1 select-all">{schoolContact.phone}</p>
                  <p className="text-slate-500 text-xs leading-relaxed select-all">{schoolContact.altPhone}</p>
                </div>
              </div>

              {/* Emails */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex gap-3.5 items-start">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                  <Mail className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-navy-950 text-xs uppercase tracking-wider">Email Addresses</h5>
                  <p className="text-slate-500 text-[11px] font-medium leading-relaxed mt-1 select-all hover:text-navy-950 truncate">
                    {schoolContact.email}
                  </p>
                  <p className="text-slate-500 text-[11px] font-medium leading-relaxed select-all hover:text-navy-950 truncate">
                    {schoolContact.admissionsEmail}
                  </p>
                </div>
              </div>

              {/* Office hours */}
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex gap-3.5 items-start">
                <div className="p-2 bg-schoolgold-50 text-schoolgold-600 rounded-xl border border-schoolgold-100">
                  <Clock className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-navy-950 text-xs uppercase tracking-wider">Working Hours</h5>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1">{schoolContact.officeHours.split('|')[0]}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{schoolContact.officeHours.split('|')[1]}</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-slate-100 rounded-2xl overflow-hidden aspect-video border border-slate-150 shadow-sm relative group">
              <iframe
                title="Army Public School Aliabad Hunza Map Location"
                src={schoolContact.mapEmbedUrl}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Absolute Badge */}
              <div className="absolute top-3 left-3 bg-navy-950 text-white px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-widest uppercase flex items-center gap-1 shadow-md">
                <MapPin className="w-3 h-3 text-schoolgold-400" />
                Aliabad Hunza GB
              </div>
            </div>

          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h4 className="font-display font-bold text-navy-950 text-lg mb-6 flex items-center gap-2">
                <MailCheck className="w-5 h-5 text-armygreen-600" /> Online Admission & General Inquiry
              </h4>

              {/* Success Alert Banner */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-emerald-50 border border-emerald-150 rounded-xl p-4 flex gap-3 items-start text-emerald-800 text-xs sm:text-sm font-medium mb-6"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Form Submitted Successfully!</p>
                      <p className="text-emerald-700 text-xs mt-1 leading-normal">
                        Your details are stored in your local browser state. Scroll down to toggle the "Admin Inbox Portal" to inspect the payload!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-xs font-mono uppercase font-bold text-slate-500">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="e.g. Muhammad Jamil"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-slate-200 focus:border-armygreen-600 focus:ring-1 focus:ring-armygreen-600 outline-none rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-xs font-mono uppercase font-bold text-slate-500">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-slate-200 focus:border-armygreen-600 focus:ring-1 focus:ring-armygreen-600 outline-none rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-phone" className="text-xs font-mono uppercase font-bold text-slate-500">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="03xx-xxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-slate-200 focus:border-armygreen-600 focus:ring-1 focus:ring-armygreen-600 outline-none rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-subject" className="text-xs font-mono uppercase font-bold text-slate-500">
                      Subject
                    </label>
                    <input
                      id="form-subject"
                      type="text"
                      placeholder="Inquiry Topic"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="border border-slate-200 focus:border-armygreen-600 focus:ring-1 focus:ring-armygreen-600 outline-none rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-msg" className="text-xs font-mono uppercase font-bold text-slate-500">
                    Your Detailed Inquiry Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="form-msg"
                    rows={4}
                    required
                    placeholder="Provide detailed description of student age, program, or any general school inquiries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-slate-200 focus:border-armygreen-600 focus:ring-1 focus:ring-armygreen-600 outline-none rounded-xl px-4 py-3 text-sm font-medium transition-colors resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 bg-armygreen-600 hover:bg-armygreen-500 text-white font-display font-semibold uppercase tracking-wider text-xs py-4 rounded-xl shadow-md border border-armygreen-500 hover:border-armygreen-400 disabled:opacity-75 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Payload...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* MOCK ADMISSIONS SUBMISSIONS DB PORTAL FOR INTERACTIVITY INSPECTION */}
        <div className="mt-16 border-t border-slate-100 pt-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="font-display font-bold text-navy-950 text-sm">
                Interactive Local Sandbox Inspector
              </h5>
              <p className="text-slate-500 text-xs mt-0.5">
                Verify database integration by viewing active contact form submissions stored inside your current session.
              </p>
            </div>

            <button
              onClick={() => setShowAdminInbox(!showAdminInbox)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              {showAdminInbox ? 'Hide Admin Inbox' : `View Admin Inbox (${submissions.length})`}
            </button>
          </div>

          <AnimatePresence>
            {showAdminInbox && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 bg-slate-950 rounded-2xl border border-slate-800 p-5 font-mono text-xs text-slate-200">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
                    <span className="text-schoolgold-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-schoolgold-400" /> Admin Secured Panel
                    </span>
                    <span className="text-slate-500 text-[10px]">LOCALSTORAGE SUBS</span>
                  </div>

                  {submissions.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      No active submissions found. Submit the form above to witness reactive rendering inside this panel in real-time.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-2">
                      {submissions.map((sub) => (
                        <div key={sub.id} className="bg-slate-900 border border-slate-800/60 p-4 rounded-xl flex justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                              <span className="text-schoolgold-300 font-bold">{sub.submittedAt}</span>
                              <span>•</span>
                              <span>ID: {sub.id}</span>
                            </div>
                            <p className="text-white font-bold font-sans">
                              {sub.name} <span className="text-slate-500 font-normal">({sub.email} | {sub.phone})</span>
                            </p>
                            <p className="text-armygreen-400 font-bold mt-1.5 font-sans text-xs">
                              Subject: {sub.subject}
                            </p>
                            <p className="text-slate-300 mt-2 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                              {sub.message}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer self-start"
                            title="Delete Submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
