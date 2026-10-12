import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Avatar from '@/components/ui/Avatar';
import { getFaculty, getFacultyBySlug } from '@/lib/data';
import '@/styles/faculty.css';
import '@/styles/faculty-detail.css';

interface FacultyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allFaculty = getFaculty();
  return allFaculty.map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({ params }: FacultyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const faculty = getFacultyBySlug(slug);

  if (!faculty) {
    return {
      title: 'Faculty Member Not Found | ALIVE Institute',
      description: 'The requested faculty profile could not be found.',
    };
  }

  return {
    title: `${faculty.name} | ALIVE Institute Indore`,
    description: `Faculty profile for ${faculty.name}, ${faculty.subject} at ALIVE Institute Indore.`,
    alternates: {
      canonical: `/faculty/${faculty.slug}`,
    },
    openGraph: {
      title: `${faculty.name} | ALIVE Institute Indore`,
      description: faculty.bio,
      url: `https://aliveinstitute.in/faculty/${faculty.slug}`,
      type: 'profile',
    },
  };
}

export default async function FacultyDetailPage({ params }: FacultyDetailPageProps) {
  const { slug } = await params;
  const faculty = getFacultyBySlug(slug);

  if (!faculty) {
    notFound();
  }

  // Normalize qualifications to array
  const qualificationsList = Array.isArray(faculty.qualifications)
    ? faculty.qualifications
    : [faculty.qualifications];

  return (
    <main className="faculty-detail-page">
      {/* ── Top Hero / Profile Header ── */}
      <section className="faculty-detail-hero">
        <div className="faculty-detail-container">
          <Breadcrumb
            items={[
              { label: 'Faculty', href: '/faculty' },
              { label: faculty.name },
            ]}
          />

          {/* Demo Disclaimer */}
          <div className="faculty-detail-disclaimer" role="alert">
            <span aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <span>
              <strong>Demonstration Profile:</strong> This educator profile is an illustrative
              mock representation for system preview purposes. Real faculty credentials and
              mentors are confirmed directly at our Indore campuses.
            </span>
          </div>

          <div className="faculty-profile-header-card">
            <div className="profile-avatar-wrapper">
              <Avatar name={faculty.name} size="xl" alt={faculty.name} />
              <span className="profile-demo-tag">DEMO PROFILE</span>
            </div>

            <div className="profile-header-info">
              <h1 className="profile-name">{faculty.name}</h1>
              <p className="profile-role-line">{faculty.designation || faculty.subject}</p>
              <p className="profile-dept-line">{faculty.department}</p>

              <div className="profile-meta-pills">
                <span className="profile-meta-pill">Department: {faculty.department}</span>
                {faculty.experienceYears && (
                  <span className="profile-meta-pill">
                    {faculty.experienceYears}+ Years Teaching Experience
                  </span>
                )}
                <span className="profile-meta-pill">Campus: Indore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detailed Content Layout ── */}
      <div className="faculty-detail-container">
        <div className="faculty-detail-layout">
          <div className="faculty-detail-content">
            {/* Biography */}
            <section className="faculty-section-block">
              <h2 className="faculty-section-title">Professional Background &amp; Bio</h2>
              <p className="faculty-bio-paragraph">{faculty.bio}</p>
              <p className="faculty-bio-paragraph">
                With a rigorous pedagogical method centered around concept clarity and exam-readiness,
                this department mentors students across CBSE, ICSE, and MP Board curricula to
                consistently outperform state and national percentiles.
              </p>
            </section>

            {/* Academic Specialization */}
            <section className="faculty-section-block">
              <h2 className="faculty-section-title">Teaching Focus &amp; Domain</h2>
              <div className="qualification-item" style={{ marginBottom: 'var(--space-3)' }}>
                <span className="qualification-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </span>
                <span><strong>Primary Specialization:</strong> {faculty.subject}</span>
              </div>
              <div className="qualification-item">
                <span className="qualification-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M10 11v6M14 11v6" />
                  </svg>
                </span>
                <span><strong>Department:</strong> {faculty.department}</span>
              </div>
            </section>

            {/* Qualifications (Clearly Marked as Demo) */}
            <section className="faculty-section-block">
              <h2 className="faculty-section-title">Academic Qualifications (Demo Data)</h2>
              <ul className="qualifications-list">
                {qualificationsList.map((qual, index) => (
                  <li key={index} className="qualification-item">
                    <span className="qualification-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </span>
                    <span>
                      {qual}{' '}
                      <em style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)' }}>
                        [Demo Credential]
                      </em>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Teaching Philosophy Placeholder */}
            <section className="faculty-section-block">
              <h2 className="faculty-section-title">Teaching Philosophy</h2>
              <div className="philosophy-card">
                <p className="philosophy-quote">
                  &ldquo;True mastery does not arise from solving a hundred identical problems, but from
                  deeply grasping the one core theorem that unlocks all hundred. When students understand
                  why a formula works, fear turns into curiosity.&rdquo;
                </p>
                <span className="philosophy-note">
                  Pedagogical Principle · ALIVE Academic Excellence Framework
                </span>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="faculty-sidebar-box">
              <h3 className="faculty-sidebar-heading">Schedule a Doubt Session</h3>
              <p className="faculty-sidebar-desc">
                Enrolled students can attend weekly doubt-clearing sessions and 1-on-1 performance
                consultations at both ALIVE centers.
              </p>

              <ul className="faculty-contact-details">
                <li className="faculty-contact-row">
                  <span className="faculty-contact-lbl">Centers:</span>
                  <span className="faculty-contact-val">Usha Nagar &amp; Airport Rd</span>
                </li>
                <li className="faculty-contact-row">
                  <span className="faculty-contact-lbl">Doubt Slots:</span>
                  <span className="faculty-contact-val">Every Saturday</span>
                </li>
                <li className="faculty-contact-row">
                  <span className="faculty-contact-lbl">Batch Level:</span>
                  <span className="faculty-contact-val">Classes 6th–12th</span>
                </li>
              </ul>

              <Link href="/contact" className="faculty-sidebar-cta">
                Book Center Consultation
              </Link>

              <Link href="/faculty" className="back-to-faculty-link">
                ← Back to All Educators
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
