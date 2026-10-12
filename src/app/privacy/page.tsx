import React from 'react';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/ui/Breadcrumb';
import '@/styles/legal.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | ALIVE Institute',
  description: 'Privacy Policy and data practices for ALIVE Institute website demo.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Privacy Policy', href: '/privacy' }]} />
          <h1 className="legal-hero-title">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: October 2026</p>
        </div>
      </section>

      <div className="container">
        <div className="legal-content">
          <div className="legal-disclaimer-callout" role="note">
            <strong>Concept Demonstration Notice</strong>
            <p>
              This website is a conceptual digital demonstration showcasing the online presence of ALIVE Institute (Indore). Form submissions, test simulations, and interactive components are mock implementations intended for demonstration purposes.
            </p>
          </div>

          <div className="legal-section">
            <h2>1. Information We Collect</h2>
            <p>
              When prospective students or parents interact with this demonstration portal, information submitted via inquiry forms may include:
            </p>
            <ul>
              <li>Student and parent full name</li>
              <li>Contact telephone number and email address</li>
              <li>Target grade level, school board, and academic stream</li>
              <li>Specific educational questions or requests</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>2. How Information is Used</h2>
            <p>
              In a production setting, submitted data is strictly used for legitimate educational purposes, including:
            </p>
            <ul>
              <li>Responding to admissions inquiries and scheduling counseling sessions</li>
              <li>Providing course information, fee structures, and batch schedules</li>
              <li>Sharing relevant academic updates and workshop invitations</li>
            </ul>
            <p>
              We do not sell, rent, or trade student or family personal information to any third-party marketing vendors.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. Data Retention &amp; Security</h2>
            <p>
              Student inquiry data is retained only as long as necessary to serve educational guidance purposes. We employ reasonable administrative and technical safeguards to ensure that records remain protected against unauthorized access.
            </p>
          </div>

          <div className="legal-section">
            <h2>4. Contact Us</h2>
            <p>
              If you have any questions or feedback regarding this privacy disclosure, you may reach out to ALIVE Institute at our campus in Usha Nagar or Airport Road, Indore, or contact:
            </p>
            <p>
              <strong>Email:</strong> contact@aliveinstitute.in<br />
              <strong>Phone:</strong> +91 84015 58669
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
