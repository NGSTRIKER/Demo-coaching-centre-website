'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import {
  instituteInfo,
  branches,
  courses,
  footerQuickLinks,
  socialLinks
} from '@/lib/data';
import {
  InstagramIcon,
  YouTubeIcon,
  FacebookIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon
} from '@/components/ui/SocialIcons';
import '@/styles/footer.css';

export const Footer: React.FC = () => {
  const currentYear = 2026;
  const pathname = usePathname();

  if (
    pathname?.startsWith('/student') ||
    pathname?.startsWith('/staff') ||
    pathname === '/login' ||
    pathname?.startsWith('/admin')
  ) {
    return null;
  }

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        {/* Main 4-Column Grid */}
        <div className="footer-main">
          {/* Column 1: About & Brand */}
          <div className="footer-col">
            <Link
              href="/"
              className="footer-about-logo"
              aria-label="ALIVE Institute - Back to Top"
            >
              <Logo variant="light" size="md" showTagline />
            </Link>
            <p className="footer-about-desc">
              Premier coaching institute in Indore dedicated to academic excellence
              for Classes 6th–12th (CBSE, ICSE, MP Board) in Science & Commerce,
              along with comprehensive CUET preparation since 2012.
            </p>
            <div className="footer-social-row" aria-label="Official Social Channels">
              {socialLinks.map((social) => {
                let IconComponent = InstagramIcon;
                if (social.platform === 'youtube') IconComponent = YouTubeIcon;
                if (social.platform === 'facebook') IconComponent = FacebookIcon;

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={social.label}
                  >
                    <IconComponent size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links-list">
              {footerQuickLinks.map((item) => (
                <li key={item.label} className="footer-link-item">
                  <Link href={item.href} className="footer-nav-link">
                    <span>›</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Programs */}
          <div className="footer-col">
            <h3 className="footer-heading">Programs Offered</h3>
            <ul className="footer-links-list">
              {courses.map((course) => (
                <li key={course.id} className="footer-link-item">
                  <Link
                    href={`/courses#${course.slug}`}
                    className="footer-nav-link"
                  >
                    <span>›</span> {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Branches */}
          <div className="footer-col">
            <h3 className="footer-heading">Our Centers in Indore</h3>
            <div className="footer-branches-list">
              {branches.map((branch) => (
                <div key={branch.id} className="footer-branch-item">
                  <h4 className="footer-branch-title">
                    <MapPinIcon size={14} color="#d4714f" aria-hidden="true" />
                    <span>{branch.name}</span>
                  </h4>
                  <p className="footer-branch-address">
                    {branch.address}, {branch.city}, {branch.state} – {branch.pincode}
                  </p>
                  <a
                    href={`tel:${branch.phone}`}
                    className="footer-branch-phone"
                    aria-label={`Call ${branch.name} at ${branch.displayPhone}`}
                  >
                    <PhoneIcon size={12} aria-hidden="true" />
                    <span>{branch.displayPhone}</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="footer-direct-contact">
              <a
                href={`mailto:${instituteInfo.email}`}
                className="footer-direct-item"
              >
                <MailIcon size={14} aria-hidden="true" />
                <span>{instituteInfo.email}</span>
              </a>
              <span className="footer-direct-item">
                <span style={{ color: '#d4714f', fontWeight: 600 }}>Center Hours:</span> Mon–Sat 8:00 AM – 8:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-flex">
            <p className="footer-copyright">
              © {currentYear} {instituteInfo.name}, Indore. All rights reserved.
            </p>

            <ul className="footer-legal-links">
              <li>
                <Link href="/privacy" className="footer-legal-link">
                  Privacy Policy
                </Link>
              </li>
              <li>•</li>
              <li>
                <Link href="/terms" className="footer-legal-link">
                  Terms of Service
                </Link>
              </li>
              <li>•</li>
              <li>
                <Link href="/sitemap.xml" className="footer-legal-link">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-concept-disclaimer">
            <strong>Demonstration Notice:</strong> This website is an institutional digital concept developed for ALIVE Institute Indore. Faculty details and assessments are curated for demonstration purposes. Contact telephone numbers and address credentials reflect actual branch locations.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
