import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FAQSectionProps {
  onOpenContact?: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What does it mean that ANSH&CO is a 'Brand Custodian'?",
      answer: "Traditional agencies operate on transactional, short-term handoffs—delivering a brief or logo file and vanishing. As brand custodians, we act as long-term creative and technical stewards standing alongside founders. We actively protect your brand equity, ensure design fidelity across every digital and physical touchpoint, and scale your presence over years, not weeks."
    },
    {
      question: "What capabilities and disciplines do you handle in-house?",
      answer: "Every deliverable is crafted in-house by our multidisciplinary squads. We cover Brand Strategy & Visual Identity, Custom Full-Stack Web & Mobile Engineering (React, Next.js, Node), AI Solutions & Workflow Automation, Performance Ads (Meta & Google), Technical SEO, and Cinematic Video & Motion Production. Zero outsourced freelance handoffs guarantees aesthetic cohesion and high velocity."
    },
    {
      question: "How does a typical client engagement begin?",
      answer: "Every partnership begins with our Interrogation & Discovery phase. We immerse ourselves in your business economics, audience psychology, and competitive whitespace before drawing a single vector or committing code. From there, we architect a tailored strategic roadmap, clear deliverables matrix, and milestones aligned with your commercial growth."
    },
    {
      question: "Do you partner with early-stage startups or only enterprise brands?",
      answer: "We partner with visionary leaders across both spectrums. Whether you are an ambitious zero-to-one startup establishing category distinction, or a legacy enterprise (like Warner Bros. Discovery or sovereign cultural bodies like the Embassy of Switzerland) requiring comprehensive repositioning, we scale our focus to meet your ambitions."
    },
    {
      question: "How do you structure pricing and commercial partnerships?",
      answer: "We reject arbitrary hour-billing in favor of value-aligned partnership models. Depending on your roadmap, we offer dedicated monthly Brand Custodianship retainers for continuous execution and growth, or fixed-scope sprints for flagship brand identity overhauls, custom platforms, and product launches."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white dark:bg-[#080808] text-black dark:text-white py-20 md:py-28 px-6 md:px-16 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32">
            <span className="text-[12px] md:text-[13px] tracking-[0.25em] font-normal uppercase text-[#e38528] mb-4 block">
              [ A LITTLE MORE CLARITY ]
            </span>

            <h2 className="text-[48px] sm:text-[64px] lg:text-[76px] leading-[0.96] tracking-tight mb-8">
              <span className="font-extralight uppercase text-black dark:text-white block">Good</span>
              <span className="font-serif italic text-[#e38528] block lowercase">questions.</span>
            </h2>

            <p className="text-[15px] md:text-[16px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[420px] mb-8">
              Everything you need to know about partnering with ANSH&amp;CO as your brand custodians. Have an inquiry that isn't answered here?
            </p>

            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.2em] uppercase text-black dark:text-white hover:text-[#e38528] dark:hover:text-[#e38528] border-b border-black dark:border-white hover:border-[#e38528] dark:hover:border-[#e38528] pb-1 transition-colors cursor-pointer group"
              >
                <span>Speak With Leadership</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Right Column: Accordion Questions List (5 Items) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="transition-colors group">
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full py-6 md:py-7 flex items-center justify-between text-left gap-6 cursor-pointer"
                  >
                    <span
                      className={`text-[18px] sm:text-[20px] font-normal tracking-tight transition-colors duration-200 ${
                        isOpen ? 'text-[#e38528]' : 'text-black dark:text-white group-hover:text-[#e38528]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 p-2 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'border-[#e38528] text-[#e38528] rotate-180 bg-orange-50 dark:bg-orange-950/30'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white bg-neutral-50 dark:bg-neutral-900'
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {/* Expandable Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-[350px] opacity-100 pb-7' : 'max-h-0 opacity-0 pb-0'
                    }`}
                  >
                    <p className="text-[14px] sm:text-[15px] font-light text-neutral-600 dark:text-neutral-400 leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
