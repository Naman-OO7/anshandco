import React from 'react';
import { X } from 'lucide-react';
import { CASE_STUDIES } from '../data/content';
import { CaseStudy, NewsUpdate } from '../types';

interface ViewAllDrawerProps {
  isOpen: boolean;
  initialTab?: string;
  onClose: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onSelectNews?: (news: NewsUpdate) => void;
}

const CASE_STUDY_SECONDARY_IMAGES: Record<string, string> = {
  'showcase-extension-1': 'https://file.garden/aqpuSRZZW6ZbIllx/m2.jpg',
  'roots-and-sky': 'https://file.garden/aqpuSRZZW6ZbIllx/meme5.jpg',
  'otr-make-it-yours': 'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg',
  'showcase-extension-2': 'https://file.garden/aqpuSRZZW6ZbIllx/m2.jpg',
  'our-mocks': 'https://file.garden/aqpuSRZZW6ZbIllx/l2.jpg',
};

const CASE_STUDY_SECONDARY_FALLBACKS: Record<string, string> = {
  'showcase-extension-1': '/m2.jpg',
  'roots-and-sky': '/meme5.jpg',
  'otr-make-it-yours': '/m3.jpg',
  'showcase-extension-2': '/m2.jpg',
  'our-mocks': '/l2.jpg',
};

export const ViewAllDrawer: React.FC<ViewAllDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCaseStudy,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[1080px] bg-white text-black p-8 md:p-12 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black transition-colors cursor-pointer"
          aria-label="Close drawer"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <span className="text-[12px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-2 block">
            [ DIRECTORY ARCHIVE ]
          </span>
          <div className="flex items-center gap-6 mt-4 border-b border-neutral-200 pb-3">
            <span className="text-[14px] uppercase tracking-wider pb-2 font-medium text-black border-b-2 border-black -mb-[14px]">
              MEME STUDIES ({CASE_STUDIES.length})
            </span>
          </div>
        </div>

        {/* Meme Studies Grid with Smooth Cross-Fade Hover Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => {
            const secondaryImg =
              (study.gallery && study.gallery.length > 1 ? study.gallery[1] : null) ||
              CASE_STUDY_SECONDARY_IMAGES[study.id] ||
              (study.id === 'roots-and-sky' ? '/meme5.jpg' : null) ||
              (study.id === 'otr-make-it-yours' ? '/m3.jpg' : null) ||
              (study.id === 'showcase-extension-1' ? '/m2.jpg' : null) ||
              study.posterUrl;
            const fallbackSec = CASE_STUDY_SECONDARY_FALLBACKS[study.id] || '/m2.jpg';

            return (
              <div
                key={study.id}
                onClick={() => {
                  onClose();
                  onSelectCaseStudy(study);
                }}
                className="border border-neutral-200 p-4 hover:border-black transition-all duration-300 cursor-pointer group"
              >
                <div className="w-full aspect-video bg-neutral-900 overflow-hidden mb-3 relative">
                  {/* Primary Cover Image - Fades out on hover */}
                  <img
                    src={study.posterUrl}
                    alt={study.title}
                    onError={(e) => {
                      if (study.id === 'showcase-extension-1') {
                        e.currentTarget.src = '/m1.jpg';
                      } else if (study.id === 'roots-and-sky') {
                        e.currentTarget.src = '/meme1.jpg';
                      } else if (study.id === 'otr-make-it-yours') {
                        e.currentTarget.src = '/meme2.jpg';
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:opacity-0 transition-all duration-700 ease-in-out"
                  />

                  {/* Secondary Image - Cross-fades in on hover */}
                  <img
                    src={secondaryImg}
                    alt={`${study.title} preview`}
                    onError={(e) => {
                      e.currentTarget.src = fallbackSec;
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />

                  {/* Subtle Dark Gradient & Hover Indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none" />
                </div>
                <span className="text-[11px] text-[#e38528] uppercase font-medium">
                  {study.client}
                </span>
                <h4 className="text-[16px] font-medium text-black mt-1 mb-2 group-hover:text-[#e38528] transition-colors">
                  {study.title}
                </h4>
                <p className="text-[12px] text-neutral-600 line-clamp-3 font-light">
                  {study.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
