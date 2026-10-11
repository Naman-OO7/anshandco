import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CLIENT_PARTNERS, CASE_STUDIES, NEWS_UPDATES } from '../data/content';
import { CaseStudy, NewsUpdate } from '../types';

interface ViewAllDrawerProps {
  isOpen: boolean;
  initialTab?: 'works' | 'clients' | 'news';
  onClose: () => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onSelectNews: (news: NewsUpdate) => void;
}

export const ViewAllDrawer: React.FC<ViewAllDrawerProps> = ({
  isOpen,
  initialTab = 'works',
  onClose,
  onSelectCaseStudy,
  onSelectNews
}) => {
  const [tab, setTab] = useState<'works' | 'clients' | 'news'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[1080px] bg-white text-black p-8 md:p-12 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black transition-colors"
          aria-label="Close drawer"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <span className="text-[12px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-2 block">
            [ DIRECTORY ARCHIVE ]
          </span>
          <div className="flex items-center gap-6 mt-4 border-b border-neutral-200 pb-3">
            <button
              onClick={() => setTab('works')}
              className={`text-[14px] uppercase tracking-wider pb-2 font-medium cursor-pointer transition-colors relative ${
                tab === 'works'
                  ? 'text-black border-b-2 border-black -mb-[14px]'
                  : 'text-neutral-400 hover:text-black'
              }`}
            >
              Case Studies ({CASE_STUDIES.length})
            </button>
            <button
              onClick={() => setTab('clients')}
              className={`text-[14px] uppercase tracking-wider pb-2 font-medium cursor-pointer transition-colors relative ${
                tab === 'clients'
                  ? 'text-black border-b-2 border-black -mb-[14px]'
                  : 'text-neutral-400 hover:text-black'
              }`}
            >
              Client Partners ({CLIENT_PARTNERS.length})
            </button>
            <button
              onClick={() => setTab('news')}
              className={`text-[14px] uppercase tracking-wider pb-2 font-medium cursor-pointer transition-colors relative ${
                tab === 'news'
                  ? 'text-black border-b-2 border-black -mb-[14px]'
                  : 'text-neutral-400 hover:text-black'
              }`}
            >
              News & Updates ({NEWS_UPDATES.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Works */}
        {tab === 'works' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                onClick={() => {
                  onClose();
                  onSelectCaseStudy(study);
                }}
                className="border border-neutral-200 p-4 hover:border-black transition-colors cursor-pointer group"
              >
                <div className="w-full aspect-video bg-neutral-100 overflow-hidden mb-3">
                  <img
                    src={study.posterUrl}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <span className="text-[11px] text-[#e38528] uppercase font-medium">
                  {study.client}
                </span>
                <h4 className="text-[16px] font-medium text-black mt-1 mb-2">
                  {study.title}
                </h4>
                <p className="text-[12px] text-neutral-600 line-clamp-3 font-light">
                  {study.summary}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Clients */}
        {tab === 'clients' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_PARTNERS.map((client) => (
              <div key={client.id} className="border border-neutral-200 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#e38528] font-medium">
                    {client.category}
                  </span>
                  <h4 className="text-[20px] font-semibold text-black mt-1 mb-3">
                    {client.name}
                  </h4>
                  <p className="text-[13px] text-neutral-600 font-light leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: News */}
        {tab === 'news' && (
          <div className="flex flex-col gap-4">
            {NEWS_UPDATES.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  onSelectNews(item);
                }}
                className="border border-neutral-200 p-5 hover:border-black transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[11px] uppercase text-[#e38528] font-medium">
                    {item.category} · {item.date}
                  </span>
                  <h4 className="text-[18px] font-medium text-black mt-1">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-neutral-600 font-light mt-1 max-w-[700px]">
                    {item.summary}
                  </p>
                </div>
                <span className="text-[12px] uppercase tracking-wider text-black border-b border-black pb-0.5 whitespace-nowrap self-start md:self-center">
                  Read Article
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
