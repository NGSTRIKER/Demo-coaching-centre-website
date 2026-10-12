import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { courses, branches } from '@/lib/data';
import {
  MapPinIcon,
  PhoneIcon,
  ArrowRightIcon,
  InstagramIcon,
  YouTubeIcon,
} from '@/components/ui/SocialIcons';
import '@/styles/home.css';

export const metadata: Metadata = {
  title: 'ALIVE Institute | Premier Coaching for Class 6–12 in Indore',
  description:
    'Dedicated coaching for CBSE, ICSE, and MP Board students from Class 6 to 12 in Indore. Campuses at Usha Nagar and Airport Road. Concept-first teaching and personalized mentorship.',
};

export default function HomePage() {
  // Primary 3 course highlights for the homepage overview grid
  const featuredCourses = courses.slice(0, 3);

  const pillars = [
    {
      index: '01',
      title: 'Concept-Based Learning',
      description:
        'We prioritize deep conceptual clarity over rote memorization. Students master core fundamentals in Mathematics and Sciences, equipping them to solve complex problems independently.',
    },
    {
      index: '02',
      title: '1:1 Mentorship & Doubt Resolution',
      description:
        'Small batch sizes ensure our educators identify each learner’s specific hurdles. Dedicated doubt sessions ensure no question remains unanswered before moving forward.',
    },
    {
      index: '03',
      title: 'Regular Testing & Performance Tracking',
      description:
        'Continuous diagnostic assessments, chapter-wise evaluations, and full-length simulated board exams help students build test temperament and track verifiable academic progress.',
    },
    {
      index: '04',
      title: 'Board-Specific Curriculum Alignment',
      description:
        'Tailored pedagogical strategies addressing the distinct nuances, marking schemes, and question patterns of CBSE, ICSE, and MP Board state examinations.',
    },
  ];

  return (
    <div className="home-page">
      {/* ── 1. Hero Section ── */}
      <section className="home-hero" aria-label="Introduction">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-tag">
              <span className="hero-tag-dot" aria-hidden="true" />
              <span>Admissions Open for Academic Session</span>
            </div>

            <h1 className="hero-title">
              Where Learning Comes <em>Alive</em>
            </h1>

            <p className="hero-lead">
              Premier academic coaching for Class 6th to 12th in Indore.
              Empowering students across CBSE, ICSE, and MP Board curricula with
              rigorous conceptual foundation and compassionate mentorship.
            </p>

            <div className="hero-actions">
              <Link href="/courses" className="btn btn-accent btn-lg">
                Explore Courses
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Contact Us
              </Link>
            </div>

            {/* Stat bar below (Verifiable facts only) */}
            <div className="hero-stat-bar" role="region" aria-label="Key Institute Facts">
              <div className="stat-item">
                <span className="stat-label">Grades Coached</span>
                <span className="stat-value">6th–12th Grade</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Recognized Boards</span>
                <span className="stat-value">CBSE · ICSE · MP Board</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Campus Locations</span>
                <span className="stat-value">Two Campuses in Indore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Courses Overview ── */}
      <section className="section home-courses" aria-labelledby="courses-heading">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label">OUR PROGRAMS</p>
            <h2 id="courses-heading" className="heading-2">
              Structured Learning for Every Stage
            </h2>
            <p className="section-lead">
              From middle school fundamentals to high-school board and entrance excellence, our programs are architected for steady academic growth.
            </p>
          </div>

          <div className="courses-grid">
            {featuredCourses.map((course) => (
              <article key={course.id} className="home-course-card">
                <div className="course-card-meta">
                  <span className="course-card-badge">{course.badge || course.classes}</span>
                  <span className="course-card-boards">{course.boards.join(', ')}</span>
                </div>
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-desc">{course.shortDescription}</p>
                <Link
                  href={`/courses#${course.slug}`}
                  className="course-card-link"
                  aria-label={`Learn more about ${course.title}`}
                >
                  <span>Learn More</span>
                  <ArrowRightIcon size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className="courses-footer">
            <Link href="/courses" className="btn btn-primary btn-lg">
              View All Courses &amp; Curricula
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Teaching Approach ── */}
      <section className="section home-approach" aria-labelledby="approach-heading">
        <div className="container">
          <div className="approach-layout">
            <div className="approach-intro">
              <p className="section-label">OUR APPROACH</p>
              <h2 id="approach-heading" className="heading-2">
                How We Teach
              </h2>
              <p className="body-large" style={{ marginTop: 'var(--space-3)' }}>
                Education at ALIVE Institute is built around deliberate practice, analytical reasoning, and patient academic guidance.
              </p>
              <blockquote className="approach-quote">
                &ldquo;Real academic confidence isn&rsquo;t memorizing formulas—it is understanding why those formulas exist and knowing how to apply them.&rdquo;
              </blockquote>
            </div>

            <div className="approach-pillars">
              {pillars.map((pillar) => (
                <div key={pillar.index} className="pillar-item">
                  <div className="pillar-index" aria-hidden="true">
                    {pillar.index}
                  </div>
                  <div className="pillar-content">
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Campus Section ── */}
      <section className="section home-campuses" aria-labelledby="campuses-heading">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label">OUR CAMPUSES</p>
            <h2 id="campuses-heading" className="heading-2">
              Two Locations in Indore
            </h2>
            <p className="section-lead">
              Equipped with student-friendly classrooms, dedicated faculty rooms, and accessible study libraries.
            </p>
          </div>

          <div className="campuses-grid">
            {branches.map((branch) => (
              <div key={branch.id} className="campus-card">
                <div className="campus-card-header">
                  <div>
                    <h3 className="campus-name">{branch.name}</h3>
                    <p className="body-small" style={{ color: 'var(--color-gray-600)' }}>
                      {branch.landmark}
                    </p>
                  </div>
                  {branch.isMain && (
                    <span className="campus-badge">Main Center</span>
                  )}
                </div>

                <div className="campus-card-body">
                  <div className="campus-info-row">
                    <MapPinIcon size={18} aria-hidden="true" />
                    <div className="campus-info-text">
                      <strong>Address</strong>
                      <span>
                        {branch.address}, {branch.city}, {branch.state} — {branch.pincode}
                      </span>
                    </div>
                  </div>

                  <div className="campus-info-row">
                    <PhoneIcon size={18} aria-hidden="true" />
                    <div className="campus-info-text">
                      <strong>Direct Contact</strong>
                      <a
                        href={`tel:${branch.phone}`}
                        style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                      >
                        {branch.displayPhone}
                      </a>
                    </div>
                  </div>

                  <div className="campus-map-box">
                    <span>Timings: {branch.timings}</span>
                    <a
                      href={branch.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(branch.address + ' Indore')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="campus-directions-link"
                    >
                      <span>Get Directions</span>
                      <ArrowRightIcon size={12} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Section ── */}
      <section className="home-cta-banner" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta-banner-inner">
            <h2 id="cta-heading" className="cta-title">
              Begin Your Journey with ALIVE Institute
            </h2>
            <p className="cta-subtext">
              Admissions are open for foundation and board batches. Visit our centers or enquire online to schedule an academic counseling session.
            </p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-accent btn-lg">
                Enquire Now
              </Link>
              <Link href="/courses" className="btn btn-outline-light btn-lg">
                View All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Social Connect ── */}
      <section className="home-social" aria-labelledby="social-heading">
        <div className="container">
          <div className="social-inner">
            <div className="social-text">
              <p className="section-label">CONNECT WITH US</p>
              <h3 id="social-heading">Stay Connected with ALIVE Community</h3>
              <p>
                Follow our official channels for academic updates, exam tips, syllabus insights, and student announcements.
              </p>
            </div>

            <div className="social-links-row">
              <a
                href="https://www.instagram.com/aliveinstituteindore/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="Instagram: @aliveinstituteindore"
              >
                <InstagramIcon size={20} aria-hidden="true" />
                <span>@aliveinstituteindore</span>
              </a>

              <a
                href="https://www.youtube.com/@aliveinstituteindore"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="YouTube: @aliveinstituteindore"
              >
                <YouTubeIcon size={20} aria-hidden="true" />
                <span>@aliveinstituteindore</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
