import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

  const navItems: { label: string; page: PageRoute }[] = [
    { label: 'What we are?', page: 'what-we-are' },
    { label: 'Who we are?', page: 'who-we-are' },
    { label: 'What we provide?', page: 'what-we-provide' },
    { label: 'Who Trust us?', page: 'who-trust-us' },
  ];

  const handleItemClick = (page: PageRoute) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
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

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[14px] text-neutral-800 font-light">
          {navItems.map((item) => {
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden p-2 text-black hover:text-neutral-600 transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[75px] bg-white z-40 px-8 py-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 text-[20px] font-light text-black">
            <button
              onClick={() => handleItemClick('home')}
              className={`py-2 border-b border-neutral-100 text-left cursor-pointer ${
                currentPage === 'home' ? 'font-medium text-[#e38528]' : ''
              }`}
            >
              Home
            </button>
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleItemClick(item.page)}
                className={`py-2 border-b border-neutral-100 text-left cursor-pointer ${
                  currentPage === item.page ? 'font-medium text-[#e38528]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 rounded-full border border-black bg-black text-white text-[16px] font-light cursor-pointer"
            >
              Contact Us
            </button>

            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-neutral-200 text-black">
              <a
                href="https://www.linkedin.com/company/ansh-co/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#e38528] transition-colors"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/anshandco?obrf=dDc0dWcwcDdmbDhy&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-[#e38528] transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-[#e38528] transition-colors"
              >
                <TwitterXIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
