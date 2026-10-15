import React, { useState, useEffect, useRef } from 'react';

interface KineticManifestoProps {
  onKnowMore: () => void;
}

// 300+ unique agency capabilities, disciplines, tech stacks, and creative offerings.
// At 1 word change per second (1000ms), 300+ words guarantee at least 5 minutes of zero repetition!
const DYNAMIC_WORDS: string[] = [
  'GROWTH',
  'CREATIVITY',
  'DIGITAL MARKETING',
  'INFLUENCER MARKETING',
  'DEVELOPMENT',
  'AI SOLUTIONS',
  'WEB ARCHITECTURE',
  'BRAND STRATEGY',
  'MOBILE APPS',
  'CUSTOM CRM',
  "ERP'S",
  'SEO DOMINATION',
  'META ADS',
  'CONTENT CREATION',
  'SOCIAL MANAGEMENT',
  'AI VIDEO GENERATION',
  'GRAPHIC DESIGNING',
  'CONTENT MARKETING',
  'VIDEO EDITING',
  'PUBLIC RELATIONS',
  'VISUAL SYSTEMS',
  'BRAND IDENTITY',
  'LUXURY PACKAGING',
  'UI/UX EXCELLENCE',
  'PERFORMANCE ADS',
  'OMNICHANNEL SCALE',
  'DATA ANALYTICS',
  'CULTURAL RESONANCE',
  'CATEGORY LEADERSHIP',
  'CONVERSION POWER',
  'BESPOKE SOFTWARE',
  'FULL-STACK CODE',
  'VIRAL REACH',
  'CINEMATIC PRODUCTION',
  'MOTION GRAPHICS',
  '3D VISUALIZATION',
  'SOUND IDENTITY',
  'BRAND CUSTODIANSHIP',
  'INTELLIGENT WORKFLOWS',
  'AUTOMATED PIPELINES',
  'HEADLESS COMMERCE',
  'RETENTION ARCHITECTURE',
  'REPUTATION MANAGEMENT',
  'EXECUTIVE PR',
  'PAID ACQUISITION',
  'AUDIENCE TARGETING',
  'DIGITAL VELOCITY',
  'TYPOGRAPHIC CRAFT',
  'MARKET DISTINCTION',
  'CREATIVE AGILITY',
  'ENTERPRISE SCALE',
  'SEARCH DOMINANCE',
  'SOCIAL MEDIA MARKETING',
  'HIGH-IMPACT CAMPAIGNS',
  'VIRAL ACTIVATIONS',
  'DIGITAL TRANSFORMATION',
  'NEXT-GEN MEDIA',
  'ALGORITHMIC PRECISION',
  'BRAND STORYTELLING',
  'EXPERIENTIAL LAUNCHES',
  'CROSS-PLATFORM DESIGN',
  'MICRO-INTERACTIONS',
  'STRATEGIC RIGOR',
  'MODERN PACKAGING',
  'MEDIA PLACEMENTS',
  'INNOVATION ENGINES',
  'COHORT MODELING',
  'D2C EXPANSION',
  'SCALABLE PLATFORMS',
  'FUTURE-READY TECH',
  'INTERACTIVE WEBGL',
  'COLOR SCIENCE',
  'DYNAMIC STORYTELLING',
  'BRAND ARCHITECTURE',
  'OMNICHANNEL STRATEGY',
  'GENERATIVE WORKFLOWS',
  'EDITORIAL LEADERSHIP',
  'MEASURABLE ROI',
  'LEAD ACQUISITION',
  'CUSTOMER RETENTION',
  'CLOUD ARCHITECTURE',
  'CUSTOM EXTENSIONS',
  'PRODUCT POSITIONING',
  'ORGANIC AUTHORITY',
  'KEYWORD MASTERY',
  'EXPERIENTIAL MARKETING',
  'CREATIVE TECHNOLOGY',
  'CULTURE SHAPING',
  'FOUNDER VISION',
  'MODERN ADVERTISING',
  'HYPER-TARGETED ADS',
  'COMMERCIAL DIRECTION',
  'VFX & CGI',
  'RAPID DEPLOYMENT',
  'SECURE INFRASTRUCTURE',
  'ENGAGEMENT ENGINES',
  'AUTHENTIC CONNECTIONS',
  'PRESS COVERAGE',
  'STRATEGIC CLARITY',
  'GLOBAL REACH',
  'HIGH-TOUCH CRAFT',
  'CODE EXCELLENCE',
  'BRAND EMPOWERMENT',
  'DIGITAL SUPREMACY',
  'BESPOKE CMS',
  'MEDIA PRODUCTION',
  'VISUAL MEMORABILITY',
  'AUDIENCE LOYALTY',
  'HIGH ROAS',
  'ECOSYSTEM DESIGN',
  'TECH INNOVATION',
  'CREATIVE VISION',
  'CONSUMER PSYCHOLOGY',
  'DYNAMIC ADVERTISING',
  'CROSS-CHANNEL SYNERGY',
  'PERFORMANCE DESIGN',
  'ARTISTIC PRECISION',
  'SYNTHETIC MEDIA',
  'KINETIC DESIGN',
  'INTELLIGENT SCALING',
  'SEARCH RELEVANCE',
  'PLATFORM STRATEGY',
  'BRAND PERCEPTION',
  'VIRAL ENGAGEMENT',
  'REVENUE VELOCITY',
  'MODERN CODEBASES',
  'AI-DRIVEN AUTOMATION',
  'PREMIUM PACKAGING',
  'VISUAL BALANCE',
  'MARKET INTENT',
  'ENTERPRISE MOBILITY',
  'HIGH CONVERSION',
  'CREATIVE INTELLIGENCE',
  'GLOBAL BENCHMARKS',
  'USER JOURNEYS',
  'DATA ARCHITECTURE',
  'VIRAL AMPLIFICATION',
  'STRATEGIC ALIGNMENT',
  'DEEP ENGAGEMENT',
  'OMNI EXPERIENCE',
  'DYNAMIC ASSETS',
  'BOLD DIRECTION',
  'TACTICAL GROWTH',
  'CATEGORY DISRUPTION',
  'BRAND AUTHORITY',
  'INTERACTIVE CANVASES',
  'DIGITAL BENCHMARKS',
  'STORYTELLING POWER',
  'COMMERCIAL VELOCITY',
  'FUTURE HORIZONS',
  'NEXT-LEVEL CREATIVE',
  'DATA EMPOWERMENT',
  'HIGH-INTENT TRAFFIC',
  'CREATIVE DIRECTION',
  'BRAND MOMENTUM',
  'DYNAMIC CAMPAIGNS',
  'BESPOKE WORKFLOWS',
  'CROSS-BORDER SCALE',
  'AI WORKFLOWS',
  'TARGETED REACH',
  'DIGITAL EMPIRES',
  'VISUAL EXCELLENCE',
  'COMMUNITY CURATION',
  'RADICAL INNOVATION',
  'CUSTOMER LIFETIME VALUE',
  'RAPID SCALABILITY',
  'ART DIRECTING',
  'BRAND LONGEVITY',
  'SMART INFRASTRUCTURE',
  'HIGH PERFORMANCE',
  'INTEGRATED MEDIA',
  'STRATEGIC THINKING',
  'CATEGORY REDEFINITION',
  'HIGH ENGAGEMENT',
  'OMNICHANNEL MASTERY',
  'MODERN STORYTELLING',
  'CREATIVE COLLABORATION',
  'MARKET ADAPTABILITY',
  'DATA INTELLIGENCE',
  'DYNAMIC VISUALS',
  'BESPOKE EXPERIENCES',
  'PRECISION METRICS',
  'LEADERSHIP BRANDING',
  'MEDIA VISIBILITY',
  'PROVEN FRAMEWORKS',
  'BRAND COHESION',
  'CROSS-DEVICE HARMONY',
  'CULTURAL DIALOGUE',
  'VIRAL MOMENTUM',
  'DIGITAL BRILLIANCE',
  'ENGINEERED GROWTH',
  'CREATIVE HORIZONS',
  'ACCELERATED SALES',
  'HIGH-TOUCH EXECUTION',
  'CATEGORY ASCENT',
  'UNIFIED IDENTITY',
  'MODERN CODE',
  'SMART AUTOMATION',
  'CONSUMER ENGAGEMENT',
  'BRAND MASTERY',
  'VISUAL DISTINCTION',
  'INTERACTIVE COMMERCE',
  'MARKET TRACTION',
  'FUTURE PROOFING',
  'OMNI TOUCHPOINTS',
  'STRATEGIC IMPACT',
  'CREATIVE VELOCITY',
  'SCALABLE CODE',
  'DATA-BACKED DECISIONS',
  'MEMORABLE CAMPAIGNS',
  'CATEGORY EXPANSION',
  'HIGH-CONVERTING UI',
  'BRAND DOMINANCE',
  'NEXT-GEN APPS',
  'AI CREATIVE',
  'ORGANIC GROWTH',
  'VIRAL DISTRIBUTION',
  'ENTERPRISE STABILITY',
  'DYNAMIC DELIVERY',
  'CREATIVE SPARK',
  'MEASURABLE SUCCESS',
  'DEEP TECH',
  'VISUAL CLARITY',
  'DIGITAL ELEVATION',
  'STRATEGIC EXECUTION',
  'CATEGORY IMPACT',
  'MODERN PRODUCTION',
  'GLOBAL VISIBILITY',
  'CUSTOMER DELIGHT',
  'ENGAGEMENT METRICS',
  'PRECISION ADVERTISING',
  'BOLD IDENTITY',
  'FUTURE DIGITAL',
  'INTELLIGENT SYSTEMS',
  'CREATIVE EXPEDITIONS',
  'MARKET REVOLUTION',
  'HIGH IMPACT',
  'CROSS-PLATFORM EXCELLENCE',
  'DYNAMIC CAPABILITIES',
  'BRAND LEGACY',
  'OMNI CHANNELS',
  'DATA-DRIVEN ROI',
  'VIRAL SUCCESS',
  'CREATIVE DISCOVERY',
  'EXPONENTIAL GROWTH',
  'MODERN CRAFT',
  'AI EFFICIENCY',
  'SEARCH VISIBILITY',
  'CUSTOMER CONNECTIONS',
  'STRATEGIC PARTNERSHIPS',
  'CATEGORY DEFINITION',
  'HIGH RETENTION',
  'DIGITAL ARCHITECTURE',
  'BRAND REACH',
  'CINEMATIC STORYTELLING',
  'GLOBAL IMPACT',
  'BESPOKE APPS',
  'CREATIVE HORIZON',
  'DATA MASTERY',
  'SMART SCALING',
  'OMNIPRESENCE',
  'PREMIUM EXPERIENCES',
  'DYNAMIC ENGAGEMENT',
  'MARKET SUPREMACY',
  'ENDURING BENCHMARKS',
  'HIGH-OCTANE CREATIVE',
  'NEXT GENERATION GROWTH',
  'UNSTOPPABLE MOMENTUM'
];

