import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { ArrowRightIcon } from '@/components/ui/SocialIcons';
import '@/styles/about.css';

export const metadata: Metadata = {
  title: 'About Us | ALIVE Institute Indore',
  description:
    'Learn about the founding journey, educational philosophy, and pedagogical mission of ALIVE Institute, serving Indore students since 2012.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Concept Over Memory',
      description:
        'We teach why mathematical theorems work and scientific phenomena occur before requiring practice drills. True confidence comes from deep understanding.',
    },
    {
      title: 'Accessible Mentorship',
      description:
        'Faculty members are approachable and available beyond lecture hours. Every student deserves patience, encouragement, and personalized guidance.',
    },
    {
      title: 'Transparent Progress',
      description:
        'Regular test feedback and clear parent communication ensure steady, measurable growth without unnecessary academic pressure.',
    },
    {
      title: 'Board Alignment',
      description:
        'Understanding that CBSE, ICSE, and MP Board have different evaluation standards, we tailor syllabus coverage to match specific board expectations.',
    },
    {
      title: 'Disciplined Habit Building',
      description:
        'Daily problem-solving routines, systematic note-taking, and structured self-study patterns equip students for higher academic challenges.',
    },
    {
      title: 'Integrity in Education',
      description:
        'We believe in honest counseling, authentic student support, and a positive academic environment centered around genuine learning outcomes.',
    },
  ];

  return (
    <div className="about-page">
      {/* ── Hero Section ── */}
      <section className="about-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'About Us', href: '/about' }]} />

          <div className="about-hero-content">
            <p className="section-label">OUR STORY &amp; ETHOS</p>
            <h1 className="about-hero-title">About ALIVE Institute</h1>
            <p className="about-hero-lead">
              Founded in 2012 in Indore, ALIVE Institute is dedicated to providing
              thoughtful, rigorous, and personalized coaching for students in Classes 6 through 12 across CBSE, ICSE, and MP Board.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-text">
              <p className="section-label">ESTABLISHED 2012</p>
              <h2 className="heading-2">Building Academic Foundations in Indore</h2>
              <div className="story-paragraphs">
                <p>
                  ALIVE Institute began with a simple yet essential premise: middle and senior school education requires genuine conceptual clarity, not just textbook cramming.
                </p>
                <p>
                  Over more than a decade of active teaching, the institute has grown from a focused classroom setup into two prominent learning centers in Indore—located at Usha Nagar and Airport Road.
                </p>
                <p>
                  Our journey has always stayed true to the core belief that every student has distinctive learning speeds and academic potential. By keeping batches manageable and faculty accessible, we create an environment where curiosity is celebrated and foundational doubts are systematically resolved.
                </p>
              </div>
            </div>

            <div className="story-highlight-card">
              <p className="highlight-eyebrow">A Decade of Academic Service</p>
              <h3 className="highlight-title">Committed to Quality Education</h3>
              <p className="highlight-quote">
                &ldquo;Our aim has never been mass coaching. It has always been deep, individual attention where teachers genuinely know each student&rsquo;s strengths and weaknesses.&rdquo;
              </p>
              <div className="highlight-meta">
                <div className="meta-item">
                  <span className="meta-num">2012</span>
                  <span className="meta-desc">Founded in Indore</span>
                </div>
                <div className="meta-item">
                  <span className="meta-num">2 Centers</span>
                  <span className="meta-desc">Usha Nagar &amp; Airport Rd</span>
                </div>
                <div className="meta-item">
                  <span className="meta-num">Class 6–12</span>
                  <span className="meta-desc">CBSE · ICSE · MP Board</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label">MISSION &amp; PURPOSE</p>
            <h2 className="heading-2">What Drives Our Work</h2>
          </div>

          <div className="mission-grid">
            <div className="mission-card">
              <h3>Our Educational Mission</h3>
              <p>
                To empower school students with robust fundamental understanding in Mathematics, Sciences, and Commerce through empathetic teaching, concept-driven pedagogy, and relentless doubt clarification.
              </p>
            </div>

            <div className="mission-card">
              <h3>Our Pedagogical Vision</h3>
              <p>
                To be Indore&rsquo;s most trusted coaching center for holistic school academic mastery—fostering not just top examination marks, but genuine analytical acumen, scientific temper, and intellectual curiosity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Educational Values ── */}
      <section className="values-section">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label">OUR CORE PRINCIPLES</p>
            <h2 className="heading-2">Our Values &amp; Approach</h2>
            <p className="section-lead">
              The foundational principles that guide everyday classroom instruction and student mentorship at ALIVE Institute.
            </p>
          </div>

          <div className="values-grid">
            {values.map((val) => (
              <div key={val.title} className="value-card">
                <h4>{val.title}</h4>
                <p>{val.description}</p>
              </div>
            ))}
          </div>

          {/* Campus Info Section with Contact Link */}
          <div className="about-campus-box">
            <div className="about-campus-text">
              <h3>Visit Our Campuses in Indore</h3>
              <p>
                We welcome prospective students and parents to visit our centers at Usha Nagar and Airport Road, observe our classrooms, and speak directly with academic counselors.
              </p>
            </div>
            <div>
              <Link href="/contact" className="btn btn-primary btn-lg">
                <span>View Branch Details &amp; Contact</span>
                <ArrowRightIcon size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
