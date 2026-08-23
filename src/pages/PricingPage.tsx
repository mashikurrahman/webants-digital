import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, HelpCircle, ShieldCheck, CreditCard, Briefcase, ExternalLink } from 'lucide-react';
import { siteContent } from '../data/siteContent';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onOpenBookCall: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate, onOpenBookCall }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Define WebAnts plans mirroring the exact visual structure from the image
  const plans = [
    {
      id: 'base-sub',
      title: 'Base',
      description: 'For growing brands looking for reliable, high-quality creative assets & support.',
      monthlyPrice: 1200,
      yearlyPrice: 960, // 20% discount equivalent
      features: [
        'Dedicated designer allocation',
        'Unlimited creative requests',
        'Social banners & ad designs',
        '48-hour typical turnarounds',
        'No lock-in contracts'
      ],
      buttonText: 'Downgrade',
      isPopular: false
    },
    {
      id: 'pro-sub',
      title: 'Pro',
      description: 'For businesses looking to launch fast, rank high, and optimize paid acquisition channels.',
      monthlyPrice: 2500,
      yearlyPrice: 2000, // 20% discount equivalent
      features: [
        'Dedicated growth manager',
        'Google & Meta Ads systems',
        'Technical & local search SEO',
        'High-converting landing pages',
        'Advanced conversion attribution'
      ],
      buttonText: 'Upgrade',
      isPopular: true
    },
    {
      id: 'enterprise-sub',
      title: 'Enterprise',
      description: 'For fast-growing operations requiring a dedicated, multi-department squad.',
      monthlyPrice: 4500,
      yearlyPrice: 3600, // 20% discount equivalent
      features: [
        'Full multi-department squad',
        'Custom CRM & API automation',
        'Direct Slack workspace channels',
        'Weekly executive syncs',
        'Priority 2-hour response SLA'
      ],
      buttonText: 'Upgrade',
      isPopular: false
    }
  ];

  return (
    <div className="pt-16 pb-20 bg-[#F8F9FC] text-[#080A14] space-y-12">
      
      {/* Header & Subtitle matching the design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0E1225] tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="text-slate-500 font-medium text-sm sm:text-base">
          No contracts. No surprise fees.
        </p>

        {/* MONTHLY / YEARLY Toggle pill container */}
        <div className="flex justify-center pt-2">
          <div className="inline-flex bg-white p-1 rounded-full border border-slate-200/80 shadow-xs relative">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-[background-color,color,box-shadow] cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#5B61FE] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-[background-color,color,box-shadow] cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-[#5B61FE] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              YEARLY
            </button>
          </div>
        </div>
      </div>

      {/* Subscriptions 3-Card Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <div 
                key={plan.id}
                className={`relative rounded-[32px] p-8 flex flex-col justify-between transition-[background-color,color,border-color,box-shadow,transform] duration-300 ${
                  plan.isPopular 
                    ? 'bg-[#5B61FE] text-white shadow-[0_25px_60px_rgba(91,97,254,0.35)] md:-translate-y-4 z-10 border border-[#5B61FE]' 
                    : 'bg-white text-slate-800 border border-slate-200/60 shadow-[0_15px_30px_rgba(0,0,0,0.02)] z-0 hover:shadow-md'
                }`}
              >
                {/* Most popular tag */}
                {plan.isPopular && (
                  <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase bg-white/20 text-white">
                    MOST POPULAR
                  </span>
                )}

                <div className="space-y-6">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline font-extrabold">
                      <span className="text-4xl">${price}</span>
                      <span className={`text-xs ml-1 font-semibold ${plan.isPopular ? 'text-white/80' : 'text-slate-400'}`}>
                        /month
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{plan.title}</h3>
                    <p className={`text-xs leading-relaxed ${plan.isPopular ? 'text-white/80' : 'text-slate-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <hr className={`border-t ${plan.isPopular ? 'border-white/20' : 'border-slate-100'}`} />

                  {/* Features List */}
                  <ul className="space-y-3.5 text-xs font-semibold">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        {plan.isPopular ? (
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-[#5B61FE] stroke-[2.5]" />
                          </div>
                        )}
                        <span className={plan.isPopular ? 'text-white/95' : 'text-slate-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-8">
                  {plan.isPopular ? (
                    <button
                      onClick={() => onNavigate('free-trial')}
                      className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-white/95 text-[#5B61FE] font-bold text-xs shadow-md transition-[background-color,transform] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {plan.buttonText}
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('free-trial')}
                      className="w-full py-3.5 px-4 rounded-2xl bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#5B61FE] font-bold text-xs transition-[background-color,transform] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {plan.buttonText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Rates & Hourly */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Fixed Rates */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-blue-100 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#172033]">Fixed Rate Projects</h2>
            <p className="text-xs text-[#637083]">Defined scope, clear timelines, and fixed deliverables.</p>
          </div>

          <div className="divide-y divide-gray-100">
            {p.fixedRates.map((fr, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-900 block">{fr.service}</span>
                  <span className="text-gray-500">{fr.timeline}</span>
                </div>
                <span className="font-black text-[#1769E0] text-sm">{fr.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly & Enterprise */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-blue-100 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-gray-900">Hourly Support</h3>
            <div className="text-2xl font-black text-[#1769E0]">{p.hourlyRate}</div>
            <p className="text-xs text-[#637083] leading-relaxed">{p.hourlyDesc}</p>
            <button onClick={onOpenBookCall} className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 font-bold text-xs cursor-pointer">
              Book Ad-hoc Support
            </button>
          </div>

          <div className="bg-[#071B33] text-white rounded-3xl p-6 border border-blue-900/50 shadow-xl space-y-3">
            <h3 className="text-base font-bold">Enterprise Solutions</h3>
            <div className="text-2xl font-black text-[#3B8CFF]">{p.enterpriseQuote}</div>
            <p className="text-xs text-gray-300 leading-relaxed">{p.enterpriseDesc}</p>
            <button onClick={onOpenBookCall} className="w-full py-2.5 rounded-xl bg-[#1769E0] text-white font-bold text-xs hover:bg-blue-600 cursor-pointer">
              Discuss Enterprise Scope
            </button>
          </div>
        </div>

      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#172033]">Engagement Model Comparison</h2>
        </div>

        <div className="bg-white rounded-3xl border border-blue-100 shadow-sm overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#071B33] text-white border-b border-blue-900">
                  <th className="p-4 font-bold">Feature / Model</th>
                  <th className="p-4 font-bold">Subscription</th>
                  <th className="p-4 font-bold">Fixed Project</th>
                  <th className="p-4 font-bold">Hourly Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-4 font-bold text-gray-900">Dedicated Lead & Squad</td>
                  <td className="p-4 text-green-600 font-semibold">Yes (Included)</td>
                  <td className="p-4 text-gray-600">Project Lead Only</td>
                  <td className="p-4 text-gray-600">On-demand Engineer</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-900">7-Day Free Trial Available</td>
                  <td className="p-4 text-green-600 font-semibold">Yes (Eligible)</td>
                  <td className="p-4 text-gray-400">No</td>
                  <td className="p-4 text-gray-400">No</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-900">Slack Communication Channel</td>
                  <td className="p-4 text-green-600 font-semibold">Direct Dedicated Channel</td>
                  <td className="p-4 text-gray-600">Email & Milestone Sync</td>
                  <td className="p-4 text-gray-600">Ticket Portal</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-900">Turnaround Speed</td>
                  <td className="p-4 text-green-600 font-semibold">24-48 Hours</td>
                  <td className="p-4 text-gray-600">Milestone Based</td>
                  <td className="p-4 text-gray-600">Queue Dependent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Methods & Upwork Contracts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F05AA6] bg-[#FCEAF4] px-3.5 py-1 rounded-full border border-pink-200">
            Flexible Payment & Contracting
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
            Global Payment Gateways & Upwork Contracts
          </h2>
          <p className="text-xs sm:text-sm text-[#637083] max-w-2xl mx-auto">
            Pay seamlessly using major international card networks and digital wallets, or place contracts through Upwork with full escrow protection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Direct Payment Methods */}
          <div className="bg-white rounded-3xl p-7 border border-blue-100 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EAF3FF] text-[#1769E0] flex items-center justify-center font-bold shadow-inner">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#172033]">Accepted Payment Methods</h3>
                  <p className="text-xs text-gray-500">Secure 256-bit encrypted checkout & automated billing</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                We support all major payment providers, digital wallets, and credit cards worldwide with automated invoicing.
              </p>

              {/* Payment Provider Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#635BFF]" />
                  <span>Stripe</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#003087]" />
                  <span>PayPal</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                  <span>Google Pay</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                  <span>Apple Pay</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A1F71]" />
                  <span>Visa</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
                  <span>Mastercard</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006FCF]" />
                  <span>American Express</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-bold text-gray-800 hover:border-blue-300 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Bank Wire / ACH</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant tax-compliant receipts and invoice PDFs generated for every transaction.</span>
            </div>
          </div>

          {/* Card 2: Upwork Contracts */}
          <div className="bg-[#071B33] text-white rounded-3xl p-7 border border-blue-900/60 shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F05AA6]/20 text-[#F05AA6] border border-[#F05AA6]/30 flex items-center justify-center font-bold shadow-inner">
                    <Briefcase className="w-5 h-5 text-[#F05AA6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Upwork Contracts</h3>
                    <p className="text-xs text-blue-200">Official marketplace & direct contract support</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F05AA6] bg-[#FCEAF4]/20 border border-[#F05AA6]/30 px-2.5 py-1 rounded-full">
                  Upwork Verified
                </span>
              </div>

              <p className="text-xs text-blue-100 leading-relaxed">
                Prefer placing your project through Upwork? Clients can seamlessly create a contract using Upwork for full escrow security, milestone tracking, and payment protection.
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#F05AA6]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Upwork Direct Contracts</span>
                  </div>
                  <p className="text-[11px] text-gray-300 pl-6 leading-relaxed">
                    Initiate or receive an escrow contract directly via Upwork. No full Upwork client profile required, backed by Upwork's client payment protection.
                  </p>
                </div>

                <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-pink-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Upwork System Contracts</span>
                  </div>
                  <p className="text-[11px] text-gray-300 pl-6 leading-relaxed">
                    Hire our team directly through the standard Upwork marketplace platform for fixed-price project milestones or hourly tracked work.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={onOpenBookCall}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F05AA6] via-[#3B8CFF] to-[#1769E0] hover:opacity-95 font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-[opacity,transform] hover:scale-[1.01]"
              >
                <span>Hire Us or Request Upwork Contract Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
