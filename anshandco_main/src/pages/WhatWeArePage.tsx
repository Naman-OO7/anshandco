import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Layers,
  Cpu,
  Target,
  Award,
  Users,
  TrendingUp,
  Terminal,
  Zap,
  Globe
} from 'lucide-react';

interface WhatWeArePageProps {
  onOpenContact: () => void;
  onNavigateToProvide: () => void;
  onNavigateToTeam?: () => void;
  onNavigateToTrust?: () => void;
}

interface Pillar {
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
}

interface ComparisonRow {
  aspect: string;
  traditional: string;
  anshCo: string;
}

interface MethodologyStep {
  step: string;
  name: string;
  duration: string;
  summary: string;
  deliverables: string[];
}

export const WhatWeArePage: React.FC<WhatWeArePageProps> = ({
  onOpenContact,
  onNavigateToProvide,
  onNavigateToTeam,
  onNavigateToTrust
}) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [activeMethodology, setActiveMethodology] = useState<number>(0);

  const pillars: Pillar[] = [
    {
      number: '01',
      badge: 'PURPOSE & STRATEGY',
      title: 'STRATEGIC RIGOR',
      subtitle: 'Thinking deeply before making boldly',
      description:
        'We interrogate the core commercial truth and market reality of every venture before drawing a single vector or committing a line of code. Every brand identity, packaging silhouette, and digital touchpoint is grounded in fundamental market truth.',
      points: [
        'Category anthropology & whitespace mapping',
        'Competitive differentiation matrices',
        'High-intent audience psychographics',
        'Commercial monetization alignment'
      ],
      icon: <Compass className="w-5 h-5 text-[#e38528]" />
    },
    {
      number: '02',
      badge: 'RADICAL CRAFT',
      title: 'VISUAL ARCHITECTURE',
      subtitle: 'Obsessive aesthetic execution',
      description:
        'We build visual languages designed to endure for decades, not fleeting social media trend cycles. From bespoke typographic scales to physical packaging unboxing rituals, our craft commands immediate cultural respect.',
      points: [
        'Proprietary typographic hierarchies',
        'Modular design systems & tokens',
        'Luxury tactile packaging & finishes',
        'Spatial and environmental branding'
      ],
      icon: <Sparkles className="w-5 h-5 text-[#e38528]" />
    },
    {
      number: '03',
      badge: 'FULL-STACK TECH',
      title: 'BESPOKE CODE & AI',
      subtitle: 'Modern engineering without templates',
      description:
        'A great brand must perform flawlessly in the digital wild. We engineer lightning-fast web applications, headless e-commerce architectures, custom internal CRMs, and generative AI production pipelines in-house.',
      points: [
        'Headless React & Next.js architectures',
        'Custom CRM & ERP operational tooling',
        'Generative AI content workflows',
        'Sub-second Core Web Vitals optimization'
      ],
      icon: <Cpu className="w-5 h-5 text-[#e38528]" />
    },
    {
      number: '04',
      badge: 'LONG-TERM GUARDIANSHIP',
      title: 'BRAND CUSTODIANSHIP',
      subtitle: 'Dedicated guardians, not transactional vendors',
      description:
        'Traditional agencies hand off a logo PDF and vanish. ANSH&CO was established on the principle of brand custodianship: standing alongside founders as long-term partners who protect equity, sharpen voice, and scale reach.',
      points: [
        'Multi-year brand governance & stewardship',
        'Rapid creative iteration & sprint agility',
        'Omnichannel message continuity',
        'Direct senior director collaboration'
      ],
      icon: <ShieldCheck className="w-5 h-5 text-[#e38528]" />
    }
  ];

  const comparisons: ComparisonRow[] = [
    {
      aspect: 'Engagement Model',
      traditional: 'Transactional handoffs, short-lived campaigns, and rigid hour-billing briefs.',
      anshCo: 'Long-term brand custodianship with direct founder-level dedication and shared skin in the game.'
    },
    {
      aspect: 'Team Structure',
      traditional: 'Junior account executives buffer multiple layers of outsourced freelance contractors.',
      anshCo: 'Specialist-led studio squads where senior strategists, designers, and engineers work directly with you.'
    },
    {
      aspect: 'Craft & Approach',
      traditional: 'Cookie-cutter templates, pre-made themes, and transient algorithmic trend chasing.',
      anshCo: 'Bespoke typographic systems, custom-built codebases, and timeless category-defining aesthetics.'
    },
    {
      aspect: 'Execution Breadth',
      traditional: 'Disjointed vendors for branding, development, PR, and ads leading to broken messaging.',
      anshCo: 'Unified ecosystem: Strategy, Brand Identity, Full-Stack Web, Motion Films, and Growth under one roof.'
    },
    {
      aspect: 'Success Metric',
      traditional: 'Superficial vanity impressions and arbitrary presentation slide deliverables.',
      anshCo: 'Measurable enterprise valuation, premium customer sentiment, and undeniable market presence.'
    }
  ];

  const methodology: MethodologyStep[] = [
    {
      step: 'PHASE 01',
      name: 'Interrogation & Core Discovery',
      duration: 'Weeks 1 – 2',
      summary:
        'We immerse ourselves inside your business model, customer psychology, and competitive whitespace to define the irreducible truth of your brand.',
      deliverables: [
        'Competitor Whitespace Audit',
        'Customer Psychographic Archetypes',
        'Market Positioning Statement',
        'Strategic Opportunity Blueprint'
      ]
    },
    {
      step: 'PHASE 02',
      name: 'Verbal Identity & Nomenclature',
      duration: 'Weeks 3 – 4',
      summary:
        'Words give form to emotion. We formulate your brand manifesto, naming conventions, tone-of-voice playbook, and headline messaging architecture.',
      deliverables: [
        'Core Brand Manifesto',
        'Nomenclature & Product Naming',
        'Tone of Voice & Verbal Spectrum',
        'Mission, Vision & Tagline Matrix'
      ]
    },
    {
      step: 'PHASE 03',
      name: 'Visual System & Identity Design',
      duration: 'Weeks 5 – 8',
      summary:
        'Translating strategic intent into an indelible visual reality: bespoke wordmarks, color chemistry, typography, 3D assets, and tactile packaging.',
      deliverables: [
        'Bespoke Brandmark & Wordmark System',
        'Custom Typographic Hierarchy',
        'Design Tokens & Color Palette',
        'Packaging & Spatial Blueprints'
      ]
    },
    {
      step: 'PHASE 04',
      name: 'Digital Architecture & Production',
      duration: 'Weeks 9 – 12',
      summary:
        'Building high-velocity digital homes and cinematic reels. Bespoke React web applications, custom CRM integrations, and commercial motion assets.',
      deliverables: [
        'Bespoke Interactive Web Platforms',
        'Custom CRM / ERP Automation',
        'Commercial Motion Reels & 3D Assets',
        'Performance Marketing Creative Kits'
      ]
    },
    {
      step: 'PHASE 05',
      name: 'Go-to-Market & Custodianship',
      duration: 'Ongoing Stewardship',
      summary:
        'Launching with resonance and nurturing the brand through continuous creative direction, campaign execution, and equity preservation.',
      deliverables: [
        'Omnichannel Launch Orchestration',
        'Continuous Creative Direction',
        'Brand Equity Governance & Audits',
        'Performance Growth Scaling'
      ]
    }
  ];

  const studioStats = [
    { value: '50+', label: 'Brands Architected', detail: 'Across luxury, hospitality, tech & consumer goods' },
    { value: '100%', label: 'In-House Craft', detail: 'Zero outsourcing; senior engineers and artists on every file' },
    { value: '6+ Yrs', label: 'Avg. Client Partnership', detail: 'Building enduring legacies rather than momentary blips' },
    { value: '3x', label: 'IBDA Design Honors', detail: "Recognized at India's premier annual design accolades" }
  ];

  return (
    <div className="w-full pt-[120px] pb-24 px-6 md:px-16 max-w-[1440px] mx-auto animate-in fade-in duration-300 bg-white dark:bg-[#080808] text-black dark:text-white transition-colors duration-300">
      {/* 1. Header Banner & Identity Statement */}
      <div className="max-w-[1100px] mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-mono uppercase text-[#e38528]">
            [ WHAT WE ARE? ]
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 text-xs font-mono">•</span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            ANSH&amp;CO BRAND MANIFESTO
          </span>
        </div>

        <h1 className="text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] leading-[0.94] font-extralight uppercase text-black dark:text-white tracking-tight mb-8">
          AN INDEPENDENT <br />
          <span className="font-normal text-black dark:text-white">CREATIVE &amp; STRATEGIC</span> <br />
          <span className="text-neutral-400 dark:text-neutral-600 font-extralight">POWERHOUSE.</span>
        </h1>

        <p className="text-[18px] md:text-[24px] font-light text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-[860px]">
          ANSH&amp;CO is a branding-first company where strategic rigor, artistic craft, bespoke engineering, and cultural empathy converge to transform ideas into enduring category benchmarks.
        </p>

        {/* Studio DNA Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 mt-10 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
              [ 01 · STRUCTURE ]
            </span>
            <span className="text-[13px] font-medium text-black dark:text-white uppercase tracking-wider block">
              Independent Collective
            </span>
            <span className="text-[12px] font-light text-neutral-500 dark:text-neutral-400">Zero corporate bloat</span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
              [ 02 · SPECIALIZATION ]
            </span>
            <span className="text-[13px] font-medium text-black dark:text-white uppercase tracking-wider block">
              Branding &amp; Technology
            </span>
            <span className="text-[12px] font-light text-neutral-500 dark:text-neutral-400">From identity to code</span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
              [ 03 · ROLE ]
            </span>
            <span className="text-[13px] font-medium text-[#e38528] uppercase tracking-wider block">
              Brand Custodian
            </span>
            <span className="text-[12px] font-light text-neutral-500 dark:text-neutral-400">Long-term guardianship</span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 block mb-1">
              [ 04 · REACH ]
            </span>
            <span className="text-[13px] font-medium text-black dark:text-white uppercase tracking-wider block">
              Global Standards
            </span>
            <span className="text-[12px] font-light text-neutral-500 dark:text-neutral-400">India · UAE · Global</span>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics & Studio Credentials */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-8 bg-neutral-50 dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 mb-20 md:mb-28 transition-colors">
        {studioStats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[36px] sm:text-[46px] md:text-[54px] font-light tracking-tight text-black dark:text-white leading-none mb-2">
              {stat.value}
            </span>
            <span className="text-[12px] md:text-[13px] font-medium uppercase tracking-wider text-black dark:text-white mb-1">
              {stat.label}
            </span>
            <span className="text-[11px] md:text-[12px] font-light text-neutral-500 dark:text-neutral-400 leading-snug">
              {stat.detail}
            </span>
          </div>
        ))}
      </div>

      {/* 3. The Four Core Pillars of ANSH&CO */}
      <div className="mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#e38528] block mb-2">
              [ THE ARCHITECTURE OF WHAT WE ARE ]
            </span>
            <h2 className="text-[32px] sm:text-[44px] md:text-[52px] font-light uppercase tracking-tight text-black dark:text-white leading-none">
              OUR FOUR CORE PILLARS
            </h2>
          </div>
          <p className="text-[14px] font-light text-neutral-500 dark:text-neutral-400 max-w-[420px] mt-4 md:mt-0">
            Every engagement at ANSH&amp;CO is anchored upon four immutable disciplines, ensuring zero divergence between strategy and execution.
          </p>
        </div>

        {/* 4 Pillars Grid with Interactive Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const isSelected = activePillar === index;
            return (
              <div
                key={pillar.number}
                onMouseEnter={() => setActivePillar(index)}
                onClick={() => setActivePillar(index)}
                className={`p-8 border transition-all duration-300 ease-out transform cursor-pointer flex flex-col justify-between min-h-[380px] hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 card-hover-lift ${
                  isSelected
                    ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-xl -translate-y-2'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] hover:border-black dark:hover:border-neutral-400 text-black dark:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-[11px] font-mono tracking-widest uppercase ${
                        isSelected ? 'text-[#e38528]' : 'text-neutral-400 dark:text-neutral-500'
                      }`}
                    >
                      {pillar.number} / {pillar.badge}
                    </span>
                    <div
                      className={`p-2 rounded-full ${
                        isSelected ? 'bg-white/10 dark:bg-black/10' : 'bg-neutral-100 dark:bg-neutral-800'
                      }`}
                    >
                      {pillar.icon}
                    </div>
                  </div>

                  <h3 className="text-[26px] md:text-[30px] font-light uppercase tracking-tight mb-2 leading-tight">
                    {pillar.title}
                  </h3>
                  <p
                    className={`text-[12px] font-mono uppercase tracking-wider mb-4 ${
                      isSelected ? 'text-[#e38528]' : 'text-neutral-500'
                    }`}
                  >
                    {pillar.subtitle}
                  </p>

                  <p
                    className={`text-[13px] leading-[1.7] font-light mb-6 ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/30">
                  <ul className="flex flex-col gap-2">
                    {pillar.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className={`text-[11px] font-light flex items-center gap-2 ${
                          isSelected ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e38528] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Deep Philosophy & The Brand Custodian Manifesto */}
      <div className="py-16 md:py-20 px-8 md:px-14 bg-black text-white mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#e38528] mb-3 block">
              [ THE ANSH&amp;CO PHILOSOPHY ]
            </span>
            <h2 className="text-[34px] sm:text-[46px] md:text-[56px] font-extralight uppercase tracking-tight leading-[1.02] mb-6">
              NOT JUST A VENDOR. <br />
              <span className="font-normal text-white">A BRAND CUSTODIAN.</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#e38528] mb-8" />
            <p className="text-[14px] font-light text-neutral-400 leading-relaxed mb-6">
              Most agencies operate as transactional production conveyor belts—delivering isolated campaigns, brief-bound logos, or momentary ad bursts before moving to the next client.
            </p>
            <p className="text-[14px] font-light text-neutral-400 leading-relaxed">
              ANSH&amp;CO was founded on the fundamental conviction that extraordinary brands require dedicated custodians: partners who protect their legacy, sharpen their voice, and expand their universe over years, not weeks.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 pl-0 lg:pl-10 lg:border-l border-neutral-800">
            <blockquote className="text-[20px] sm:text-[24px] md:text-[28px] font-extralight leading-[1.35] text-neutral-200 italic">
              &ldquo;We don&apos;t just design for this quarter&apos;s campaign. We architect visual and digital assets that will feel authoritative and culturally resonant a decade from today.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-800">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528]">
                  TRANSACTIONAL AGENCIES
                </span>
                <p className="text-[13px] font-light text-neutral-400 leading-relaxed">
                  Treat brand identities as static graphic deliverables, handing off guidelines to disconnected vendors with zero accountability for the outcome.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-white">
                  ANSH&amp;CO CUSTODIANSHIP
                </span>
                <p className="text-[13px] font-light text-neutral-300 leading-relaxed">
                  Stands guard over every digital commit, packaging fold, motion cut, and advertising headline, guaranteeing flawless coherence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Agency Comparison Table (Why ANSH&CO Is Different) */}
      <div className="mb-20 md:mb-28">
        <div className="mb-10">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#e38528] block mb-2">
            [ CATEGORY DIFFERENTIATION ]
          </span>
          <h2 className="text-[32px] sm:text-[44px] md:text-[50px] font-light uppercase tracking-tight text-black dark:text-white leading-tight">
            THE ANATOMY OF OUR DISTINCTION
          </h2>
          <p className="text-[14px] font-light text-neutral-600 dark:text-neutral-400 mt-2 max-w-[640px]">
            How our studio model compares against conventional advertising conglomerates and template assembly shops.
          </p>
        </div>

        <div className="w-full overflow-x-auto border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#141414] text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                <th className="py-4 px-6 font-normal w-[22%]">DIMENSION</th>
                <th className="py-4 px-6 font-normal w-[39%] text-neutral-400 dark:text-neutral-500">TRADITIONAL PRODUCTION HOUSE</th>
                <th className="py-4 px-6 font-normal w-[39%] text-black dark:text-white bg-neutral-100/70 dark:bg-neutral-800/60">
                  <span className="text-[#e38528] font-medium mr-1.5">[ ANSH&amp;CO ]</span> BRAND CUSTODIAN
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-[13px] font-light">
              {comparisons.map((comp, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                  <td className="py-5 px-6 font-medium text-black dark:text-white uppercase tracking-wider text-[12px]">
                    {comp.aspect}
                  </td>
                  <td className="py-5 px-6 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <XCircle size={15} className="text-neutral-400 dark:text-neutral-500 shrink-0 mt-0.5" />
                      <span>{comp.traditional}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-black dark:text-white bg-neutral-50/40 dark:bg-neutral-800/40 font-normal leading-relaxed">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-[#e38528] shrink-0 mt-0.5" />
                      <span>{comp.anshCo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. The 5-Stage Studio Methodology */}
      <div className="mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#e38528] block mb-2">
              [ THE ANSH&amp;CO OPERATING FLYWHEEL ]
            </span>
            <h2 className="text-[32px] sm:text-[44px] md:text-[50px] font-light uppercase tracking-tight text-black dark:text-white leading-tight">
              HOW WE BRING IDEAS TO LIFE
            </h2>
          </div>
          <p className="text-[14px] font-light text-neutral-500 dark:text-neutral-400 max-w-[420px] mt-4 md:mt-0">
            A battle-tested 5-stage lifecycle turning raw vision into enduring market authority.
          </p>
        </div>

        {/* Methodology Horizontal / Accordion Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800">
            {methodology.map((m, idx) => {
              const isActive = activeMethodology === idx;
              return (
                <button
                  key={m.step}
                  onClick={() => setActiveMethodology(idx)}
                  className={`p-6 text-left transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'bg-white dark:bg-[#121212] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] text-black dark:text-white'
                  }`}
                >
                  <div>
                    <div className="mb-1.5">
                      <span
                        className={`text-[11px] font-medium tracking-[0.24em] uppercase transition-colors ${
                          isActive ? 'text-[#e38528]' : 'text-neutral-400 dark:text-neutral-500'
                        }`}
                      >
                        {m.step}
                      </span>
                    </div>
                    <h4 className="text-[18px] md:text-[20px] font-light uppercase tracking-tight">
                      {m.name}
                    </h4>
                  </div>
                  <ArrowRight
                    size={18}
                    className={`shrink-0 transition-transform ${
                      isActive ? 'text-[#e38528] translate-x-1' : 'text-neutral-300 dark:text-neutral-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          <div className="lg:col-span-7 p-8 md:p-12 border border-black dark:border-neutral-800 bg-neutral-900 text-white min-h-[380px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-800">
                <span className="text-[12px] font-medium tracking-[0.24em] uppercase text-[#e38528]">
                  {methodology[activeMethodology].step}
                </span>
              </div>

              <h3 className="text-[28px] sm:text-[34px] font-light uppercase tracking-tight text-white mb-4">
                {methodology[activeMethodology].name}
              </h3>

              <p className="text-[15px] font-light text-neutral-300 leading-relaxed mb-8">
                {methodology[activeMethodology].summary}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3 block">
                PHASE DELIVERABLES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {methodology[activeMethodology].deliverables.map((deliv, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 bg-neutral-800/60 border border-neutral-700/60 text-[12px] font-light text-neutral-200 flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={14} className="text-[#e38528] shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Unified Studio CTA & Cross-Navigation Bar */}
      <div className="p-10 md:p-16 bg-black text-white flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-[620px]">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] mb-3 block">
            [ READY TO SCALE WITH DISTINCTION? ]
          </span>
          <h3 className="text-[34px] sm:text-[44px] md:text-[50px] font-extralight uppercase tracking-tight leading-tight mb-4">
            DISCOVER WHAT WE CAN <br />
            <span className="font-normal text-white">BUILD TOGETHER.</span>
          </h3>
          <p className="text-[14px] font-light text-neutral-400 leading-relaxed">
            Whether engineering an ambitious ground-up rebrand, building an enterprise web platform, or seeking long-term brand custodianship, our team is ready.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
          <button
            onClick={onNavigateToProvide}
            className="px-7 py-3.5 border border-white text-white text-[13px] font-light hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>What We Provide</span>
            <ArrowRight size={14} />
          </button>

          {onNavigateToTeam && (
            <button
              onClick={onNavigateToTeam}
              className="px-7 py-3.5 border border-neutral-700 text-neutral-300 text-[13px] font-light hover:border-white hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Who We Are</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button
            onClick={onOpenContact}
            className="px-8 py-3.5 bg-[#e38528] text-black text-[13px] font-medium hover:bg-[#cf741e] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start a Conversation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
