import React from 'react';
import { AnshCoKineticBrandMark } from './Icons';

interface MissionSectionProps {
  onKnowMore: () => void;
}

export const MissionSection: React.FC<MissionSectionProps> = ({ onKnowMore }) => {
  return (
    <section
      id="why-are-you-here"
      className="w-full max-w-[1440px] mx-auto py-16 md:py-28 px-6 md:px-16 bg-white border-t border-neutral-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        {/* Left: ANSH&CO. Kinetic Bar Logo Mark */}
        <div className="col-span-1 md:col-span-6 flex justify-center md:justify-start items-center py-6">
          <AnshCoKineticBrandMark className="cursor-pointer group" />
        </div>

        {/* Right: Editorial Copy */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-start max-w-[560px]">
          {/* Overline in orange accent */}
          <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4">
            [ WHY ARE YOU HERE? ]
          </span>

          {/* Heading */}
          <h2 className="text-[36px] sm:text-[44px] md:text-[52px] leading-[1.05] font-light uppercase text-black tracking-tight mb-8">
            WE HELP <br />
            BUILD BRANDS
          </h2>

          {/* Editorial body */}
          <p className="text-[14px] md:text-[15px] leading-[1.75] font-light text-neutral-600 mb-8">
            ANSH&amp;CO help ambitious brands grow in a digital-first world. By combining strategy, creativity, and technology, we build meaningful brand identities, powerful digital experiences, and marketing campaigns that connect, engage, and deliver real results. With craft, clarity, and creativity, we transform ideas into powerful brand experiences.
          </p>

          {/* CTA Link */}
          <button
            onClick={onKnowMore}
            className="text-[12px] uppercase font-normal tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-[#e38528] hover:border-[#e38528] transition-colors cursor-pointer"
          >
            KNOW MORE
          </button>
        </div>
      </div>
    </section>
  );
};
