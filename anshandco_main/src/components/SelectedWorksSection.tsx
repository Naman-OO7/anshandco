import React, { useState, useRef, useEffect } from 'react';
import { CASE_STUDIES } from '../data/content';
import { CaseStudy } from '../types';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { AutoMockCarousel } from './AutoMockCarousel';

interface SelectedWorksSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onViewAll?: () => void;
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({
  onSelectCaseStudy,
  onViewAll
}) => {
  const [hoveredTopCard, setHoveredTopCard] = useState<number | null>(null);
  const [hoveredRow1Card, setHoveredRow1Card] = useState<number | null>(null);

  const rootsAndSky = CASE_STUDIES.find((c) => c.id === 'roots-and-sky')!;
  const otr = CASE_STUDIES.find((c) => c.id === 'otr-make-it-yours')!;
  const ruru = CASE_STUDIES.find((c) => c.id === 'ruru')!;
  const anshProfessional = CASE_STUDIES.find((c) => c.id === 'goodhairr-co-professional')!;
  const extension1 = CASE_STUDIES.find((c) => c.id === 'showcase-extension-1')!;
  const extension2 = CASE_STUDIES.find((c) => c.id === 'showcase-extension-2')!;
  const extension3 = CASE_STUDIES.find((c) => c.id === 'showcase-extension-3')!;
  const ourMocks = CASE_STUDIES.find((c) => c.id === 'our-mocks' || c.id === 'bharatiyam')!;
  const makimono = CASE_STUDIES.find((c) => c.id === 'makimono')!;
  const cubic = CASE_STUDIES.find((c) => c.id === 'cubic')!;

  return (
    <section id="selected-works" className="w-full max-w-[1440px] mx-auto py-16 md:py-24 px-6 md:px-16 bg-white border-t border-neutral-100">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16">
        <div className="flex flex-col items-start max-w-[700px]">
          <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4">
            [ SOMETHING LIGHT LIKE OUR THEME? ]
          </span>
          <p className="text-[14px] md:text-[15px] leading-[1.65] font-light text-neutral-600">
            Get a sneak peek, laugh together, and see what happens when serious creativity refuses to take itself too seriously.
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

      {/* Asymmetric Showcase Grid */}
      <div className="flex flex-col gap-16 md:gap-24">
        {/* TOP ROW: 3 Sections in 1 Horizontal Row with Interactive Focus/Dim Hover Feature (Height increased by 20%) */}
        <div 
          onMouseLeave={() => setHoveredTopCard(null)}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start"
        >
          {/* Card 1: Rectangular format with 20% increased height */}
          <div 
            onMouseEnter={() => setHoveredTopCard(0)}
            className={`col-span-1 md:col-span-4 flex flex-col transition-all duration-300 ease-out transform ${
              hoveredTopCard === 0
                ? 'opacity-100 scale-[1.02] -translate-y-1.5'
                : hoveredTopCard !== null
                ? 'opacity-25 scale-[0.98]'
                : 'opacity-100'
            }`}
          >
            <MediaCard study={extension1} onSelect={() => onSelectCaseStudy(extension1)} aspect="aspect-[2/3]" />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {extension1.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600 line-clamp-6">
              {extension1.summary}
            </p>
          </div>

          {/* Card 2: Automatic Carousel with 20% increased height */}
          <div 
            onMouseEnter={() => setHoveredTopCard(1)}
            className={`col-span-1 md:col-span-4 flex flex-col transition-all duration-300 ease-out transform ${
              hoveredTopCard === 1
                ? 'opacity-100 scale-[1.02] -translate-y-1.5'
                : hoveredTopCard !== null
                ? 'opacity-25 scale-[0.98]'
                : 'opacity-100'
            }`}
          >
            <AutoMockCarousel
              images={extension2.gallery || [
                'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg',
                'https://file.garden/aqpuSRZZW6ZbIllx/meme5.jpg',
                'https://file.garden/aqpuSRZZW6ZbIllx/m2.jpg',
                'https://file.garden/aqpuSRZZW6ZbIllx/m3.jpg'
              ]}
              aspect="aspect-[2/3]"
              onClick={() => onSelectCaseStudy(extension2)}
            />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {extension2.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600 line-clamp-6">
              {extension2.summary}
            </p>
          </div>

          {/* Card 3: Vertical Video Card with 20% increased height */}
          <div 
            onMouseEnter={() => setHoveredTopCard(2)}
            className={`col-span-1 md:col-span-4 flex flex-col transition-all duration-300 ease-out transform ${
              hoveredTopCard === 2
                ? 'opacity-100 scale-[1.02] -translate-y-1.5'
                : hoveredTopCard !== null
                ? 'opacity-25 scale-[0.98]'
                : 'opacity-100'
            }`}
          >
            <MediaCard study={extension3} onSelect={() => onSelectCaseStudy(extension3)} aspect="aspect-[2/3]" />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {extension3.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600">
              {extension3.summary}
            </p>
          </div>
        </div>

        {/* ROW 1: Roots & Sky / Market Mein Bhaukaal, OTR / Baccha Hai Tu Mera, RURU / OUR REVEAL with Interactive Focus/Dim Hover Feature */}
        <div 
          onMouseLeave={() => setHoveredRow1Card(null)}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start"
        >
          {/* Card 1: Roots and Sky */}
          <div 
            onMouseEnter={() => setHoveredRow1Card(0)}
            className={`col-span-1 md:col-span-3 flex flex-col transition-all duration-300 ease-out transform ${
              hoveredRow1Card === 0
                ? 'opacity-100 scale-[1.02] -translate-y-1.5'
                : hoveredRow1Card !== null
                ? 'opacity-25 scale-[0.98]'
                : 'opacity-100'
            }`}
          >
            <MediaCard study={rootsAndSky} onSelect={() => onSelectCaseStudy(rootsAndSky)} aspect="aspect-[9/14]" />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {rootsAndSky.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600 line-clamp-6">
              {rootsAndSky.summary}
            </p>
          </div>

          {/* Card 2: OTR Make It Yours */}
          <div 
            onMouseEnter={() => setHoveredRow1Card(1)}
            className={`col-span-1 md:col-span-3 flex flex-col transition-all duration-300 ease-out transform ${
              hoveredRow1Card === 1
                ? 'opacity-100 scale-[1.02] -translate-y-1.5'
                : hoveredRow1Card !== null
                ? 'opacity-25 scale-[0.98]'
                : 'opacity-100'
            }`}
          >
            <MediaCard study={otr} onSelect={() => onSelectCaseStudy(otr)} aspect="aspect-[9/14]" />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {otr.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600 line-clamp-6">
              {otr.summary}
            </p>
          </div>

          {/* Card 3: OUR REVEAL (Hero Video Card) */}
          <div 
            onMouseEnter={() => setHoveredRow1Card(2)}
            className={`col-span-1 md:col-span-6 flex flex-col transition-all duration-300 ease-out transform ${
              hoveredRow1Card === 2
                ? 'opacity-100 scale-[1.02] -translate-y-1.5'
                : hoveredRow1Card !== null
                ? 'opacity-25 scale-[0.98]'
                : 'opacity-100'
            }`}
          >
            <MediaCard study={ruru} onSelect={() => onSelectCaseStudy(ruru)} aspect="aspect-[4/3] md:aspect-[1.15/1]" />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {ruru.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600">
              {ruru.summary}
            </p>
          </div>
        </div>

        {/* ROW 2: ANSH&CO. Professional (Wide showcase) */}
        <div className="w-full flex flex-col">
          <MediaCard study={anshProfessional} onSelect={() => onSelectCaseStudy(anshProfessional)} aspect="aspect-[16/9] md:aspect-[21/9]" />
          <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-6 mb-2">
            {anshProfessional.title}
          </h3>
          <p className="text-[12px] leading-[1.7] font-light text-neutral-600 max-w-[900px]">
            {anshProfessional.summary}
          </p>
        </div>

        {/* ROW 3: OUR MOCKS (2 cols), Makimono (1 col), Cubic (1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start">
          {/* Card 4: OUR MOCKS */}
          <div className="col-span-1 md:col-span-6 flex flex-col">
            <AutoMockCarousel
              aspect="aspect-[4/3] md:aspect-[1.15/1]"
              onClick={() => onSelectCaseStudy(ourMocks)}
            />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {ourMocks.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600 line-clamp-6">
              {ourMocks.summary}
            </p>
          </div>

          {/* Card 5: Makimono */}
          <div className="col-span-1 md:col-span-3 flex flex-col">
            <MediaCard study={makimono} onSelect={() => onSelectCaseStudy(makimono)} aspect="aspect-[9/14]" />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {makimono.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600 line-clamp-6">
              {makimono.summary}
            </p>
          </div>

          {/* Card 6: Cubic / Meme 3 Video */}
          <div className="col-span-1 md:col-span-3 flex flex-col">
            <MediaCard study={cubic} onSelect={() => onSelectCaseStudy(cubic)} aspect="aspect-[9/14]" />
            <h3 className="text-[15px] font-medium tracking-wide uppercase text-black mt-4 mb-2">
              {cubic.title}
            </h3>
            <p className="text-[12px] leading-[1.7] font-light text-neutral-600 line-clamp-6">
              {cubic.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable responsive media card supporting video or image with hover action and fallbacks
interface MediaCardProps {
  study: CaseStudy;
  onSelect: () => void;
  aspect: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ study, onSelect, aspect }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || study.mediaType !== 'video') return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks autoplay with sound, enforce muted autoplay
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      video.pause();
    }
  }, [study.mediaUrl, isPlaying, study.mediaType]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative w-full ${aspect} bg-neutral-900 overflow-hidden cursor-pointer group select-none transition-all duration-300 ease-out transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/10`}
    >
      {study.mediaType === 'video' && !hasError ? (
        <>
          <video
            ref={videoRef}
            src={
              study.id === 'cubic'
                ? 'https://file.garden/aqpuSRZZW6ZbIllx/meme3.mp4'
                : study.id === 'goodhairr-co-professional'
                ? 'https://file.garden/aqpuSRZZW6ZbIllx/Liquid_chrome_logo_reveal.mp4'
                : study.id === 'showcase-extension-3'
                ? 'https://file.garden/aqpuSRZZW6ZbIllx/feature_video.mp4'
                : study.id === 'makimono'
                ? 'https://file.garden/aqpuSRZZW6ZbIllx/feature_video2.mp4'
                : study.mediaUrl
            }
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={study.posterUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={() => {
              if (videoRef.current) setIsMuted(videoRef.current.muted);
            }}
            onError={() => {
              // Graceful fallback to local cached files if remote connection is interrupted
              if (videoRef.current && study.id === 'cubic') {
                videoRef.current.src = '/meme3.mp4';
                videoRef.current.play().catch(() => {});
              } else if (videoRef.current && study.id === 'goodhairr-co-professional') {
                videoRef.current.src = '/liquid-chrome-logo-reveal.mp4';
                videoRef.current.play().catch(() => {});
              } else if (videoRef.current && study.id === 'ruru') {
                videoRef.current.src = '/our-reveal.mp4';
                videoRef.current.play().catch(() => {});
              } else if (videoRef.current && study.id === 'showcase-extension-3') {
                videoRef.current.src = '/feature_video.mp4';
                videoRef.current.play().catch(() => {});
              } else if (videoRef.current && study.id === 'makimono') {
                videoRef.current.src = '/feature_video2.mp4';
                videoRef.current.play().catch(() => {});
              } else {
                setHasError(true);
              }
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
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

          {/* Bottom-right interactive video controls: visible ONLY when hovering on the video card */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex items-center gap-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/85 hover:bg-black text-white backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title={isPlaying ? 'Stop / Pause video' : 'Play video'}
              aria-label={isPlaying ? 'Stop video' : 'Play video'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/85 hover:bg-black text-white backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title={isMuted ? 'Sound Off (Click to unmute)' : 'Sound On (Click to mute)'}
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? (
                <VolumeX size={15} className="text-neutral-300" />
              ) : (
                <Volume2 size={15} className="text-[#ea580c] animate-pulse" />
              )}
            </button>
          </div>
        </>
      ) : (
        <img
          src={hasError ? study.posterUrl : study.mediaUrl}
          alt={study.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (study.id === 'roots-and-sky') {
              e.currentTarget.src = '/meme1.jpg';
            } else if (study.id === 'otr-make-it-yours') {
              e.currentTarget.src = '/meme2.jpg';
            } else if (study.id === 'showcase-extension-1') {
              e.currentTarget.src = '/m1.jpg';
            } else if (!hasError) {
              setHasError(true);
            } else {
              e.currentTarget.src = `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80&sig=${study.fallbackSig}`;
            }
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
      )}

      {/* Subtle overlay on hover for image cards */}
      {study.mediaType === 'image' && (
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
            <Maximize2 size={16} />
          </div>
        </div>
      )}
    </div>
  );
};