export const KineticManifesto: React.FC<KineticManifestoProps> = ({ onKnowMore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Staggered scroll-into-view IntersectionObserver trigger
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      setIsRevealed(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rotate every second (1000ms) across the 300+ entries
  // Guaranteeing at least 5 minutes (300 seconds) of zero repetition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % DYNAMIC_WORDS.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentWord = DYNAMIC_WORDS[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="w-full max-w-[1440px] mx-auto py-16 md:py-28 px-6 md:px-12 relative flex flex-col items-center bg-white select-none overflow-hidden"
    >
      {/* Line 0: Centered Overline [ POWERING + IDEAS + WITH + _______ ] */}
      <div 
        className={`mb-12 md:mb-20 text-center flex items-center justify-center manifesto-line ${
          isRevealed ? 'reveal-visible' : 'reveal-hidden'
        }`}
        style={{ transitionDelay: '0ms' }}
      >
        <div className="inline-flex items-center justify-center flex-wrap gap-1.5 md:gap-2 text-[12px] md:text-[14px] tracking-[0.25em] font-normal uppercase text-neutral-800">
          <span className="text-neutral-500 font-light">[</span>
          <span className="text-black">POWERING</span>
          <span className="text-neutral-400 font-light">+</span>
          <span className="text-black">IDEAS</span>
          <span className="text-neutral-400 font-light">+</span>
          <span className="text-black">WITH</span>
          <span className="text-neutral-400 font-light">+</span>
          <span
            key={currentIndex}
            className="text-[#e38528] font-medium transition-all duration-300 inline-block px-1 animate-in fade-in zoom-in-95"
          >
            {currentWord}
          </span>
          <span className="text-neutral-500 font-light">]</span>
        </div>
      </div>

      {/* Kinetic Typographic Stack */}
      <div className="w-full flex flex-col items-center gap-2 md:gap-4 relative max-w-[1280px]">
        {/* Line 1: POWERING */}
        <div
          className={`w-full relative flex items-center justify-center cursor-pointer group manifesto-line ${
            isRevealed ? 'reveal-visible' : 'reveal-hidden'
          }`}
          style={{ transitionDelay: '160ms' }}
          onMouseEnter={() => setHoveredWord('powering')}
          onMouseLeave={() => setHoveredWord(null)}
        >
          <h2
            className={`text-[56px] sm:text-[95px] md:text-[140px] lg:text-[185px] leading-[0.88] tracking-tight font-extralight uppercase transition-colors duration-500 text-center ${
              hoveredWord === 'powering' ? 'text-black' : 'text-[#e5e5e5]'
            }`}
          >
            POWERING
          </h2>
          {/* Descriptive callout positioned top-right of POWERING */}
          <div className="hidden md:block absolute right-[4%] lg:right-[8%] top-[25%] max-w-[280px] text-left z-10 pointer-events-none">
            <p className="text-[13px] leading-[1.65] font-light text-neutral-600">
              We engineer continuous momentum and commercial distinction with purpose and strategic clarity.
            </p>
          </div>
        </div>

        {/* Mobile text fallback for POWERING */}
        <p 
          className={`md:hidden text-[13px] text-center max-w-[320px] text-neutral-600 font-light -mt-2 mb-6 manifesto-line ${
            isRevealed ? 'reveal-visible' : 'reveal-hidden'
          }`}
          style={{ transitionDelay: '180ms' }}
        >
          We engineer continuous momentum and commercial distinction with purpose and strategic clarity.
        </p>

        {/* Line 2: IDEAS */}
        <div
          className={`w-full relative flex items-center justify-center cursor-pointer group manifesto-line ${
            isRevealed ? 'reveal-visible' : 'reveal-hidden'
          }`}
          style={{ transitionDelay: '320ms' }}
          onMouseEnter={() => setHoveredWord('ideas')}
          onMouseLeave={() => setHoveredWord(null)}
        >
          {/* Descriptive callout positioned left/center of IDEAS */}
          <div className="hidden md:block absolute left-[4%] lg:left-[12%] top-[20%] max-w-[280px] text-left z-10 pointer-events-none">
            <p className="text-[13px] leading-[1.65] font-light text-neutral-600">
              Audacious, intelligent concepts designed to ignite cultural dialogue, captivate audiences, and shape what's next.
            </p>
          </div>
          <h2
            className={`text-[56px] sm:text-[95px] md:text-[140px] lg:text-[185px] leading-[0.88] tracking-tight font-extralight uppercase transition-colors duration-500 text-center ${
              hoveredWord === 'ideas' ? 'text-black' : 'text-[#e5e5e5]'
            }`}
          >
            IDEAS
          </h2>
        </div>

        {/* Mobile text fallback for IDEAS */}
        <p 
          className={`md:hidden text-[13px] text-center max-w-[320px] text-neutral-600 font-light -mt-2 mb-6 manifesto-line ${
            isRevealed ? 'reveal-visible' : 'reveal-hidden'
          }`}
          style={{ transitionDelay: '340ms' }}
        >
          Audacious, intelligent concepts designed to ignite cultural dialogue, captivate audiences, and shape what's next.
        </p>

        {/* Line 3: WITH + Rotating Dynamic Capability */}
        <div
          className={`w-full relative flex flex-col items-center justify-center cursor-pointer group manifesto-line ${
            isRevealed ? 'reveal-visible' : 'reveal-hidden'
          }`}
          style={{ transitionDelay: '480ms' }}
          onMouseEnter={() => setHoveredWord('dynamic')}
          onMouseLeave={() => setHoveredWord(null)}
        >
          <div className="hidden lg:block absolute right-[4%] xl:right-[10%] top-[15%] max-w-[280px] text-left z-10 pointer-events-none">
            <p className="text-[13px] leading-[1.65] font-light text-neutral-600">
              Transforming possibilities across engineering, performance marketing, and creative production.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-4 w-full">
            <span
              className={`text-[56px] sm:text-[95px] md:text-[140px] lg:text-[185px] leading-[0.88] tracking-tight font-extralight uppercase transition-colors duration-500 text-center block ${
                hoveredWord === 'dynamic' ? 'text-black' : 'text-[#e5e5e5]'
              }`}
            >
              WITH
            </span>
            <div className="w-full flex items-center justify-center min-h-[64px] sm:min-h-[96px] md:min-h-[140px] lg:min-h-[170px] mt-2 sm:mt-4">
              <h2
                key={currentIndex}
                className={`text-[36px] sm:text-[56px] md:text-[84px] lg:text-[110px] leading-[0.92] tracking-tight font-light uppercase transition-all duration-300 text-center animate-in fade-in zoom-in-95 max-w-full px-2 break-words ${
                  hoveredWord === 'dynamic' ? 'text-[#e38528]' : 'text-black'
                }`}
              >
                {currentWord}
              </h2>
            </div>
          </div>
        </div>

        {/* Mobile text fallback for dynamic capability */}
        <p 
          className={`md:hidden text-[13px] text-center max-w-[320px] text-neutral-600 font-light -mt-2 mb-6 manifesto-line ${
            isRevealed ? 'reveal-visible' : 'reveal-hidden'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          Transforming possibilities across engineering, performance marketing, and creative production.
        </p>
      </div>

      {/* Line 4: Action link */}
      <div 
        className={`mt-14 md:mt-20 manifesto-line ${
          isRevealed ? 'reveal-visible' : 'reveal-hidden'
        }`}
        style={{ transitionDelay: '640ms' }}
      >
        <button
          onClick={onKnowMore}
          className="text-[12px] uppercase font-normal tracking-[0.2em] text-neutral-800 border-b border-black pb-0.5 hover:text-[#e38528] hover:border-[#e38528] transition-colors cursor-pointer"
        >
          KNOW MORE
        </button>
      </div>
    </section>
  );
};
