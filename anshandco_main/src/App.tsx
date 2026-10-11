/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageRoute } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { HeroVideo } from './components/HeroVideo';
import { KineticManifesto } from './components/KineticManifesto';
import { BrandReelDivider } from './components/BrandReelDivider';
import { MissionSection } from './components/MissionSection';
import { CollaborationsSection } from './components/CollaborationsSection';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { WorkWithUsCTA } from './components/WorkWithUsCTA';
import { Footer } from './components/Footer';

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

  return (
    <div className="relative min-h-screen bg-white text-black font-sans selection:bg-orange-500 selection:text-white">
      {/* Custom Retro Isometric Hand Cursor */}
      <CustomCursor />

      {/* Global Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenContact={() => setContactOpen(true)}
      />

      <main className="w-full flex flex-col">
        {currentPage === 'home' && (
          <>
            {/* Section 2: Hero Video & Custom Cursor Area */}
            <HeroVideo />

            {/* Section 3: Kinetic Typographic Manifesto [ PURPOSE + HUMAN + CREATIVE ] */}
            <KineticManifesto onKnowMore={() => handleNavigatePage('what-we-are')} />

            {/* Section 4: Brand Reel Transition (Fluid Ribbon) */}
            <BrandReelDivider />

            {/* Section 5: Brand Mission Statement & Kinetic Logo (WE HELP BUILD BRANDS) */}
            <MissionSection onKnowMore={() => handleNavigatePage('what-we-provide')} />

            {/* Section 6: Selected Works / Portfolio Showcase [ SOMETHING LIGHT LIKE OUR THEME? ] */}
            <SelectedWorksSection
              onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
              onViewAll={() => handleOpenViewAll('works')}
            />

            {/* Section 8: Capabilities & FAQ Accordion [ SERVICES & GOOD QUESTIONS ] */}
            <CapabilitiesSection
              onKnowMore={() => setContactOpen(true)}
              onOpenContact={() => setContactOpen(true)}
            />

            {/* Section 9: Call to Action Banner (WORK WITH US. LET'S CREATE SOMETHING BOLD.) */}
            <WorkWithUsCTA
              onOpenContact={() => setContactOpen(true)}
            />
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
      <Footer
        onOpenContact={() => setContactOpen(true)}
        onNavigate={scrollToSection}
        onNavigatePage={handleNavigatePage}
      />

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
