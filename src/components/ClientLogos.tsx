import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ClientBrand {
  id: string;
  logo: React.ReactNode;
  name: string;
}

const clientBrandsList: ClientBrand[] = [
  {
    id: 'slack',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.522 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.78a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.78 10.134a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.522 2.522v5.043a2.528 2.528 0 0 1-2.522 2.52H15.176z" />
      </svg>
    ),
    name: 'Slack'
  },
  {
    id: 'shopify',
    logo: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z" />
      </svg>
    ),
    name: 'Shopify'
  },
  {
    id: 'webflow',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.5 4.5l-3.3 12.3c-.2.7-.8 1.2-1.5 1.2h-3.6c-.6 0-1.2-.4-1.4-.9L9.5 8.9l-3.2 8.3c-.2.5-.8.9-1.4.9H1.5L4.8 4.5c.2-.7.8-1.2 1.5-1.2h3.6c.6 0 1.2.4 1.4.9l3.2 8.3 3.2-8.3c.2-.5.8-.9 1.4-.9h3.6c.7 0 1.3.5 1.4 1.2z" />
      </svg>
    ),
    name: 'Webflow'
  },
  {
    id: 'hubspot',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.8 8.1c-.6 0-1.1-.3-1.4-.8l-4.1 2.2c0 .2.1.5.1.7 0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.9 0 1.7.3 2.3.8l4.1-2.2c-.1-.3-.2-.6-.2-.9 0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3zm-9.4 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
      </svg>
    ),
    name: 'HubSpot'
  },
  {
    id: 'zapier',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-.8 0-1.5.7-1.5 1.5v7.6L4.8 3.4c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l5.7 5.7H1.5C.7 11.2 0 11.9 0 12.7s.7 1.5 1.5 1.5h6.9l-5.7 5.7c-.6.6-.6 1.5 0 2.1s1.5.6 2.1 0l5.7-5.7v6.9c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-7.6l5.7 5.7c.6.6 1.5.6 2.1 0s.6-1.5 0-2.1l-5.7-5.7h6.9c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-6.9l5.7-5.7c.6-.6.6-1.5 0-2.1s-1.5-.6-2.1 0l-5.7 5.7V1.5C13.5.7 12.8 0 12 0z" />
      </svg>
    ),
    name: 'Zapier'
  },
  {
    id: 'klaviyo',
    logo: (
      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    name: 'Klaviyo'
  }
];

export const ClientLogos: React.FC = () => {
  return (
    <section className="py-10 bg-white border-y border-slate-100 text-slate-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        
        {/* Clean Editorial Trust Label */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Trusted by 50+ Ambitious Brands & Operations
        </p>

        <div className="relative w-full overflow-hidden py-1">
          {/* Left & Right fade masks */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-12 w-max items-center">
            {[...clientBrandsList, ...clientBrandsList, ...clientBrandsList].map((client, idx) => (
              <div 
                key={`${client.id}-${idx}`}
                className="flex items-center gap-2 px-6 py-2.5 text-slate-400 hover:text-slate-800 transition-colors group cursor-default shrink-0"
              >
                <div className="text-slate-300 group-hover:text-[#5B61FE] transition-colors">
                  {client.logo}
                </div>
                <span className="text-sm font-extrabold tracking-tight text-slate-500 group-hover:text-slate-900 transition-colors font-sans">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Verified Partner Credentials */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-1 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#5B61FE]" /> Google Verified Partner
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#5B61FE]" /> Upwork Top Rated Plus (100% JSS)
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
            <ShieldCheck className="w-4 h-4 text-[#5B61FE]" /> Meta Certified Media Buyers
          </span>
        </div>

      </div>
    </section>
  );
};
