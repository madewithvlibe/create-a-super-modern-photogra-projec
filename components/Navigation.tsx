'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="text-xl tracking-[0.3em] font-light hover:opacity-60 transition-opacity">
            DP STUDIO
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12 text-sm tracking-[0.2em]">
            <Link href="/#work" className="hover:opacity-60 transition-opacity">
              WORK
            </Link>
            <Link href="/#about" className="hover:opacity-60 transition-opacity">
              ABOUT
            </Link>
            <Link href="/#contact" className="hover:opacity-60 transition-opacity">
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1.5"
          >
            <span
              className={`w-6 h-[0.5px] bg-black transition-all ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-[0.5px] bg-black transition-all ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[0.5px] bg-black transition-all ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '96px' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12 text-2xl tracking-[0.3em]">
          <Link
            href="/#work"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-60 transition-opacity"
          >
            WORK
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-60 transition-opacity"
          >
            ABOUT
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-60 transition-opacity"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}
