import React from 'react';
import { NEWS_UPDATES } from '../data/content';
import { NewsUpdate } from '../types';

interface NewsUpdatesSectionProps {
  onSelectUpdate: (update: NewsUpdate) => void;
  onViewAll?: () => void;
}

export const NewsUpdatesSection: React.FC<NewsUpdatesSectionProps> = ({ onSelectUpdate, onViewAll }) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto py-16 md:py-24 px-6 md:px-16 bg-white border-t border-neutral-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16">
        <div className="flex flex-col items-start max-w-[700px]">
          <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4">
            [ WHAT'S NEW? ]
          </span>
          <p className="text-[14px] md:text-[15px] leading-[1.65] font-light text-neutral-600">
            What's new in work, wins, and partnerships.
          </p>
        </div>

        <div>
          <button
            onClick={onViewAll}
            className="text-[12px] uppercase font-normal tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-[#e38528] hover:border-[#e38528] transition-colors cursor-pointer"
          >
            VIEW ALL
          </button>
        </div>
      </div>

      {/* 3 Stacked Editorial Banner Items */}
      <div className="flex flex-col gap-10 md:gap-14">
        {NEWS_UPDATES.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectUpdate(item)}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center cursor-pointer group card-hover-lift"
          >
            {/* Left Graphic Banner (matches screenshot) */}
            <div className="col-span-1 md:col-span-6 w-full h-[220px] sm:h-[280px] md:h-[324px] relative overflow-hidden transition-all duration-300 ease-out transform group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-black/10 group-hover:opacity-95">
              {item.id === 'ibda-2026' && (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white px-8">
                  {/* Three trophy emblems */}
                  <div className="flex items-center gap-4 mb-4 text-white">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                  <span className="text-[12px] md:text-[14px] tracking-[0.25em] uppercase font-light text-center">
                    INDIA'S BEST DESIGN AWARDS
                  </span>
                </div>
              )}

              {item.id === 'switzerland-india-80' && (
                <div className="w-full h-full bg-[#cb2026] flex items-center justify-center text-white px-8">
                  <div className="flex items-center gap-6">
                    {/* Swiss Cross Shield */}
                    <div className="w-12 h-14 bg-[#a61318] border-2 border-white rounded-b-xl flex items-center justify-center">
                      <div className="relative w-6 h-6">
                        <div className="absolute top-1/2 left-0 w-6 h-2 -translate-y-1/2 bg-white" />
                        <div className="absolute top-0 left-1/2 w-2 h-6 -translate-x-1/2 bg-white" />
                      </div>
                    </div>
                    <span className="text-[20px] font-light">✕</span>
                    <span className="text-[18px] md:text-[22px] tracking-[0.2em] font-normal uppercase">
                      ANSH&CO.
                    </span>
                  </div>
                </div>
              )}

              {item.id === 'best-places-to-work' && (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white px-8">
                  <div className="border border-white/40 px-6 py-4 flex flex-col items-center">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 mb-1">
                      Certified Dec 2025 - Dec 2026 · India
                    </span>
                    <span className="text-[18px] md:text-[22px] font-bold tracking-tight uppercase text-center">
                      Best Places<br />to Work
                    </span>
                    <span className="text-[14px] font-mono mt-1 text-[#e38528]">2026</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Headline Typography (matches screenshot) */}
            <div className="col-span-1 md:col-span-6 flex flex-col justify-center">
              <h3 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] font-normal uppercase tracking-tight text-black leading-[1.08] group-hover:text-[#e38528] transition-colors duration-200">
                {item.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
