import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin, DollarSign, CheckCircle2, Send } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface JobDetailPageProps {
  jobId: string;
  onNavigate: (page: string) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ jobId, onNavigate }) => {
  const job = siteContent.jobs.find(j => j.id === jobId) || siteContent.jobs[0];
  const [submitted, setSubmitted] = useState(false);
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    portfolio: '',
    coverNote: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-[#F7FAFF] text-[#172033] space-y-12">
      
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6"
      >
        <button
          onClick={() => onNavigate('careers')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#1769E0] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Open Careers</span>
        </button>
      </motion.div>

      {/* Main Job Overview Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm space-y-6"
        >
          
          <div className="space-y-3 pb-6 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3 py-1 rounded-full">
                {job.department} Department
              </span>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {job.type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#172033]">
              {job.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1769E0]" />
                <span>Shift: {job.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1769E0]" />
                <span>Location: {job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#1769E0]" />
                <span>Salary: {job.salary}</span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#172033]">Role Overview</h2>
            <p className="text-xs sm:text-sm text-[#637083] leading-relaxed">
              {job.overview}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#172033]">Core Responsibilities</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {job.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[#172033]">Requirements & Qualifications</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1769E0] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

        {/* Quick Application Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#071B33] text-white rounded-3xl p-8 border border-blue-900/60 shadow-xl space-y-6"
        >
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">Apply for {job.title}</h2>
            <p className="text-xs text-blue-200">Submit your profile directly to our hiring team.</p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6 space-y-3 bg-blue-950/50 p-6 rounded-2xl border border-blue-900/40"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">Application Received!</h3>
              <p className="text-xs text-gray-300">
                Thank you, <span className="text-white font-bold">{applicantData.name}</span>. Our HR coordinator will review your profile and reach out via <span className="text-[#3B8CFF]">{applicantData.email}</span>.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={applicantData.name}
                    onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={applicantData.email}
                    onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Portfolio / CV Link *</label>
                <input
                  type="text"
                  required
                  placeholder="https://behance.net/yourprofile or Google Drive link"
                  value={applicantData.portfolio}
                  onChange={(e) => setApplicantData({ ...applicantData, portfolio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Brief Cover Note</label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about your experience and availability for BST night shift hours..."
                  value={applicantData.coverNote}
                  onChange={(e) => setApplicantData({ ...applicantData, coverNote: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-blue-900/50 text-white text-xs focus:outline-none focus:border-[#3B8CFF]"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1769E0] to-[#3B8CFF] font-bold text-white text-xs flex items-center justify-center gap-2 cursor-pointer hover:opacity-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Job Application</span>
              </motion.button>
            </form>
          )}

          <div className="text-center pt-2 text-xs text-gray-400">
            Or email your CV directly to <a href={`mailto:${siteContent.company.email}?subject=${encodeURIComponent(job.title)}`} className="text-[#3B8CFF] underline font-bold">{siteContent.company.email}</a> with subject "{job.title}".
          </div>
        </motion.div>

      </div>

    </div>
  );
};
