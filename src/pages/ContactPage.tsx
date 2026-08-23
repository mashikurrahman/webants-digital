import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Globe2, Send, CheckCircle2 } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    country: '',
    industry: 'Moving',
    service: 'Growth',
    pricingModel: 'Subscription',
    budget: '$2,500 - $5,000 / mo',
    timeline: 'Immediate (Next 1-2 weeks)',
    challenge: ''
  });

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
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF3FF] px-3.5 py-1 rounded-full">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172033]">
          Tell us what your business needs next.
        </h1>
        <p className="text-sm sm:text-base text-[#637083] max-w-2xl mx-auto leading-relaxed">
          Share your goals and challenges with our strategy team. We will review your inquiry and schedule a discovery alignment call.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info Side */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-[#071B33] text-white rounded-3xl p-8 border border-blue-900/60 shadow-xl space-y-6">
            <h2 className="text-xl font-bold">Contact Information</h2>
            
            <div className="space-y-4 text-xs text-gray-200">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#3B8CFF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block font-semibold">Email Us Directly</span>
                  <a href={`mailto:${siteContent.company.email}`} className="text-white font-bold hover:underline">
                    {siteContent.company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#3B8CFF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block font-semibold">HQ Location</span>
                  <span className="text-white font-bold">{siteContent.company.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-[#3B8CFF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block font-semibold">Client Coverage</span>
                  <span className="text-white font-bold">{siteContent.company.coverage}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-900/50 space-y-2 text-xs text-blue-200">
              <span className="font-bold uppercase text-[10px] text-gray-400 block">Working Hours</span>
              <p className="leading-relaxed">{siteContent.company.workHours}</p>
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-8"
        >
          <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#172033]">Project Inquiry Form</h2>

            {submitted ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-12 text-center space-y-4 bg-[#F7FAFF] p-8 rounded-2xl border border-blue-100"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Inquiry Submitted Successfully!</h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-gray-900">{formData.name}</span>. Our strategy lead will analyze <span className="font-bold text-[#1769E0]">{formData.company}</span>'s submission and reach out via <span className="font-bold text-[#1769E0]">{formData.email}</span> within 12 hours.
                </p>
                <div className="text-[11px] font-mono text-gray-400">// DEMO FORM SUBMISSION — REPLACE WITH LIVE API ROUTE</div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Lee"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jordan@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      placeholder="NorthPeak Moving"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Website</label>
                    <input
                      type="text"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Country *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United States"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    >
                      <option value="Moving">Moving Companies</option>
                      <option value="Home Services">Home Services</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Sports">Sports & Consumer</option>
                      <option value="Professional Services">Professional Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    >
                      <option value="Growth">Growth (SEO & Ads)</option>
                      <option value="Creative">Creative & Video</option>
                      <option value="Technology">Technology & Web</option>
                      <option value="AI & Automation">AI & CRM Automation</option>
                      <option value="Digital Operations">Digital Operations</option>
                      <option value="Full Integrated Partner">Full Integrated Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Pricing Model</label>
                    <select
                      value={formData.pricingModel}
                      onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    >
                      <option value="Subscription">Monthly Subscription</option>
                      <option value="Fixed Project">Fixed Scope Project</option>
                      <option value="Hourly">Hourly Support</option>
                      <option value="Enterprise">Enterprise Custom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    >
                      <option value="$1,200 - $2,500 / mo">$1,200 – $2,500 / mo</option>
                      <option value="$2,500 - $5,000 / mo">$2,500 – $5,000 / mo</option>
                      <option value="$5,000+ / mo">$5,000+ / mo</option>
                      <option value="Fixed Scope $2.5k - $10k">Fixed Scope $2.5k – $10k</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                    >
                      <option value="Immediate (Next 1-2 weeks)">Immediate (Next 1-2 weeks)</option>
                      <option value="Within 30 Days">Within 30 Days</option>
                      <option value="Planning for Next Quarter">Planning for Next Quarter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Main Challenge or Business Objective *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your current bottlenecks or what you want to accomplish..."
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#1769E0]"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1769E0] to-[#3B8CFF] font-bold text-white text-xs shadow-lg flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Discovery Inquiry</span>
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

      </div>

    </div>
  );
};
