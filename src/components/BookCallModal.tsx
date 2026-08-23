import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Send, PhoneCall } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'Growth',
    preferredTime: '8:00 PM - 12:00 AM BST',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0B1120] border border-indigo-500/30 rounded-3xl overflow-hidden shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-900/40 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#5B61FE] text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Book a Discovery Call</h3>
              <p className="text-[11px] text-indigo-200">30-min strategy & workflow alignment</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Discovery Call Requested!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. A Webants strategy coordinator will confirm your session time via <span className="text-[#5B61FE]">{formData.email}</span> shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="px-6 py-2.5 rounded-full bg-[#5B61FE] hover:bg-[#4F46E5] font-bold text-white text-xs shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Lee"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#5B61FE]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#5B61FE]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="NorthPeak Moving"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#5B61FE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Area of Interest</label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-800 text-white text-xs focus:outline-none focus:border-[#5B61FE]"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Window</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-slate-800 text-white text-xs focus:outline-none focus:border-[#5B61FE]"
                  >
                    <option value="8:00 PM - 12:00 AM BST">8:00 PM – 12:00 AM BST (US Morning)</option>
                    <option value="12:00 AM - 4:00 AM BST">12:00 AM – 4:00 AM BST (US Afternoon)</option>
                    <option value="Flexible">Flexible Schedule</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Main Challenge or Objective</label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you're looking to achieve..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#5B61FE]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#5B61FE] hover:bg-[#4F46E5] font-bold text-white text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-[background-color,transform] cursor-pointer hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Confirm Call Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
