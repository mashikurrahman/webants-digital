import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, XCircle, Send } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const FreeTrialPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    industry: 'Moving',
    taskDescription: ''
  });

  const ft = siteContent.freeTrial;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-[#F7FAFF] text-[#172033] space-y-16">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#F05AA6] bg-[#FCEAF4] px-3.5 py-1 rounded-full border border-pink-200">
          Zero-Risk Evaluation
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Try selected services free for seven days.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          Evaluate our team's communication, speed, and asset quality on a defined project scope before committing.
        </p>
      </motion.div>

      {/* Scope Breakdown (Eligible vs Excluded) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Eligible */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 border border-green-100 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900">Eligible Trial Scope</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-700">
            {ft.eligibleServices.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Excluded */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 border border-red-100 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 text-red-500">
            <XCircle className="w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900">Not Included in Trial</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-700">
            {ft.excludedServices.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>

      {/* Trial Application Form */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-3xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-[#071B33] text-white rounded-3xl p-8 border border-blue-900/60 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1769E0] to-[#F05AA6] text-white flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Apply for 7-Day Free Trial</h2>
            <p className="text-xs text-blue-200">No credit card required. Qualified service businesses only.</p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8 space-y-4 bg-blue-950/40 p-6 rounded-2xl border border-blue-900/40"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Application Received!</h3>
              <p className="text-xs text-gray-300">
                Thank you, <span className="text-white font-bold">{formData.name}</span>. A Webants coordinator will review <span className="text-[#3B8CFF]">{formData.company}</span>'s trial request and email you at <span className="text-[#3B8CFF]">{formData.email}</span> within 1 business day.
              </p>
              <div className="text-[11px] font-mono text-gray-400">
                // DEMO TRIAL APPLICATION — REPLACE WITH LIVE ROUTING
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Casey Bennett"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="casey@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Evernest Realty"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Company Website</label>
                  <input
                    type="text"
                    placeholder="https://evernest.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Specific Task Proposed for Trial Scope *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Design 3 paid social ad banners and audit our CRM lead capture flow."
                  value={formData.taskDescription}
                  onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1769E0] via-[#3B8CFF] to-[#F05AA6] font-bold text-white text-xs shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Trial Application</span>
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>

    </div>
  );
};
