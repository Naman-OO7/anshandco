import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink, Sparkles, CheckCircle2, Camera, Upload, X, RefreshCw, Check } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/team';
import { TeamMember } from '../types';

interface WhoWeArePageProps {
  onOpenContact: () => void;
  onSelectMember?: (memberId: string) => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = ({
  onOpenContact,
  onSelectMember
}) => {
  const [customAvatars, setCustomAvatars] = useState<Record<string, string>>({});
  const [modalMember, setModalMember] = useState<TeamMember | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [draggingMemberId, setDraggingMemberId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadAvatars = () => {
    const avatars: Record<string, string> = {};
    TEAM_MEMBERS.forEach((m) => {
      const saved = localStorage.getItem(`ansh_avatar_${m.id}`);
      if (saved) {
        avatars[m.id] = saved;
      }
    });
    setCustomAvatars(avatars);
  };

  useEffect(() => {
    loadAvatars();

    const handleSync = () => {
      loadAvatars();
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('ansh-avatar-updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('ansh-avatar-updated', handleSync);
    };
  }, []);

  const saveAvatar = (memberId: string, dataUrl: string) => {
    localStorage.setItem(`ansh_avatar_${memberId}`, dataUrl);
    setCustomAvatars((prev) => ({ ...prev, [memberId]: dataUrl }));
    window.dispatchEvent(new CustomEvent('ansh-avatar-updated', { detail: { memberId, dataUrl } }));
    setModalMember(null);
    setUrlInput('');
  };

  const handleDirectFileUpload = (memberId: string, file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        saveAvatar(memberId, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (file?: File) => {
    if (!file || !modalMember) return;
    handleDirectFileUpload(modalMember.id, file);
  };

  const handleResetAvatar = (memberId: string) => {
    localStorage.removeItem(`ansh_avatar_${memberId}`);
    setCustomAvatars((prev) => {
      const copy = { ...prev };
      delete copy[memberId];
      return copy;
    });
    window.dispatchEvent(new CustomEvent('ansh-avatar-updated', { detail: { memberId } }));
    setModalMember(null);
  };

  const handleMemberClick = (memberId: string, e: React.MouseEvent) => {
    // If user holds Ctrl / Cmd or explicitly wants new tab
    if (e.metaKey || e.ctrlKey) {
      window.open(`?portfolio=${memberId}`, '_blank');
      return;
    }
    if (onSelectMember) {
      onSelectMember(memberId);
    } else {
      window.open(`?portfolio=${memberId}`, '_blank');
    }
  };

  return (
    <div className="w-full pt-[120px] pb-24 px-6 md:px-16 max-w-[1440px] mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="max-w-[1000px] mb-20">
        <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4 block">
          [ WHO WE ARE? ]
        </span>
        <h1 className="text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[0.98] font-extralight uppercase text-black tracking-tight mb-8">
          THINKERS, CRAFTSMEN &amp; <br />
          <span className="font-normal">CULTURE SHAPERS</span>
        </h1>
        <p className="text-[18px] md:text-[22px] font-light text-neutral-600 leading-relaxed max-w-[780px]">
          We are a tightly-knit guild of designers, writers, technologists, and strategists obsessed with the conviction that high-level creative taste changes everything.
        </p>
      </div>

      {/* CORE GUILD ROSTER SECTION (7 PEOPLE) */}
      <div className="mb-24">
        <div className="mb-12 pb-4 border-b border-neutral-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-mono tracking-widest text-[#e38528] uppercase">
                [ WHO WORKS IN OUR COMPANY ]
              </span>
              <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 text-[10px] font-mono uppercase border border-neutral-200">
                7 Core Specialists
              </span>
            </div>
            <h2 className="text-[32px] md:text-[46px] font-light uppercase tracking-tight text-black">
              The Resident Guild &amp; Specialists
            </h2>
          </div>
          <p className="text-[14px] text-neutral-600 font-light max-w-[460px]">
            Seven distinct pillars of mastery. Click on any member portrait to inspect their in-depth portfolio, case studies, and engineering architecture.
          </p>
        </div>

        {/* All 7 Member Slots laid vertically in identical editorial card format */}
        <div className="space-y-12">
          {TEAM_MEMBERS.map((member) => {
            const avatar = customAvatars[member.id] || member.avatarUrl;
            const isCardDragging = draggingMemberId === member.id;

            return (
              <div
                key={member.id}
                className="group border-2 border-black p-6 md:p-10 bg-neutral-50/50 transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Portrait Column */}
                  <div className="lg:col-span-5 relative group/portrait overflow-hidden bg-neutral-950 border border-neutral-300 aspect-[3/4] max-w-[420px] mx-auto lg:mx-0 w-full transition-all duration-300 ease-out transform group-hover:shadow-lg">
                    {avatar ? (
                      <a
                        href={`?portfolio=${member.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey && onSelectMember) {
                            e.preventDefault();
                            onSelectMember(member.id);
                          }
                        }}
                        className="block w-full h-full cursor-pointer relative"
                      >
                        <img
                          src={avatar}
                          alt={member.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-[20px] font-medium uppercase tracking-tight block">
                            {member.name}
                          </span>
                        </div>
                      </a>
                    ) : (
                      /* Clean Editorial Card when photo is not yet provided */
                      <a
                        href={`?portfolio=${member.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey && onSelectMember) {
                            e.preventDefault();
                            onSelectMember(member.id);
                          }
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDraggingMemberId(member.id);
                        }}
                        onDragLeave={() => setDraggingMemberId(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDraggingMemberId(null);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleDirectFileUpload(member.id, file);
                        }}
                        className={`block w-full h-full p-6 transition-all relative flex flex-col justify-center items-center cursor-pointer group/card ${
                          isCardDragging
                            ? 'border-2 border-[#e38528] bg-orange-950/40 text-white'
                            : 'bg-neutral-950 text-neutral-300'
                        }`}
                      >
                        <div className="text-center py-6">
                          <div className="w-20 h-20 mx-auto mb-4 border border-[#e38528]/40 bg-neutral-900/80 flex items-center justify-center group-hover/card:border-[#e38528] transition-colors">
                            <span className="text-[32px] font-serif font-light text-[#e38528] tracking-widest">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <h4 className="text-[22px] font-medium uppercase tracking-tight text-white mb-1">
                            {member.name}
                          </h4>
                          <p className="text-[12px] font-mono text-[#e38528] uppercase tracking-wider">
                            {member.role}
                          </p>
                        </div>
                      </a>
                    )}

                    {/* Camera Button to upload / replace photo */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalMember(member);
                      }}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-black/80 hover:bg-[#e38528] text-white cursor-pointer border border-white/20 shadow-lg"
                      title={`Upload or update photo for ${member.name}`}
                    >
                      <Camera size={14} />
                    </button>
                  </div>

                  {/* Details Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-[13px] font-mono uppercase tracking-widest text-[#e38528] block mb-1">
                        {member.creativeRole}
                      </span>
                      <h3 className="text-[34px] md:text-[44px] font-extralight uppercase tracking-tight text-black">
                        {member.name}
                      </h3>
                      <p className="text-[18px] md:text-[20px] font-normal text-neutral-800 mt-1">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-[14px] md:text-[15px] text-neutral-600 font-light leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise Badges */}
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                        CORE SPECIALIST EXPERTISE:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((exp, idx) => {
                          const desc = member.expertiseDescriptions?.[exp];
                          return (
                            <span
                              key={idx}
                              title={desc ? `${exp} – ${desc}` : exp}
                              className="px-3 py-1.5 bg-white text-black border border-neutral-300 text-[11px] font-mono uppercase tracking-wider hover:border-black transition-colors"
                            >
                              + {exp}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership & Location Bottom Note */}
      <div className="p-10 border-t border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h4 className="text-[16px] font-medium uppercase text-black">
            ANSH&amp;CO Studio Headquarters
          </h4>
          <p className="text-[13px] text-neutral-600 font-light mt-1">
            Aman Vihar, Dhreadun, Uttarakhand, India. · Direct inquiries:{' '}
            <a href="mailto:contact@anshandco.com" className="font-normal text-black underline hover:text-[#e38528] transition-colors">
              contact@anshandco.com
            </a>{' '}
            · Serving global brands worldwide.
          </p>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-2.5 rounded-full border border-black bg-black text-white text-[13px] font-light hover:bg-transparent hover:text-black transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          Get in Touch With Leadership
        </button>
      </div>

      {/* Photo Upload / Replacement Modal */}
      {modalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-2 border-black max-w-lg w-full p-6 md:p-8 relative shadow-2xl">
            <button
              onClick={() => {
                setModalMember(null);
                setUrlInput('');
              }}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-black cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] block mb-1">
                [ PORTRAIT CUSTOMIZATION · SLOT {modalMember.number} ]
              </span>
              <h3 className="text-[24px] font-light uppercase tracking-tight text-black">
                Update {modalMember.name}'s Photo
              </h3>
              <p className="text-[13px] text-neutral-600 font-light mt-1">
                Upload your picture file, drop an image here, or paste an image URL.
              </p>
            </div>

            {/* Current / Active Preview */}
            <div className="flex items-center gap-4 p-3 bg-neutral-50 border border-neutral-200 mb-6">
              <div className="w-16 h-20 bg-neutral-900 overflow-hidden flex-shrink-0 border border-neutral-300">
                <img
                  src={customAvatars[modalMember.id] || modalMember.avatarUrl}
                  alt={modalMember.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left text-xs">
                <span className="font-mono text-[11px] text-neutral-500 block uppercase">Current Portrait</span>
                <span className="font-medium text-neutral-900 block mt-0.5">
                  {customAvatars[modalMember.id] ? 'Custom Photo Active' : 'Default Preset Photo'}
                </span>
                {customAvatars[modalMember.id] && (
                  <button
                    onClick={() => handleResetAvatar(modalMember.id)}
                    className="mt-1 text-[11px] font-mono text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw size={11} /> Reset to Default
                  </button>
                )}
              </div>
            </div>

            {/* Drag & Drop / File Input Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileUpload(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors mb-6 ${
                isDragging
                  ? 'border-[#e38528] bg-orange-50/50'
                  : 'border-neutral-300 hover:border-black bg-neutral-50/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
              <Upload size={28} className="mx-auto mb-2 text-neutral-500" />
              <p className="text-[13px] font-medium text-neutral-800 uppercase tracking-wider">
                Click to browse or drop photo here
              </p>
              <p className="text-[11px] font-mono text-neutral-500 mt-1">
                Select any JPG, PNG, or WEBP image
              </p>
            </div>

            {/* Or Paste URL */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 block">
                Or enter image URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/photo.png"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-neutral-300 text-xs font-mono focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (urlInput.trim()) {
                      saveAvatar(modalMember.id, urlInput.trim());
                    }
                  }}
                  className="px-4 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-[#e38528] transition-colors cursor-pointer"
                >
                  Save URL
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setModalMember(null);
                  setUrlInput('');
                }}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
