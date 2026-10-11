import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Code2, Bot, Layers, Brain, CheckCircle2, Upload, Camera, X } from 'lucide-react';
import { TeamMember } from '../types';
import { TEAM_MEMBERS } from '../data/team';

interface MemberPortfolioPageProps {
  memberId: string;
  onBack: () => void;
  onSelectMember: (id: string) => void;
  onOpenContact: () => void;
}

export const MemberPortfolioPage: React.FC<MemberPortfolioPageProps> = ({
  memberId,
  onBack,
  onSelectMember,
  onOpenContact
}) => {
  const member = TEAM_MEMBERS.find((m) => m.id === memberId || (memberId === 'member-07' && m.id === 'harpreet') || m.name.toLowerCase() === memberId?.toLowerCase()) || TEAM_MEMBERS[0];
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const directInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Load custom avatar from local storage if available
  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem(`ansh_avatar_${member.id}`);
      if (saved) {
        setCustomAvatar(saved);
      } else {
        setCustomAvatar(null);
      }
    };
    load();

    const handleSync = () => load();
    window.addEventListener('storage', handleSync);
    window.addEventListener('ansh-avatar-updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('ansh-avatar-updated', handleSync);
    };
  }, [member.id]);

  const currentIndex = TEAM_MEMBERS.findIndex((m) => m.id === member.id);
  const prevMember = TEAM_MEMBERS[(currentIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length];
  const nextMember = TEAM_MEMBERS[(currentIndex + 1) % TEAM_MEMBERS.length];

  const handleDirectFile = (file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setCustomAvatar(result);
        localStorage.setItem(`ansh_avatar_${member.id}`, result);
        window.dispatchEvent(new CustomEvent('ansh-avatar-updated', { detail: { memberId: member.id, dataUrl: result } }));
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleDirectFile(file);
  };

  const handleSaveImageUrl = () => {
    if (imageUrlInput.trim()) {
      const url = imageUrlInput.trim();
      setCustomAvatar(url);
      localStorage.setItem(`ansh_avatar_${member.id}`, url);
      window.dispatchEvent(new CustomEvent('ansh-avatar-updated', { detail: { memberId: member.id, dataUrl: url } }));
      setShowImageModal(false);
      setImageUrlInput('');
    }
  };

  const handleResetImage = () => {
    localStorage.removeItem(`ansh_avatar_${member.id}`);
    setCustomAvatar(null);
    window.dispatchEvent(new CustomEvent('ansh-avatar-updated', { detail: { memberId: member.id } }));
    setShowImageModal(false);
  };

  const displayAvatar = customAvatar || member.avatarUrl;

  return (
    <div className="w-full min-h-screen bg-white text-black selection:bg-orange-500 selection:text-white pt-[100px] pb-24">
      {/* Top Floating Control Bar */}
      <div className="sticky top-[80px] z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-3 px-6 md:px-16">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-widest font-mono text-neutral-600 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Who We Are</span>
          </button>

          {/* Quick Roster Selector */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400 mr-2 uppercase">Guild Member:</span>
            {TEAM_MEMBERS.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectMember(m.id)}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  m.id === member.id
                    ? 'border-black bg-black text-white'
                    : 'border-transparent text-neutral-500 hover:text-black hover:border-neutral-300'
                }`}
              >
                {m.number} {m.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowImageModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 hover:border-black text-[11px] font-mono uppercase tracking-wider text-neutral-700 hover:text-black transition-colors cursor-pointer rounded-full"
              title="Change or upload portrait photo"
            >
              <Camera size={13} className="text-[#e38528]" />
              <span className="hidden sm:inline">Set Photo</span>
            </button>
            <button
              onClick={onOpenContact}
              className="px-4 py-1.5 bg-[#e38528] text-white hover:bg-[#d0751e] text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer rounded-full"
            >
              Collaborate
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-10">
        {/* Section 1: Editorial Header / Case Study Opening */}
        <div className="border-b border-neutral-200 pb-16 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-black text-white text-[12px] font-mono tracking-widest uppercase">
                GUILD MEMBER [{member.number} / 07]
              </span>
              <span className="text-[12px] font-mono tracking-widest uppercase text-[#e38528]">
                {member.category}
              </span>
            </div>
          </div>

          <h1 className="text-[44px] sm:text-[68px] md:text-[90px] lg:text-[104px] leading-[0.92] font-extralight uppercase text-black tracking-tight mb-6">
            {member.name}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-[760px]">
              <span className="text-[14px] md:text-[16px] font-mono tracking-widest uppercase text-[#e38528] block mb-2">
                {member.creativeRole}
              </span>
              <p className="text-[20px] md:text-[26px] font-light text-neutral-800 leading-snug">
                {member.role}
              </p>
              <p className="text-[15px] md:text-[17px] font-light text-neutral-600 mt-4 leading-relaxed">
                {member.tagline}
              </p>
            </div>

            {/* Quick Metrics Pillar */}
            <div className="grid grid-cols-2 gap-4 border-l-0 md:border-l border-neutral-200 md:pl-8 min-w-[260px]">
              {member.portfolio.stats.map((stat, i) => (
                <div key={i} className="p-3 bg-neutral-50 border border-neutral-200">
                  <span className="text-[20px] md:text-[24px] font-bold tracking-tight text-black block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Visual Portrait + Core Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pb-16 border-b border-neutral-200">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 border border-neutral-300">
              {displayAvatar ? (
                <>
                  <img
                    src={displayAvatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[11px] font-mono tracking-widest text-[#e38528] uppercase block mb-1">
                      ANSH&amp;CO. RESIDENT CRAFTSMAN
                    </span>
                    <span className="text-[22px] font-medium uppercase tracking-tight block">
                      {member.name}
                    </span>
                    <span className="text-[12px] text-neutral-300 font-mono block">
                      {member.creativeRole}
                    </span>
                  </div>
                </>
              ) : (
                /* Editorial Card when Photo is Pending */
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
                    if (file) handleDirectFile(file);
                  }}
                  className={`w-full h-full flex flex-col justify-between p-6 transition-all ${
                    isDragging
                      ? 'border-2 border-[#e38528] bg-orange-950/40 text-white'
                      : 'bg-neutral-950 text-neutral-300'
                  }`}
                >
                  <div className="my-auto text-center py-6">
                    <div className="w-20 h-20 mx-auto mb-4 border border-[#e38528]/40 bg-neutral-900/80 flex items-center justify-center">
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

                  <div className="pt-4 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 text-center uppercase tracking-wider">
                    {member.creativeRole}
                  </div>
                </div>
              )}

              {/* Hidden direct file input */}
              <input
                ref={directInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Philosophy & Overview Column */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
            <div className="p-8 md:p-10 bg-neutral-900 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-[#e38528]" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#e38528]">
                  CORE CRAFT PHILOSOPHY
                </span>
              </div>
              <blockquote className="text-[22px] md:text-[28px] font-light leading-snug tracking-tight mb-6">
                &ldquo;{member.portfolio.heroStatement}&rdquo;
              </blockquote>
              <p className="text-[14px] md:text-[15px] text-neutral-300 font-light leading-relaxed">
                {member.portfolio.creativePhilosophy}
              </p>
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between text-[12px] font-mono text-neutral-400">
                <span>MANIFETSO LAW:</span>
                <span className="text-white italic">&ldquo;{member.portfolio.quote}&rdquo;</span>
              </div>
            </div>

            {/* In-depth Bio */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] block mb-2">
                OVERVIEW &amp; PROFILE
              </span>
              <h3 className="text-[24px] md:text-[28px] font-light uppercase tracking-tight text-black mb-4">
                How {member.name} Builds &amp; Deploys
              </h3>
              <p className="text-[15px] md:text-[16px] text-neutral-700 font-light leading-relaxed mb-6">
                {member.bio}
              </p>
            </div>

            {/* Core Expertise Showcase */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] block mb-3">
                DEPLOYED EXPERTISE &amp; DOMAINS
              </span>
              <div className="flex flex-wrap gap-2.5">
                {member.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-black text-[12px] font-mono uppercase tracking-wider border border-neutral-300 transition-colors"
                  >
                    + {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Arsenal & Skill Matrix */}
        <div className="mb-20 pb-16 border-b border-neutral-200">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-mono tracking-widest uppercase text-[#e38528] block mb-1">
                SYSTEM ARSENAL
              </span>
              <h2 className="text-[32px] md:text-[44px] font-light uppercase tracking-tight text-black">
                Mastered Technologies &amp; Frameworks
              </h2>
            </div>
            <p className="text-[13px] text-neutral-500 font-mono max-w-[420px]">
              Production-grade execution powered by modern engineering tools, autonomous AI engines, and cognitive workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {member.portfolio.technologies.map((group, idx) => (
              <div key={idx} className="p-6 border border-neutral-200 hover:border-black bg-white transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#e38528]">
                    {idx === 0 ? <Code2 size={18} /> : idx === 1 ? <Bot size={18} /> : idx === 2 ? <Layers size={18} /> : <Brain size={18} />}
                    <span className="text-[11px] font-mono text-neutral-400">STACK 0{idx + 1}</span>
                  </div>
                  <h4 className="text-[16px] font-medium uppercase tracking-tight text-black mb-4">
                    {group.category}
                  </h4>
                  <ul className="space-y-2">
                    {group.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-[13px] text-neutral-600 font-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#e38528] rounded-full" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Featured Systems & Works */}
        <div className="mb-20 pb-16 border-b border-neutral-200">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-mono tracking-widest uppercase text-[#e38528] block mb-1">
                SELECTED SYSTEMS &amp; PRODUCTION WORKS
              </span>
              <h2 className="text-[32px] md:text-[44px] font-light uppercase tracking-tight text-black">
                Tangible Execution &amp; Impact
              </h2>
            </div>
            <p className="text-[14px] text-neutral-600 font-light max-w-[460px]">
              Every system is engineered for longevity, extreme performance, and measurable transformation.
            </p>
          </div>

          <div className="space-y-16">
            {member.portfolio.featuredWork.map((work, idx) => (
              <div
                key={work.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-neutral-200 p-8 md:p-12 hover:border-black transition-colors"
              >
                {/* Media Side */}
                {work.mediaUrl && (
                  <div className="lg:col-span-6 order-2 lg:order-1 overflow-hidden bg-neutral-900 border border-neutral-200 aspect-[16/10]">
                    <img
                      src={work.mediaUrl}
                      alt={work.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 hover:scale-105"
                    />
                  </div>
                )}

                {/* Details Side */}
                <div className={`${work.mediaUrl ? 'lg:col-span-6' : 'lg:col-span-12'} order-1 lg:order-2 space-y-4`}>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528]">
                      [ CASE 0{idx + 1} ]
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase">
                      {work.category}
                    </span>
                  </div>

                  <h3 className="text-[26px] md:text-[34px] font-light uppercase tracking-tight text-black">
                    {work.title}
                  </h3>

                  <p className="text-[14px] md:text-[15px] text-neutral-600 font-light leading-relaxed">
                    {work.description}
                  </p>

                  <div className="p-4 bg-neutral-50 border-l-2 border-[#e38528]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      MEASURED IMPACT
                    </span>
                    <p className="text-[14px] font-medium text-black">
                      {work.impact}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                      CORE DELIVERABLES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {work.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="text-[12px] font-light text-neutral-700 flex items-center gap-1.5">
                          <span className="text-[#e38528]">✓</span>
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2">
                    {work.tags.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-mono uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Concrete Deliverables Checklist */}
        <div className="mb-20 p-8 md:p-12 bg-neutral-900 text-white">
          <div className="max-w-[1000px] mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#e38528] block mb-2">
              WHAT {member.name} DELIVERS FOR PARTNERS
            </span>
            <h2 className="text-[28px] md:text-[38px] font-light uppercase tracking-tight text-white">
              End-to-End Capabilities &amp; System Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {member.portfolio.deliverables.map((item, idx) => (
              <div key={idx} className="p-4 border border-white/20 flex items-start gap-3">
                <span className="text-[#e38528] font-mono text-[13px] mt-0.5">0{idx + 1}.</span>
                <span className="text-[14px] md:text-[15px] font-light text-neutral-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Next Member Navigation (Endless Roster Loop) */}
        <div className="border-t border-neutral-200 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <button
            onClick={() => onSelectMember(prevMember.id)}
            className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">PREVIOUS MEMBER</span>
              <span className="text-[14px] font-medium uppercase tracking-tight">{prevMember.number} {prevMember.name}</span>
            </div>
          </button>

          <button
            onClick={onOpenContact}
            className="px-8 py-3 rounded-full bg-black text-white hover:bg-[#e38528] text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer"
          >
            Work with {member.name} &amp; ANSH&amp;CO.
          </button>

          <button
            onClick={() => onSelectMember(nextMember.id)}
            className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors cursor-pointer group text-right"
          >
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">NEXT MEMBER</span>
              <span className="text-[14px] font-medium uppercase tracking-tight">{nextMember.number} {nextMember.name}</span>
            </div>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modal to Upload or Change Portrait Image */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white max-w-[500px] w-full p-6 border border-neutral-300 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-[20px] font-medium uppercase tracking-tight mb-2">
              Set Portrait Image for {member.name}
            </h3>
            <p className="text-[13px] text-neutral-600 mb-6 font-light">
              Upload your photo directly from your device or paste an image URL.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                  Option 1: Upload Image File (PNG, JPG, WebP)
                </label>
                <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-neutral-300 hover:border-black rounded cursor-pointer transition-colors">
                  <Upload size={18} className="text-[#e38528]" />
                  <span className="text-[13px] font-medium">Choose file from computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="pt-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                  Option 2: Paste Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/portrait.jpg"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-neutral-300 text-[13px] focus:outline-none focus:border-black"
                  />
                  <button
                    onClick={handleSaveImageUrl}
                    className="px-4 py-2 bg-black text-white text-[12px] font-mono uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {customAvatar && (
                <div className="pt-2">
                  <button
                    onClick={handleResetImage}
                    className="text-[11px] font-mono text-red-600 hover:underline uppercase cursor-pointer"
                  >
                    Reset to default portrait
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 border border-neutral-300 text-[12px] font-mono uppercase hover:bg-neutral-100 transition-colors cursor-pointer"
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
