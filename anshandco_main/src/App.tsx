/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageRoute } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { KineticManifesto } from './components/KineticManifesto';
import { BrandReelDivider } from './components/BrandReelDivider';
import { MissionSection } from './components/MissionSection';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { WorkWithUsCTA } from './components/WorkWithUsCTA';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';

import { WhatWeArePage } from './pages/WhatWeArePage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { WhatWeProvidePage } from './pages/WhatWeProvidePage';
import { WhoTrustUsPage } from './pages/WhoTrustUsPage';
import { MemberPortfolioPage } from './pages/MemberPortfolioPage';

import { ContactModal } from './components/ContactModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { NewsModal } from './components/NewsModal';
import { ViewAllDrawer } from './components/ViewAllDrawer';

import { CaseStudy, NewsUpdate, ClientPartner } from './types';
import { CASE_STUDIES } from './data/content';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsUpdate | null>(null);
  const [viewAllDrawerOpen, setViewAllDrawerOpen] = useState(false);
  const [viewAllTab, setViewAllTab] = useState<'works' | 'clients' | 'news'>('works');

  // Check URL parameter for ?portfolio=... or ?member=... (e.g. when opened in a new tab)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const portfolioParam = params.get('portfolio') || params.get('member');
    if (portfolioParam) {
      setSelectedMemberId(portfolioParam);
      setCurrentPage('who-we-are');
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigatePage = (page: PageRoute) => {
    setSelectedMemberId(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenViewAll = (tab: 'works' | 'clients' | 'news') => {
    setViewAllTab(tab);
    setViewAllDrawerOpen(true);
  };

  const handleSelectClient = (client: ClientPartner) => {
    handleOpenViewAll('clients');
  };

  // Keyboard navigation event listener
  useEffect(() => {
    const HOME_SECTIONS = [
      'hero-section',
      'manifesto-section',
      'reel-section',
      'mission-section',
      'selected-works-section',
      'capabilities-section',
      'cta-section',
      'footer-section'
    ];
    const NAV_PAGES: PageRoute[] = ['home', 'what-we-are', 'who-we-are', 'what-we-provide', 'who-trust-us'];

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. ESC key: closes any open modal or drawer
      if (e.key === 'Escape') {
        if (contactOpen) {
          setContactOpen(false);
          return;
        }
        if (selectedCaseStudy) {
          setSelectedCaseStudy(null);
          return;
        }
        if (selectedNews) {
          setSelectedNews(null);
          return;
        }
        if (viewAllDrawerOpen) {
          setViewAllDrawerOpen(false);
          return;
        }
        if (selectedMemberId) {
          setSelectedMemberId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        return;
      }

      // Ignore if user is currently typing in an input, textarea, or select
      const activeEl = document.activeElement as HTMLElement | null;
      if (activeEl) {
        const tagName = activeEl.tagName;
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || activeEl.isContentEditable) {
          return;
        }
      }

      // If a modal is open, allow in-modal navigation and prevent page scroll
      const isAnyModalOpen = contactOpen || !!selectedCaseStudy || !!selectedNews || viewAllDrawerOpen;
      if (isAnyModalOpen) {
        if (selectedCaseStudy && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
          e.preventDefault();
          const allStudies = CASE_STUDIES;
          const currentIdx = allStudies.findIndex((s) => s.id === selectedCaseStudy.id);
          if (currentIdx !== -1) {
            const delta = e.key === 'ArrowRight' ? 1 : -1;
            const nextIdx = (currentIdx + delta + allStudies.length) % allStudies.length;
            setSelectedCaseStudy(allStudies[nextIdx]);
          }
        }
        return;
      }

      // 2. Main Page Navigation: ArrowLeft and ArrowRight
      if (e.key === 'ArrowRight' && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const currentIdx = NAV_PAGES.indexOf(currentPage);
        if (currentIdx !== -1) {
          const nextIdx = (currentIdx + 1) % NAV_PAGES.length;
          handleNavigatePage(NAV_PAGES[nextIdx]);
        }
        return;
      }

      if (e.key === 'ArrowLeft' && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const currentIdx = NAV_PAGES.indexOf(currentPage);
        if (currentIdx !== -1) {
          const prevIdx = (currentIdx - 1 + NAV_PAGES.length) % NAV_PAGES.length;
          handleNavigatePage(NAV_PAGES[prevIdx]);
        }
        return;
      }

      // 3. Section Navigation: ArrowDown, ArrowUp, Spacebar
      const isDownKey = e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey) || e.key === 'PageDown';
      const isUpKey = e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey) || e.key === 'PageUp';

      if (isDownKey || isUpKey) {
        e.preventDefault();

        if (currentPage === 'home') {
          const scrollY = window.scrollY;
          const sectionElements = HOME_SECTIONS.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return { id, top: rect.top + scrollY };
          }).filter(Boolean) as { id: string; top: number }[];

          if (isDownKey) {
            // Find next section below current view
            const nextSec = sectionElements.find((s) => s.top > scrollY + 80);
            if (nextSec) {
              window.scrollTo({ top: Math.max(0, nextSec.top - 80), behavior: 'smooth' });
            } else {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
          } else {
            // Find previous section above current view
            const prevSections = sectionElements.filter((s) => s.top < scrollY - 80);
            const prevSec = prevSections[prevSections.length - 1];
            if (prevSec) {
              window.scrollTo({ top: Math.max(0, prevSec.top - 80), behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        } else {
          // On other pages, smoothly scroll through content blocks
          const step = window.innerHeight * 0.75;
          window.scrollBy({
            top: isDownKey ? step : -step,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentPage,
    contactOpen,
    selectedCaseStudy,
    selectedNews,
    viewAllDrawerOpen,
    selectedMemberId
  ]);

  return (
    <div className="relative min-h-screen bg-white text-black font-sans selection:bg-orange-500 selection:text-white">
      {/* Global Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenContact={() => setContactOpen(true)}
      />

      <main className="w-full flex flex-col">
        {currentPage === 'home' && (
          <>
            {/* Section 2: Hero Video & Custom Cursor Area (Initial Mount Hero Entrance) */}
            <div id="hero-section">
              <HeroVideo />
            </div>

            {/* Section 3: Kinetic Typographic Manifesto [ PURPOSE + HUMAN + CREATIVE ] */}
            <ScrollReveal id="manifesto-section" direction="up" distance={32} duration={850}>
              <KineticManifesto onKnowMore={() => handleNavigatePage('what-we-provide')} />
            </ScrollReveal>

            {/* Section 4: Brand Reel Transition (Fluid Ribbon) */}
            <ScrollReveal id="reel-section" direction="up" distance={36} duration={850}>
              <BrandReelDivider />
            </ScrollReveal>

            {/* Section 5: Brand Mission Statement & Kinetic Logo (WE HELP BUILD BRANDS) */}
            <ScrollReveal id="mission-section" direction="up" distance={36} duration={850}>
              <MissionSection onKnowMore={() => handleNavigatePage('what-we-provide')} />
            </ScrollReveal>

            {/* Section 6: Selected Works / Portfolio Showcase [ SOMETHING LIGHT LIKE OUR THEME? ] */}
            <ScrollReveal id="selected-works-section" direction="up" distance={40} duration={900}>
              <SelectedWorksSection
                onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
                onViewAll={() => handleOpenViewAll('works')}
              />
            </ScrollReveal>

            {/* Section 8: Capabilities & FAQ Accordion [ SERVICES & GOOD QUESTIONS ] */}
            <ScrollReveal id="capabilities-section" direction="up" distance={36} duration={850}>
              <CapabilitiesSection
                onKnowMore={() => handleNavigatePage('what-we-provide')}
                onOpenContact={() => setContactOpen(true)}
              />
            </ScrollReveal>

            {/* Section 9: Call to Action Banner (WORK WITH US. LET'S CREATE SOMETHING BOLD.) */}
            <ScrollReveal id="cta-section" direction="up" distance={32} duration={850}>
              <WorkWithUsCTA
                onOpenContact={() => setContactOpen(true)}
              />
            </ScrollReveal>
          </>
        )}

        {/* Page 1: What we are? */}
        {currentPage === 'what-we-are' && (
          <WhatWeArePage
            onOpenContact={() => setContactOpen(true)}
            onNavigateToProvide={() => handleNavigatePage('what-we-provide')}
            onNavigateToTeam={() => handleNavigatePage('who-we-are')}
            onNavigateToTrust={() => handleNavigatePage('who-trust-us')}
          />
        )}

        {/* Page 2: Who we are? or Member Portfolio Case Study */}
        {currentPage === 'who-we-are' && (
          selectedMemberId ? (
            <MemberPortfolioPage
              memberId={selectedMemberId}
              onBack={() => {
                setSelectedMemberId(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectMember={(id) => {
                setSelectedMemberId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={() => setContactOpen(true)}
            />
          ) : (
            <WhoWeArePage
              onOpenContact={() => setContactOpen(true)}
              onSelectMember={(id) => {
                setSelectedMemberId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )
        )}

        {/* Page 3: What we provide? */}
        {currentPage === 'what-we-provide' && (
          <WhatWeProvidePage
            onOpenContact={() => setContactOpen(true)}
            onNavigateToWhoTrustUs={() => handleNavigatePage('who-trust-us')}
          />
        )}

        {/* Page 4: Who Trust us? */}
        {currentPage === 'who-trust-us' && (
          <WhoTrustUsPage
            onOpenContact={() => setContactOpen(true)}
            onSelectClient={handleSelectClient}
            onNavigateToWhatWeAre={() => handleNavigatePage('what-we-are')}
          />
        )}
      </main>

      {/* Site Footer & Navigation */}
      <div id="footer-section">
        <Footer
          onOpenContact={() => setContactOpen(true)}
          onNavigate={scrollToSection}
          onNavigatePage={handleNavigatePage}
        />
      </div>

      {/* Modals & Dialogs */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenContact={() => {
          setSelectedCaseStudy(null);
          setContactOpen(true);
        }}
      />
      <NewsModal
        update={selectedNews}
        onClose={() => setSelectedNews(null)}
        onOpenContact={() => {
          setSelectedNews(null);
          setContactOpen(true);
        }}
      />
      <ViewAllDrawer
        isOpen={viewAllDrawerOpen}
        initialTab={viewAllTab}
        onClose={() => setViewAllDrawerOpen(false)}
        onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
        onSelectNews={(news) => setSelectedNews(news)}
      />
    </div>
  );
}
