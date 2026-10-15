import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LinkedInIcon, InstagramIcon, TwitterXIcon } from './Icons';

export type PageRoute = 'home' | 'what-we-are' | 'who-we-are' | 'what-we-provide' | 'who-trust-us';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigatePage, 
  onOpenContact
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Handle phone back / cancel button when mobile menu is open
  useEffect(() => {
    const handlePopState = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [mobileMenuOpen]);

  const navItems: { label: string; page: PageRoute; num: string }[] = [
    { label: 'Where it begins?', page: 'home', num: '01' },
    { label: 'What we are?', page: 'what-we-are', num: '02' },
    { label: 'Who we are?', page: 'who-we-are', num: '03' },
    { label: 'What we provide?', page: 'what-we-provide', num: '04' },
    { label: 'Who Trust us?', page: 'who-trust-us', num: '05' },
  ];

  const handleItemClick = (page: PageRoute) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      window.history.pushState({ mobileMenu: true }, '');
      setMobileMenuOpen(true);
    } else {
      setMobileMenuOpen(false);
      if (window.history.state?.mobileMenu) {
        window.history.back();
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? 'bg-white border-b border-neutral-200 py-4'
          : isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] py-4'
          : 'bg-white py-6 md:py-8'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Wordmark: ANSH&CO */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick('home');
          }}
          className="text-[20px] md:text-[24px] font-normal tracking-[0.25em] uppercase text-black hover:opacity-75 transition-opacity select-none cursor-pointer"
        >
          ANSH&amp;CO
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[14px] text-neutral-800 font-light">
          {navItems.filter((i) => i.page !== 'home').map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleItemClick(item.page)}
                className={`transition-colors relative py-1 cursor-pointer select-none text-[14px] ${
                  isActive 
                    ? 'text-black font-medium after:w-full' 
                    : 'text-neutral-700 hover:text-black after:w-0 hover:after:w-full'
                } after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-250`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="px-6 py-2 rounded-full border border-black bg-black text-white text-[14px] font-light hover:bg-transparent hover:text-black transition-all duration-300 cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={handleToggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2.5 -mr-2 text-black hover:text-neutral-600 focus:outline-none transition-transform duration-200 active:scale-95 cursor-pointer rounded-full"
        >
          {mobileMenuOpen ? (
            <X size={26} className="transition-transform duration-200 rotate-90 animate-in fade-in" />
          ) : (
            <Menu size={26} className="transition-transform duration-200 animate-in fade-in" />
          )}
        </button>
      </div>

      {/* Mobile Menu Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 bottom-0 top-[65px] bg-white/98 backdrop-blur-xl z-40 px-6 sm:px-10 py-6 sm:py-8 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300"
          style={{ height: 'calc(100dvh - 65px)' }}
        >
          {/* Mobile Nav Links with Numbers */}
          <nav className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-2">
              [ NAVIGATION ROSTER ]
            </span>
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleItemClick(item.page)}
                  className={`group flex items-center justify-between py-3.5 border-b border-neutral-100 text-left cursor-pointer transition-all duration-200 ${
                    isActive ? 'border-black' : 'hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-baseline gap-3.5">
                    <span className={`text-[12px] font-mono tracking-wider ${
                      isActive ? 'text-[#e38528] font-medium' : 'text-neutral-400 group-hover:text-black'
                    }`}>
                      {item.num}
                    </span>
                    <span className={`text-[20px] sm:text-[24px] font-light uppercase tracking-tight transition-colors ${
                      isActive ? 'text-[#e38528] font-normal' : 'text-black group-hover:text-[#e38528]'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight 
                    size={18} 
                    className={`transition-all duration-200 ${
                      isActive 
                        ? 'text-[#e38528] opacity-100 translate-x-0' 
                        : 'text-neutral-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} 
                  />
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions & Social Footer */}
          <div className="flex flex-col gap-5 pt-8 mt-6 border-t border-neutral-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-4 rounded-full border border-black bg-black text-white text-[15px] uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors cursor-pointer text-center shadow-lg active:scale-[0.99]"
            >
              Contact Leadership
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-neutral-500 text-[12px] font-light">
              <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-400">
                Dehradun, India · Global
              </span>
              <div className="flex items-center gap-5 text-black">
                <a
                  href="https://www.linkedin.com/company/ansh-co/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-1 hover:text-[#e38528] transition-colors"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/anshandco?obrf=dDc0dWcwcDdmbDhy&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-1 hover:text-[#e38528] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="p-1 hover:text-[#e38528] transition-colors"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
