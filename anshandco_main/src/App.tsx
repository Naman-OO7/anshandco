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

  // Handle initial URL parameters & history state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const portfolioParam = params.get('portfolio') || params.get('member');
    const pageParam = params.get('page') as PageRoute | null;
    const initialPage: PageRoute = portfolioParam ? 'who-we-are' : (pageParam || 'home');
    
    if (portfolioParam) {
      setSelectedMemberId(portfolioParam);
      setCurrentPage('who-we-are');
    } else if (pageParam) {
      setCurrentPage(pageParam);
    }

    if (!window.history.state) {
      window.history.replaceState(
        { page: initialPage, memberId: portfolioParam || null, modal: null },
        '',
        window.location.href
      );
    }
  }, []);

  // Listen to browser popstate (phone back / cancel button & browser back/forward)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // 1. If any modal was open, close it and prevent leaving website
      if (contactOpen || selectedCaseStudy || selectedNews || viewAllDrawerOpen) {
        setContactOpen(false);
        setSelectedCaseStudy(null);
        setSelectedNews(null);
        setViewAllDrawerOpen(false);
        return;
      }

      // 2. If viewing a member's portfolio, go back to Who We Are team list
      if (selectedMemberId) {
        setSelectedMemberId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 3. Page navigation based on history state or URL
      const state = e.state;
      if (state && state.page) {
        setCurrentPage(state.page);
        setSelectedMemberId(state.memberId || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const searchParams = new URLSearchParams(window.location.search);
        const pParam = searchParams.get('portfolio') || searchParams.get('member');
        const pgParam = searchParams.get('page') as PageRoute | null;
        if (pParam) {
          setCurrentPage('who-we-are');
          setSelectedMemberId(pParam);
        } else if (pgParam) {
          setCurrentPage(pgParam);
          setSelectedMemberId(null);
        } else {
          setCurrentPage('home');
          setSelectedMemberId(null);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [contactOpen, selectedCaseStudy, selectedNews, viewAllDrawerOpen, selectedMemberId]);

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      handleNavigatePage('home');
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

  const handleNavigatePage = (page: PageRoute, replace = false) => {
    setSelectedMemberId(null);
    setSelectedCaseStudy(null);
    setSelectedNews(null);
    setContactOpen(false);
    setViewAllDrawerOpen(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const targetUrl = page === 'home' ? '/' : `?page=${page}`;
    const stateObj = { page, memberId: null, modal: null };
    if (replace) {
      window.history.replaceState(stateObj, '', targetUrl);
    } else {
      window.history.pushState(stateObj, '', targetUrl);
    }
  };

  const handleSelectMember = (memberId: string | null) => {
    setSelectedMemberId(memberId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (memberId) {
      window.history.pushState({ page: 'who-we-are', memberId, modal: null }, '', `?portfolio=${memberId}`);
    } else {
      window.history.pushState({ page: 'who-we-are', memberId: null, modal: null }, '', '?page=who-we-are');
    }
  };

  const handleSelectCaseStudy = (study: CaseStudy | null) => {
    setSelectedCaseStudy(study);
    if (study) {
      window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'case-study', id: study.id }, '', `?case=${study.id}`);
    }
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudy(null);
    if (window.history.state?.modal === 'case-study') {
      window.history.back();
    }
  };

  const handleSelectNews = (news: NewsUpdate | null) => {
    setSelectedNews(news);
    if (news) {
      window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'news', id: news.id }, '', `?news=${news.id}`);
    }
  };

  const handleCloseNews = () => {
    setSelectedNews(null);
    if (window.history.state?.modal === 'news') {
      window.history.back();
    }
  };

  const handleOpenContact = () => {
    setContactOpen(true);
    window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'contact' }, '', '?contact=true');
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    if (window.history.state?.modal === 'contact') {
      window.history.back();
    }
  };

  const handleOpenViewAll = (tab: 'works' | 'clients' | 'news') => {
    setViewAllTab(tab);
    setViewAllDrawerOpen(true);
    window.history.pushState({ page: currentPage, memberId: selectedMemberId, modal: 'view-all', tab }, '', `?view=${tab}`);
  };

  const handleCloseViewAll = () => {
    setViewAllDrawerOpen(false);
    if (window.history.state?.modal === 'view-all') {
      window.history.back();
    }
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
        onOpenContact={handleOpenContact}
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
                onSelectCaseStudy={handleSelectCaseStudy}
                onViewAll={() => handleOpenViewAll('works')}
              />
            </ScrollReveal>

            {/* Section 8: Capabilities & FAQ Accordion [ SERVICES & GOOD QUESTIONS ] */}
            <ScrollReveal id="capabilities-section" direction="up" distance={36} duration={850}>
              <CapabilitiesSection
                onKnowMore={() => handleNavigatePage('what-we-provide')}
                onOpenContact={handleOpenContact}
              />
            </ScrollReveal>

            {/* Section 9: Call to Action Banner (WORK WITH US. LET'S CREATE SOMETHING BOLD.) */}
            <ScrollReveal id="cta-section" direction="up" distance={32} duration={850}>
              <WorkWithUsCTA
                onOpenContact={handleOpenContact}
              />
            </ScrollReveal>
          </>
        )}

        {/* Page 1: What we are? */}
        {currentPage === 'what-we-are' && (
          <WhatWeArePage
            onOpenContact={handleOpenContact}
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
              onBack={() => handleSelectMember(null)}
              onSelectMember={(id) => handleSelectMember(id)}
              onOpenContact={handleOpenContact}
            />
          ) : (
            <WhoWeArePage
              onOpenContact={handleOpenContact}
              onSelectMember={(id) => handleSelectMember(id)}
            />
          )
        )}

        {/* Page 3: What we provide? */}
        {currentPage === 'what-we-provide' && (
          <WhatWeProvidePage
            onOpenContact={handleOpenContact}
            onNavigateToWhoTrustUs={() => handleNavigatePage('who-trust-us')}
          />
        )}

        {/* Page 4: Who Trust us? */}
        {currentPage === 'who-trust-us' && (
          <WhoTrustUsPage
            onOpenContact={handleOpenContact}
            onSelectClient={handleSelectClient}
            onNavigateToWhatWeAre={() => handleNavigatePage('what-we-are')}
          />
        )}
      </main>

      {/* Site Footer & Navigation */}
      <div id="footer-section">
        <Footer
          onOpenContact={handleOpenContact}
          onNavigate={scrollToSection}
          onNavigatePage={handleNavigatePage}
        />
      </div>

      {/* Modals & Dialogs */}
      <ContactModal isOpen={contactOpen} onClose={handleCloseContact} />
      {selectedCaseStudy && (
        <CaseStudyModal
          study={selectedCaseStudy}
          onClose={handleCloseCaseStudy}
          onOpenContact={() => {
            handleCloseCaseStudy();
            handleOpenContact();
          }}
        />
      )}
      {selectedNews && (
        <NewsModal
          update={selectedNews}
          onClose={handleCloseNews}
          onOpenContact={() => {
            handleCloseNews();
            handleOpenContact();
          }}
        />
      )}
      <ViewAllDrawer
        isOpen={viewAllDrawerOpen}
        initialTab={viewAllTab}
        onClose={handleCloseViewAll}
        onSelectCaseStudy={(study) => {
          handleCloseViewAll();
          handleSelectCaseStudy(study);
        }}
        onSelectNews={(news) => {
          handleCloseViewAll();
          handleSelectNews(news);
        }}
      />
    </div>
  );
}
