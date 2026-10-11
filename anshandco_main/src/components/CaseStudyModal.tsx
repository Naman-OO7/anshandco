import React, { useState } from 'react';
import { X, ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { CaseStudy } from '../types';
import { AutoMockCarousel } from './AutoMockCarousel';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onOpenContact?: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose, onOpenContact }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[960px] bg-white text-black shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Media Frame */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          {study.gallery && study.gallery.length > 0 ? (
            <AutoMockCarousel
              images={study.gallery}
              aspect="aspect-video"
              className="h-full"
            />
          ) : study.mediaType === 'video' && !hasError ? (
            <div className="relative w-full h-full">
              <video
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster={study.posterUrl}
                onError={() => {
                  if (study.id === 'cubic') {
                    const v = document.querySelector('video');
                    if (v && v.src !== '/meme3.mp4') {
                      v.src = '/meme3.mp4';
                      v.play().catch(() => {});
                      return;
                    }
                  } else if (study.id === 'goodhairr-co-professional') {
                    const v = document.querySelector('video');
                    if (v && v.src !== '/liquid-chrome-logo-reveal.mp4') {
                      v.src = '/liquid-chrome-logo-reveal.mp4';
                      v.play().catch(() => {});
                      return;
                    }
                  } else if (study.id === 'ruru') {
                    const v = document.querySelector('video');
                    if (v && v.src !== '/our-reveal.mp4') {
                      v.src = '/our-reveal.mp4';
                      v.play().catch(() => {});
                      return;
                    }
                  } else if (study.id === 'showcase-extension-3') {
                    const v = document.querySelector('video');
                    if (v && v.src !== '/feature_video.mp4') {
                      v.src = '/feature_video.mp4';
                      v.play().catch(() => {});
                      return;
                    }
                  } else if (study.id === 'makimono') {
                    const v = document.querySelector('video');
                    if (v && v.src !== '/feature_video2.mp4') {
                      v.src = '/feature_video2.mp4';
                      v.play().catch(() => {});
                      return;
                    }
                  }
                  setHasError(true);
                }}
                className="w-full h-full object-cover"
              >
                {study.id === 'cubic' ? (
                  <>
                    <source
                      src="https://file.garden/aqpuSRZZW6ZbIllx/meme3.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="/meme3.mp4"
                      type="video/mp4"
                    />
                  </>
                ) : study.id === 'goodhairr-co-professional' ? (
                  <>
                    <source
                      src="https://file.garden/aqpuSRZZW6ZbIllx/Liquid_chrome_logo_reveal.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="/liquid-chrome-logo-reveal.mp4"
                      type="video/mp4"
                    />
                  </>
                ) : study.id === 'ruru' ? (
                  <>
                    <source
                      src="https://file.garden/aqpuSRZZW6ZbIllx/anshandco_logo.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="/our-reveal.mp4"
                      type="video/mp4"
                    />
                  </>
                ) : study.id === 'showcase-extension-3' ? (
                  <>
                    <source
                      src="https://file.garden/aqpuSRZZW6ZbIllx/feature_video.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="/feature_video.mp4"
                      type="video/mp4"
                    />
                  </>
                ) : study.id === 'makimono' ? (
                  <>
                    <source
                      src="https://file.garden/aqpuSRZZW6ZbIllx/feature_video2.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="/feature_video2.mp4"
                      type="video/mp4"
                    />
                  </>
                ) : (
                  <source src={study.mediaUrl} type="video/mp4" />
                )}
              </video>
              {/* Media Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={hasError ? study.posterUrl : study.mediaUrl}
              alt={study.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (study.id === 'showcase-extension-1') {
                  e.currentTarget.src = '/m1.jpg';
                } else if (study.id === 'roots-and-sky') {
                  e.currentTarget.src = '/meme1.jpg';
                } else if (study.id === 'otr-make-it-yours') {
                  e.currentTarget.src = '/meme2.jpg';
                } else {
                  e.currentTarget.src = `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80&sig=${study.fallbackSig}`;
                }
              }}
              className="w-full h-full object-contain bg-neutral-900"
            />
          )}
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-10 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#e38528]">
                {study.client}
              </span>
              <h2 className="text-[28px] md:text-[38px] font-light uppercase tracking-tight text-black mt-1">
                {study.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenContact) {
                  onOpenContact();
                }
              }}
              className="text-[12px] uppercase font-normal tracking-[0.15em] text-neutral-600 hover:text-[#e38528] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>anshandco.com</span>
              <ExternalLink size={14} />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[12px] font-light text-neutral-600 bg-neutral-100 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Narrative */}
          <p className="text-[15px] leading-[1.8] font-light text-neutral-700">
            {study.summary}
          </p>

          {/* Project Details Grid if available */}
          {study.fullDetails && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
              <div>
                <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  Key Deliverables
                </h4>
                <ul className="text-[13px] font-light text-neutral-600 flex flex-col gap-1.5">
                  {study.fullDetails.deliverables.map((deliv, idx) => (
                    <li key={idx}>· {deliv}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  Timeline
                </h4>
                <p className="text-[13px] font-light text-neutral-600">
                  {study.fullDetails.timeline}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 mb-2">
                  Outcome & Impact
                </h4>
                <p className="text-[13px] font-light text-neutral-600 leading-relaxed">
                  {study.fullDetails.impact}
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-black bg-black text-white text-[13px] uppercase tracking-wider hover:bg-transparent hover:text-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
