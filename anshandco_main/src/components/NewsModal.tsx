import React from 'react';
import { X, ExternalLink, Award, Calendar, Tag } from 'lucide-react';
import { NewsUpdate } from '../types';

interface NewsModalProps {
  update: NewsUpdate | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ update, onClose, onOpenContact }) => {
  if (!update) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[760px] bg-white text-black shadow-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Category & Date */}
        <div className="flex items-center gap-4 text-[12px] text-neutral-500 font-light mb-4">
          <span className="flex items-center gap-1.5 text-[#e38528] font-medium">
            <Tag size={13} />
            {update.category}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} />
            {update.date}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[28px] md:text-[38px] font-light uppercase tracking-tight text-black leading-tight mb-6">
          {update.title}
        </h2>

        {/* Banner Preview */}
        <div className="w-full h-[220px] md:h-[260px] bg-black text-white flex items-center justify-center mb-8 px-6 text-center">
          {update.id === 'ibda-2026' && (
            <div className="flex flex-col items-center">
              <Award size={48} className="text-[#e38528] mb-3" />
              <span className="text-[18px] uppercase tracking-[0.2em] font-light">
                INDIA'S BEST DESIGN AWARDS 2026
              </span>
              <span className="text-[13px] text-neutral-400 mt-1 font-mono">
                3 Gold Citations in Identity, Packaging & Film
              </span>
            </div>
          )}
          {update.id === 'switzerland-india-80' && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-14 bg-[#cb2026] border-2 border-white rounded-b-xl flex items-center justify-center mb-3">
                <span className="text-white text-2xl font-bold">+</span>
              </div>
              <span className="text-[18px] uppercase tracking-[0.2em] font-light">
                SWITZERLAND INDIA 80
              </span>
              <span className="text-[13px] text-neutral-400 mt-1 font-mono">
                80 Years of Bilateral Friendship & Innovation
              </span>
            </div>
          )}
          {update.id === 'best-places-to-work' && (
            <div className="flex flex-col items-center">
              <span className="text-[11px] uppercase tracking-widest text-[#e38528] mb-1">
                Culture & People
              </span>
              <span className="text-[22px] font-bold uppercase tracking-tight">
                GREAT PLACE TO WORK CERTIFIED
              </span>
              <span className="text-[13px] text-neutral-400 mt-2 font-mono">
                Trust Index Score: 94% Affirmative Rating
              </span>
            </div>
          )}
        </div>

        {/* Body content */}
        <div className="flex flex-col gap-4 text-[15px] leading-[1.8] font-light text-neutral-700">
          <p>{update.summary}</p>
          <p>
            At ANSH&CO., our philosophy has always been centered around the delicate union of purpose, humanity, and creative fearlessness. Recognition from esteemed juries and international institutions reinforces our commitment to crafting identities that stand the test of time and drive genuine cultural relevance.
          </p>
          <p>
            We celebrate this achievement alongside our valued client partners who entrust us with their brand legacies every single day.
          </p>
        </div>

        {/* Footer actions */}
        <div className="pt-8 mt-6 border-t border-neutral-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="text-[12px] uppercase font-normal tracking-[0.15em] text-black hover:text-[#e38528] flex items-center gap-1.5 border-b border-black pb-0.5 cursor-pointer transition-colors"
          >
            <span>Read on anshandco.com</span>
            <ExternalLink size={14} />
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 border border-black bg-black text-white text-[12px] uppercase tracking-wider hover:bg-transparent hover:text-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
