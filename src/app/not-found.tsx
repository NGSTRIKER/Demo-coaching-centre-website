import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/ui/SocialIcons';
import '@/styles/not-found.css';

export default function NotFound() {
  const quickLinks = [
    { label: 'Explore Courses', href: '/courses' },
    { label: 'About ALIVE Institute', href: '/about' },
    { label: 'Admissions & Process', href: '/admissions' },
    { label: 'Campus Locations & Contact', href: '/contact' },
    { label: 'Study Resources', href: '/resources' },
    { label: 'Practice Demo Test', href: '/test' },
  ];

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code" aria-hidden="true">
          404
        </div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          We couldn’t find the page you were looking for. The link may have changed, or the page might have been moved.
        </p>

        <div className="not-found-links">
          <span className="not-found-links-title">Helpful Navigation Links</span>
          <div className="not-found-links-list">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="not-found-link-item"
              >
                <span>{link.label}</span>
                <ArrowRightIcon size={12} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="not-found-action">
          <Link href="/" className="btn btn-primary btn-lg">
            Return to Homepage
          </Link>
          <Link href="/contact" className="btn btn-outline btn-lg">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
