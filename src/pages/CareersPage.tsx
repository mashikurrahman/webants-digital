import React from 'react';
import { motion } from 'motion/react';
import { Clock, Mail, CheckCircle2 } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface CareersPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const perks = [
    { title: 'Fully Remote', desc: 'Work from anywhere with a stable high-speed connection and quiet workstation.' },
    { title: 'Five Working Days', desc: 'Structured weekend breaks for optimal work-life balance.' },
    { title: 'International Clients', desc: 'Direct exposure to fast-growing US, European, and Australian brands.' },
    { title: 'Learning & Mastery', desc: 'Access to modern design tools, AI subscriptions, and technical courses.' },
    { title: 'Professional Environment', desc: 'Organized communication, clear task briefs, and respectful teamwork.' },
    { title: 'Performance Growth', desc: 'Quarterly reviews with performance-based salary increments.' }
  ];

  const benefitsList = [
    'Government holidays observance',
    'Casual leave allowance',
    'Sick leave allocation',
    'Full health & skill benefits after probation',
    'Eid bonus up to 50% of monthly salary for eligible employees'
  ];

  return (
    <div className="py-16 bg-[#F7FAFF] text-[#172033] space-y-16">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Join Our Global Remote Team
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Build meaningful digital work with Webants.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          We are looking for passionate designers, editors, marketers, and coordinators ready to deliver world-class digital work.
        </p>
      </motion.div>

      {/* Schedule & Working Hours Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#071B33] text-white border border-blue-900/60 rounded-3xl p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-[#3B8CFF] text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Working Hours & Shift Requirements</span>
            </div>
            <h2 className="text-2xl font-bold">Synchronized US & European Sync Hours</h2>
            <p className="text-xs text-gray-200 leading-relaxed">
              Many technical, creative, and growth roles require primary availability from <strong className="text-white bg-blue-600 px-2 py-0.5 rounded">8:00 PM to 4:00 AM Bangladesh time (BST)</strong> to ensure seamless real-time collaboration with international account leads.
            </p>
          </div>

          <div className="md:col-span-5 bg-white/5 p-6 rounded-2xl border border-blue-800/40 space-y-3">
            <h3 className="text-xs font-bold text-[#3B8CFF] uppercase">Key Employment Benefits</h3>
            <ul className="space-y-1.5 text-xs text-gray-200">
              {benefitsList.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3B8CFF] shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Cultural Perks Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-[#172033]">Why Work With Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((p, idx) => (
            <motion.div 
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-2"
            >
              <h3 className="text-base font-bold text-[#172033]">{p.title}</h3>
              <p className="text-xs text-[#637083] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-[#172033]">Open Positions</h2>
          <p className="text-xs text-[#637083]">Click any position to review responsibilities and submit your profile.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.jobs.map((job, idx) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              onClick={() => onNavigate('job-detail', job.id)}
              className="bg-white border border-blue-100 rounded-3xl p-6 hover:border-[#1769E0] transition-colors cursor-pointer space-y-4 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#1769E0] bg-[#EAF3FF] px-2.5 py-0.5 rounded uppercase">
                    {job.department}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#172033]">{job.title}</h3>
                <p className="text-xs text-[#637083] line-clamp-2">{job.overview}</p>
                <div className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#1769E0]" /> {job.hours}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#1769E0]">
                <span>View Job Details &rarr;</span>
                <span className="text-gray-400 font-normal">Salary: {job.salary}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Application Fallback Note */}
      <div className="max-w-3xl mx-auto text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EAF3FF] text-[#1769E0] flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Direct Portfolio Submission</h3>
          <p className="text-xs text-[#637083] max-w-lg mx-auto leading-relaxed">
            Don't see your specific role listed? Send your CV, resume and portfolio link directly to <a href={`mailto:${siteContent.company.email}`} className="font-bold text-[#1769E0] underline">{siteContent.company.email}</a>. Please use your target job title as the email subject line.
          </p>
        </motion.div>
      </div>

    </div>
  );
};
