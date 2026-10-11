import React, { useState } from 'react';
import { 
  ArrowRight, 
  Code2, 
  Smartphone, 
  Database, 
  Layers, 
  TrendingUp, 
  Search, 
  Share2, 
  PenTool, 
  MessageSquare, 
  Sparkles, 
  Palette, 
  BookOpen, 
  Film, 
  Radio, 
  CheckCircle2 
} from 'lucide-react';

interface WhatWeProvidePageProps {
  onOpenContact: () => void;
  onNavigateToWhoTrustUs: () => void;
}

interface ServiceDetail {
  id: number;
  title: string;
  category: 'Engineering & Tech' | 'Growth & Marketing' | 'Creative & Content' | 'Media & Production';
  icon: React.ReactNode;
  tagline: string;
  deliverables: string[];
}

export const WhatWeProvidePage: React.FC<WhatWeProvidePageProps> = ({ 
  onOpenContact, 
  onNavigateToWhoTrustUs 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredServiceId, setHoveredServiceId] = useState<number | null>(null);

  const services: ServiceDetail[] = [
    {
      id: 1,
      title: 'Web Development',
      category: 'Engineering & Tech',
      icon: <Code2 className="w-5 h-5 text-[#e38528]" />,
      tagline: 'High-speed, bespoke web platforms engineered with cutting-edge architectures.',
      deliverables: ['Custom Web Applications', 'React & Next.js Platforms', 'E-commerce & Headless CMS', 'Core Web Vitals Optimization']
    },
    {
      id: 2,
      title: 'Mobile App Development',
      category: 'Engineering & Tech',
      icon: <Smartphone className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Native and cross-platform mobile experiences that delight users and drive engagement.',
      deliverables: ['iOS & Android Apps', 'Cross-Platform React Native / Flutter', 'Smooth Micro-Interactions', 'App Store Deployment & CI/CD']
    },
    {
      id: 3,
      title: 'Custom CRM',
      category: 'Engineering & Tech',
      icon: <Database className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Bespoke relationship management pipelines tailored to your unique sales cycle.',
      deliverables: ['Pipeline Automation', 'Customer Data Dashboards', 'Third-Party API Integrations', 'Role-Based Access Control']
    },
    {
      id: 4,
      title: "ERP's",
      category: 'Engineering & Tech',
      icon: <Layers className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Scalable Enterprise Resource Planning systems unifying business operations.',
      deliverables: ['Inventory & Supply Management', 'Finance & Invoicing Engines', 'Workflow Automation', 'Operational BI & Analytics']
    },
    {
      id: 5,
      title: 'Digital Marketing',
      category: 'Growth & Marketing',
      icon: <TrendingUp className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Holistic multi-channel digital strategies designed to capture market dominance.',
      deliverables: ['Full-Funnel Growth Frameworks', 'Omnichannel Strategy', 'Conversion Rate Optimization (CRO)', 'Cohort Retention Modeling']
    },
    {
      id: 6,
      title: 'SEO',
      category: 'Growth & Marketing',
      icon: <Search className="w-5 h-5 text-[#e38528]" />,
      tagline: 'High-intent search engine domination building sustainable, organic authority.',
      deliverables: ['Technical SEO Audits', 'Keyword Landscape Strategy', 'On-Page & Off-Page Architecture', 'Schema Markup & Rich Snippets']
    },
    {
      id: 7,
      title: 'Meta Ads',
      category: 'Growth & Marketing',
      icon: <Share2 className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Hyper-targeted Instagram & Facebook ad campaigns driving predictable ROAS.',
      deliverables: ['Creative Testing Matrices', 'Dynamic Product Ads', 'Lookalike & Retargeting Architecture', 'Deep Analytics Tracking']
    },
    {
      id: 8,
      title: 'Content Creation',
      category: 'Creative & Content',
      icon: <PenTool className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Compelling brand narratives and visual assets that captivate modern audiences.',
      deliverables: ['Brand Storytelling', 'Editorial Collateral', 'High-Converting Copywriting', 'Visual Asset Libraries']
    },
    {
      id: 9,
      title: 'Social Media Management',
      category: 'Growth & Marketing',
      icon: <MessageSquare className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Curating an authentic brand presence across platforms with day-to-day excellence.',
      deliverables: ['Content Calendar Strategy', 'Active Community Engagement', 'Platform-Specific Visual Feeds', 'Monthly Performance Reporting']
    },
    {
      id: 10,
      title: 'Social Media Marketing',
      category: 'Growth & Marketing',
      icon: <TrendingUp className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Viral campaign architectures and targeted outreach that turn followers into advocates.',
      deliverables: ['Campaign Narrative Concepts', 'Influencer & Creator Alliances', 'Trending Format Activations', 'Audience Growth Engineering']
    },
    {
      id: 11,
      title: 'AI Video Generation',
      category: 'Media & Production',
      icon: <Sparkles className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Next-generation synthetic and AI-assisted video workflows creating cinematic magic at scale.',
      deliverables: ['Generative Video Synthesis', 'Dynamic Ad Variations', 'AI Script-to-Screen Pipelines', 'Rapid Iteration Video Assets']
    },
    {
      id: 12,
      title: 'Graphic Designing',
      category: 'Creative & Content',
      icon: <Palette className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Meticulous visual craft across identity, typography, spatial, and digital touchpoints.',
      deliverables: ['Visual Identity Systems', 'Packaging & Box Architecture', 'Marketing & Sales Collateral', 'Bespoke Iconography & Badges']
    },
    {
      id: 13,
      title: 'Content Marketing',
      category: 'Creative & Content',
      icon: <BookOpen className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Authority-building articles, research papers, and lead magnets that drive qualified inbound.',
      deliverables: ['Thought Leadership Articles', 'Whitepapers & Industry Reports', 'SEO-Optimized Pillar Content', 'Email Newsletters & Drips']
    },
    {
      id: 14,
      title: 'Video Editing',
      category: 'Media & Production',
      icon: <Film className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Cinematic pacing, VFX, motion typography, and sound design that holds total viewer attention.',
      deliverables: ['Short-Form Reels & Shorts', 'Brand Commercial Films', 'Motion Graphics & 3D Title Cards', 'Master Sound Mixing & Grading']
    },
    {
      id: 15,
      title: 'Public Relations',
      category: 'Media & Production',
      icon: <Radio className="w-5 h-5 text-[#e38528]" />,
      tagline: 'Strategic press outreach and executive positioning that cements industry prestige.',
      deliverables: ['National & Global Media Placements', 'Press Releases & Editorial Pitches', 'Crisis Communications Architecture', 'Executive Brand Building']
    }
  ];

  const categories = ['All', 'Engineering & Tech', 'Growth & Marketing', 'Creative & Content', 'Media & Production'];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full pt-[120px] pb-24 px-6 md:px-16 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="max-w-[1000px] mb-16">
        <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4 block">
          [ WHAT WE PROVIDE? ]
        </span>
        <h1 className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[0.98] font-extralight uppercase text-black tracking-tight mb-8">
          CREATIVE IDEAS. <br />
          <span className="font-normal">DIGITAL POSSIBILITIES.</span>
        </h1>
        <p className="text-[18px] md:text-[22px] font-light text-neutral-600 leading-relaxed max-w-[820px]">
          We combine cutting-edge software engineering, data-backed growth marketing, and award-winning creative craft across 15 specialized capabilities.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-neutral-200">
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mr-2">DISCIPLINE:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-[13px] tracking-wide uppercase transition-all duration-200 rounded-full cursor-pointer ${
              selectedCategory === cat
                ? 'bg-black text-white font-medium shadow-sm'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid (15 Services) */}
      <div 
        onMouseLeave={() => setHoveredServiceId(null)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
      >
        {filteredServices.map((service) => {
          const isHovered = hoveredServiceId === service.id;
          const isDimmed = hoveredServiceId !== null && !isHovered;

          return (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredServiceId(service.id)}
              className={`group p-8 border bg-white flex flex-col justify-between transition-all duration-300 ease-out cursor-default transform ${
                isHovered
                  ? 'border-black opacity-100 scale-[1.02] -translate-y-1.5 shadow-2xl shadow-black/10 ring-1 ring-black/5'
                  : isDimmed
                  ? 'border-neutral-200 opacity-20'
                  : 'border-neutral-200 opacity-100 hover:border-black hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[12px] font-mono tracking-widest text-neutral-400">
                    {String(service.id).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-neutral-100 rounded text-neutral-600">
                    {service.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-neutral-50 border border-neutral-200 rounded group-hover:border-[#e38528] group-hover:bg-orange-50/50 group-hover:scale-105 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-[20px] font-medium tracking-tight text-black uppercase">
                    {service.title}
                  </h3>
                </div>

                <p className="text-[14px] text-neutral-600 font-light leading-relaxed mb-6">
                  {service.tagline}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 pt-4 border-t border-neutral-100">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                    Scope of Delivery
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[13px] text-neutral-700 font-light">
                      <CheckCircle2 size={14} className="text-[#e38528] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={onOpenContact}
                  className="text-[12px] font-medium uppercase tracking-wider text-black group-hover:text-[#e38528] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Request Scope</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-Service Integration Narrative */}
      <div className="p-10 md:p-14 bg-neutral-50 border border-neutral-200 mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] mb-2 block">
            HOW WE OPERATE
          </span>
          <h2 className="text-[32px] md:text-[42px] font-light uppercase tracking-tight text-black leading-tight">
            INTEGRATED EXECUTION, <br />
            ZERO HANDOFF LOSS.
          </h2>
        </div>
        <div className="md:col-span-7 flex flex-col gap-4 text-[15px] font-light text-neutral-600 leading-relaxed">
          <p>
            When web development, CRM automation, performance ads, and brand design are handled by disjointed contractors, the brand message shatters. At ANSH&amp;CO, our technical engineers collaborate directly with creative directors and growth marketers under one unified vision.
          </p>
          <p>
            From line of code to video render and billboard placement, your brand maintains singular aesthetic authority and measurable commercial velocity.
          </p>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="p-10 md:p-14 bg-black text-white rounded-none flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] mb-2 block">
            PROVEN TRACK RECORD
          </span>
          <h3 className="text-[30px] md:text-[40px] font-light uppercase tracking-tight">
            See the Brands Who Trust Us
          </h3>
          <p className="text-[14px] text-neutral-400 font-light mt-1 max-w-[500px]">
            Explore our client partnerships, case studies, and enterprise impact across diverse sectors.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onNavigateToWhoTrustUs}
            className="px-6 py-3 rounded-full border border-white text-white text-[13px] font-light hover:bg-white hover:text-black transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Who Trust Us?</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full bg-white text-black text-[13px] font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Inquire About Services
          </button>
        </div>
      </div>
    </div>
  );
};
