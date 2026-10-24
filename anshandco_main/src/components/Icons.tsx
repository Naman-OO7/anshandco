import React from 'react';

// Raw Brand Logo SVG from DOM fact
export const AnshCoLogoBars: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 230 280" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="220" width="16" height="60" />
    <rect x="42" y="160" width="16" height="120" />
    <rect x="84" y="100" width="16" height="180" />
    <rect x="126" y="0" width="16" height="280" />
    <rect x="168" y="40" width="16" height="240" />
    <rect x="210" y="80" width="16" height="200" />
  </svg>
);

// Kinetic Mission Brand Logo with A N S H & C O letters and bars
export const AnshCoKineticBrandMark: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-end justify-between w-[280px] h-[360px] md:w-[320px] md:h-[400px] select-none text-black dark:text-white ${className}`}>
      {/* Col 1: A */}
      <div className="flex flex-col items-center kinetic-bar-col group">
        <span className="text-[18px] md:text-[20px] font-semibold mb-3 tracking-tighter kinetic-bar-letter">A</span>
        <div className="w-[18px] h-[55px] bg-black dark:bg-white kinetic-bar group-hover:h-[75px]" />
      </div>

      {/* Col 2: N */}
      <div className="flex flex-col items-center kinetic-bar-col group">
        <span className="text-[18px] md:text-[20px] font-semibold mb-3 tracking-tighter kinetic-bar-letter">N</span>
        <div className="w-[18px] h-[110px] bg-black dark:bg-white kinetic-bar group-hover:h-[135px]" />
      </div>

      {/* Col 3: S */}
      <div className="flex flex-col items-center kinetic-bar-col group">
        <span className="text-[18px] md:text-[20px] font-semibold mb-3 tracking-tighter kinetic-bar-letter">S</span>
        <div className="w-[18px] h-[170px] bg-black dark:bg-white kinetic-bar group-hover:h-[195px]" />
      </div>

      {/* Col 4: H */}
      <div className="flex flex-col items-center kinetic-bar-col group">
        <span className="text-[18px] md:text-[20px] font-semibold mb-3 tracking-tighter kinetic-bar-letter">H</span>
        <div className="w-[18px] h-[230px] bg-black dark:bg-white kinetic-bar group-hover:h-[255px]" />
      </div>

      {/* Col 5: & */}
      <div className="flex flex-col items-center kinetic-bar-col group">
        <span className="text-[18px] md:text-[20px] font-semibold mb-3 tracking-tighter kinetic-bar-letter">&amp;</span>
        <div className="w-[18px] h-[290px] bg-black dark:bg-white kinetic-bar group-hover:h-[315px]" />
      </div>

      {/* Col 6: C */}
      <div className="flex flex-col items-center kinetic-bar-col group">
        <span className="text-[18px] md:text-[20px] font-semibold mb-3 tracking-tighter kinetic-bar-letter">C</span>
        <div className="w-[18px] h-[250px] bg-black dark:bg-white kinetic-bar group-hover:h-[275px]" />
      </div>

      {/* Col 7: O + Registered */}
      <div className="flex flex-col items-center relative kinetic-bar-col group">
        <span className="text-[18px] md:text-[20px] font-semibold mb-3 tracking-tighter kinetic-bar-letter">O</span>
        <div className="w-[18px] h-[210px] bg-black dark:bg-white kinetic-bar group-hover:h-[235px]" />
        <span className="text-[12px] font-bold absolute -bottom-6 -right-3 text-black dark:text-white">®</span>
      </div>
    </div>
  );
};

// Footer Ansh & Co White Logo
export const AnshCoFooterLogoMark: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-end justify-between w-[220px] h-[180px] select-none text-white ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-[14px] font-medium mb-1">A</span>
        <div className="w-[12px] h-[35px] bg-white" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[14px] font-medium mb-1">N</span>
        <div className="w-[12px] h-[65px] bg-white" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[14px] font-medium mb-1">S</span>
        <div className="w-[12px] h-[95px] bg-white" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[14px] font-medium mb-1">H</span>
        <div className="w-[12px] h-[130px] bg-white" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[14px] font-medium mb-1">&amp;</span>
        <div className="w-[12px] h-[160px] bg-white" />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[14px] font-medium mb-1">C</span>
        <div className="w-[12px] h-[140px] bg-white" />
      </div>
      <div className="flex flex-col items-center relative">
        <span className="text-[14px] font-medium mb-1">O</span>
        <div className="w-[12px] h-[115px] bg-white" />
        <span className="text-[10px] font-bold absolute -bottom-5 -right-2">®</span>
      </div>
    </div>
  );
};

// Social Icons from DOM facts
export const LinkedInIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6 hover:text-orange-400 transition-colors duration-300"
}) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6 hover:text-orange-400 transition-colors duration-300"
}) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6 hover:text-orange-400 transition-colors duration-300"
}) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
  </svg>
);

export const TwitterXIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6 hover:text-orange-400 transition-colors duration-300"
}) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

// Pixelated Custom Cursor 3D hand icon matching screenshot
export const PixelCursorHand: React.FC<{ isHovering?: boolean }> = ({ isHovering = false }) => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`filter drop-shadow-md transition-transform duration-150 ${isHovering ? 'scale-115' : 'scale-100'}`}
  >
    {/* Retro styled pixel/isometric pointer hand from screenshot */}
    <path
      d="M10 2L10 16L14 16L17 23L20 22L17 15L23 15L10 2Z"
      fill="#FFFFFF"
      stroke="#000000"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

// Service badges (Strategy, Branding, Digital, Marketing, Production)
export const ServiceStrategyBadge: React.FC<{ className?: string }> = ({ className = "w-14 h-10" }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="96" height="56" rx="4" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="80" cy="40" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M24 22 L76 38" stroke="currentColor" strokeWidth="2" />
    <path d="M45 15 L55 25 M55 15 L45 25" stroke="currentColor" strokeWidth="2" />
    <path d="M60 45 L70 35 M70 45 L60 35" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ServiceBrandingBadge: React.FC<{ className?: string }> = ({ className = "w-14 h-10" }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="96" height="56" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="25" cy="45" r="5" stroke="currentColor" strokeWidth="2" fill="white" />
    <circle cx="75" cy="15" r="5" stroke="currentColor" strokeWidth="2" fill="white" />
    <path d="M25 45 C 35 15, 65 45, 75 15" stroke="currentColor" strokeWidth="2.5" />
    <line x1="25" y1="45" x2="35" y2="15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const ServiceDigitalBadge: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="20" cy="7" r="4" />
    <circle cx="20" cy="33" r="4" />
    <circle cx="7" cy="20" r="4" />
    <circle cx="33" cy="20" r="4" />
    <circle cx="11" cy="11" r="3" />
    <circle cx="29" cy="11" r="3" />
    <circle cx="11" cy="29" r="3" />
    <circle cx="29" cy="29" r="3" />
  </svg>
);

export const ServiceMarketingBadge: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 33 C 20 33, 6 23, 6 14 C 6 8.5 10.5 5 15.5 5 C 18 5 20 6.5 20 7 C 20 6.5 22 5 24.5 5 C 29.5 5 34 8.5 34 14 C 34 23, 20 33, 20 33 Z" />
  </svg>
);

export const ServiceDevelopmentBadge: React.FC<{ className?: string }> = ({ className = "w-12 h-8 sm:w-16 sm:h-10" }) => (
  <svg viewBox="0 0 70 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="66" height="41" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M22 15L14 22.5L22 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M48 15L56 22.5L48 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M38 13L32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ServiceProductionBadge: React.FC<{ className?: string }> = ({ className = "w-14 h-10" }) => (
  <div className={`flex items-center justify-center border border-current rounded px-2 py-1 text-[11px] font-mono tracking-widest uppercase ${className}`}>
    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block mr-1.5 animate-pulse" />
    <span>REC</span>
  </div>
);
