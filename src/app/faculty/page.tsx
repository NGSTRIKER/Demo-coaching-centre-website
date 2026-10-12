import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FacultyCard from '@/components/faculty/FacultyCard';
import { getFaculty } from '@/lib/data';
import '@/styles/faculty.css';

export const metadata: Metadata = {
  title: 'Faculty | ALIVE Institute Indore',
  description:
    'Meet the expert subject educators and department heads at ALIVE Institute Indore guiding students across Class 6–12 for Board exams and competitive entrances.',
  openGraph: {
    title: 'Faculty | ALIVE Institute Indore',
    description:
      'Learn about our department mentors in Mathematics, Physics, Chemistry, Biology, and Commerce at ALIVE Institute Indore.',
    url: 'https://aliveinstitute.in/faculty',
    type: 'website',
  },
};

export default function FacultyPage() {
  const facultyMembers = getFaculty();

  return (
    <main className="faculty-page">
      {/* ── Hero / Header ── */}
      <section className="faculty-hero-section">
        <div className="faculty-container">
          <Breadcrumb items={[{ label: 'Faculty', href: '/faculty' }]} />

          <div className="faculty-hero-content">
            <span className="faculty-badge-label">OUR FACULTY</span>
            <h1 className="faculty-hero-title">Meet Our Educators</h1>
            <p className="faculty-hero-subtitle">
              Passionate subject matter experts, experienced board mentors, and dedicated problem-solving
              coaches providing personalized academic guidance across Indore.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Faculty Grid Section ── */}
      <div className="faculty-container">
        <div className="faculty-grid-section">
          {/* Demo Notice Disclaimer */}
          <div className="faculty-disclaimer-banner" role="alert">
            <span className="disclaimer-icon" aria-hidden="true">ℹ️</span>
            <div className="disclaimer-text">
              <strong>Notice regarding Faculty Profiles:</strong> The educator listings below are
              provided as <strong>illustrative demonstration placeholders</strong> to represent the
              academic structure, departmental hierarchy, and pedagogical specializations at ALIVE Institute.
              Individual staff assignments are confirmed at center enrollment.
            </div>
          </div>

          <div className="faculty-grid-heading-row">
            <p className="faculty-count-text">
              Showing <strong>{facultyMembers.length}</strong> Department Mentors (Demo Showcase)
            </p>
          </div>

          <div className="faculty-grid">
            {facultyMembers.map((member) => (
              <FacultyCard key={member.id} faculty={member} />
            ))}
          </div>

          {/* Join / Careers Banner */}
          <section className="faculty-join-banner">
            <div className="faculty-join-text">
              <span className="faculty-join-tag">Career Opportunities</span>
              <h2 className="faculty-join-title">Are you an inspiring educator based in Indore?</h2>
              <p className="faculty-join-desc">
                We are always looking for exceptional faculty members passionate about middle school
                foundation and senior secondary board mastery.
              </p>
            </div>
            <div className="faculty-join-actions">
              <Link href="/contact" className="faculty-join-btn">
                Contact Academic Desk
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
