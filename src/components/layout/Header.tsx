'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { navItems, instituteInfo } from '@/lib/data';
import { PhoneIcon, MailIcon } from '@/components/ui/SocialIcons';
import '@/styles/header.css';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key and lock body scroll when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  if (
    pathname?.startsWith('/student') ||
    pathname?.startsWith('/staff') ||
    pathname === '/login' ||
    pathname?.startsWith('/admin')
  ) {
    return null;
  }

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        {/* Top notification / info bar */}
        <div className="header-topbar" aria-label="Institute Highlights">
          <div className="container">
            <div className="topbar-info">
              <span className="topbar-badge">Admissions Open 2026-27</span>
              <span>Classes 6th to 12th (Science & Commerce) + CUET</span>
            </div>
            <div className="topbar-info">
              <a
                href={`tel:${instituteInfo.generalPhone.replace(/\s+/g, '')}`}
                className="topbar-item"
                aria-label={`Call ${instituteInfo.name} at ${instituteInfo.displayPhone}`}
              >
                <PhoneIcon size={13} aria-hidden="true" />
                <span>{instituteInfo.displayPhone}</span>
              </a>
              <a
                href={`mailto:${instituteInfo.email}`}
                className="topbar-item"
                aria-label={`Email ${instituteInfo.name} at ${instituteInfo.email}`}
              >
                <MailIcon size={13} aria-hidden="true" />
                <span>{instituteInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link
              href="/"
              className="header-brand"
              aria-label="ALIVE Institute - Home"
            >
              <Logo variant="dark" size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="header-nav" aria-label="Main Navigation">
              <ul className="nav-list">
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname?.startsWith(item.href);

                  if (item.children && item.children.length > 0) {
                    return (
                      <li key={item.label} className="nav-item has-dropdown">
                        <Link
                          href={item.href}
                          className={`nav-link ${isActive ? 'is-active' : ''}`}
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span>{item.label}</span>
                          <svg
                            className="dropdown-chevron"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </Link>
                        <div className="dropdown-menu" role="menu">
                          {item.children.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="dropdown-item"
                              role="menuitem"
                            >
                              <span className="dropdown-title">{sub.label}</span>
                              {sub.description && (
                                <span className="dropdown-desc">
                                  {sub.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label} className="nav-item">
                      <Link
                        href={item.href}
                        className={`nav-link ${isActive ? 'is-active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              <ThemeToggle />
              <Link
                href="/login"
                className="btn-header-login"
                aria-label="Student and Parent Portal Login"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Student Login</span>
              </Link>

              <Link href="/contact" className="btn-header-enquiry">
                Enquire Now
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                className="menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-panel"
              >
                <div className="menu-toggle-icon">
                  <span className="menu-toggle-line" />
                  <span className="menu-toggle-line" />
                  <span className="menu-toggle-line" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          id="mobile-navigation-panel"
          className="mobile-nav-panel"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="mobile-nav-header">
            <Logo variant="dark" size="sm" />
            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile site navigation">
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                  {item.children && (
                    <div className="mobile-nav-sublist">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="mobile-sub-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-nav-footer">
            <Link
              href="/login"
              className="btn btn-outline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Student Portal Login
            </Link>
            <Link
              href="/contact"
              className="btn btn-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Free Counseling
            </Link>

            <div className="mobile-contact-info">
              <div>
                <strong>Phone:</strong> {instituteInfo.displayPhone}
              </div>
              <div>
                <strong>Email:</strong> {instituteInfo.email}
              </div>
              <div>
                <strong>Location:</strong> Usha Nagar & Airport Road, Indore
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
