import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { getCourses } from '@/lib/data';
import CoursesFilterableList from '@/components/courses/CoursesFilterableList';
import '@/styles/courses.css';

export const metadata: Metadata = {
  title: 'Courses & Programs | ALIVE Institute Indore',
  description:
    'Explore comprehensive classroom coaching programs for Classes 6th to 12th (CBSE, ICSE, MP Board) across Science (PCM/PCB), Commerce, Junior Foundation, and CUET in Indore.',
  openGraph: {
    title: 'Courses & Programs | ALIVE Institute Indore',
    description:
      'Rigorous academic coaching for Classes 6–12 across CBSE, ICSE, and MP Board with veteran faculty and individualized mentoring.',
    url: 'https://aliveinstitute.in/courses',
    type: 'website',
  },
};

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <main className="courses-page">
      {/* ── Hero / Page Header ── */}
      <section className="courses-hero-section">
        <div className="courses-container">
          <Breadcrumb items={[{ label: 'Courses', href: '/courses' }]} />

          <div className="courses-hero-content">
            <span className="courses-badge-label">OUR PROGRAMS</span>
            <h1 className="courses-hero-title">Courses &amp; Programs</h1>
            <p className="courses-hero-subtitle">
              Structured curriculum, experienced educators, and disciplined test series tailored
              for CBSE, ICSE, and MP Board students in Indore. From middle school foundation to
              high school board toppers and CUET qualifiers.
            </p>

            <div className="courses-stats-strip">
              <div className="courses-stat-item">
                <span className="courses-stat-num">Class 6–12</span>
                <span className="courses-stat-text">Comprehensive Coverage</span>
              </div>
              <div className="courses-stat-item">
                <span className="courses-stat-num">3 Boards</span>
                <span className="courses-stat-text">CBSE · ICSE · MP Board</span>
              </div>
              <div className="courses-stat-item">
                <span className="courses-stat-num">20–25</span>
                <span className="courses-stat-text">Batch Size Limit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Filterable Grid ── */}
      <div className="courses-container">
        <CoursesFilterableList initialCourses={courses} />

        {/* ── Admissions Consultation Banner ── */}
        <section className="courses-admissions-banner" aria-label="Admissions guidance banner">
          <div className="admissions-banner-text">
            <span className="admissions-banner-tag">Need Guidance?</span>
            <h2 className="admissions-banner-title">Unsure which program fits your child’s goals?</h2>
            <p className="admissions-banner-desc">
              Schedule a personalized 1-on-1 counseling session with our senior academic heads at
              our Usha Nagar or Airport Road centers in Indore.
            </p>
          </div>
          <div className="admissions-banner-actions">
            <Link href="/contact" className="admissions-cta-primary">
              Book Academic Counseling
            </Link>
            <Link href="/test" className="admissions-cta-secondary">
              Take Free Diagnostic Test
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
