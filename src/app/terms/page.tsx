import React from 'react';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import '@/styles/legal.css';

export const metadata: Metadata = {
  title: 'Terms of Use | ALIVE Institute',
  description: 'Terms of Use and concept demo disclaimer for ALIVE Institute website.',
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Terms of Use', href: '/terms' }]} />
          <h1 className="legal-hero-title">Terms of Use</h1>
          <p className="legal-updated">Last Updated: October 2026</p>
        </div>
      </section>

      <div className="container">
        <div className="legal-content">
          <div className="legal-disclaimer-callout" role="note">
            <strong>Concept Demonstration Disclaimer</strong>
            <p>
              This website is an educational demonstration prototype developed to represent ALIVE Institute Indore. All mock assessments, forms, and features are provided for design and testing evaluation.
            </p>
          </div>

          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, visitors agree to adhere to standard browsing etiquette and acknowledge that instructional materials, schedules, and batch details are subject to administrative revision by ALIVE Institute.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Intellectual Property</h2>
            <p>
              All pedagogical syllabi, test questions, branding elements, logos, and written instructional material displayed on this website are the property of ALIVE Institute or used under license. Unauthorized duplication, reproduction, or distribution without prior written consent is strictly prohibited.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. Academic Advisory &amp; Disclaimers</h2>
            <p>
              While ALIVE Institute strives to maintain complete accuracy across all course syllabi, fee schedules, and academic calendars, institute authorities reserve the right to modify class schedules or batch timings to accommodate official board examination updates.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. Code of Conduct</h2>
            <p>
              Enrolled students and campus visitors are expected to maintain an atmosphere of mutual respect, academic discipline, and honesty during classroom sessions, doubt counters, and online mock tests.
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Governing Law</h2>
            <p>
              Any matters arising from the use of this portal or educational services provided by the institute are governed by the applicable laws of Madhya Pradesh, India, with exclusive jurisdiction in the courts of Indore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
