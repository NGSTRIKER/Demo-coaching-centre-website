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
  ChevronDownIcon,
} from '@/components/ui/SocialIcons';
import '@/styles/home.css';

export const metadata: Metadata = {
  title: 'ALIVE Institute Indore | Premier Coaching for Class 6–12 (CBSE, ICSE, MP Board)',
  description:
    'Indore’s premier coaching institute for Class 6th to 12th students. Specialized batches for CBSE, ICSE, and MP Board across PCM, PCB, and Commerce with campuses in Usha Nagar and Airport Road. Admissions open.',
  keywords: [
    'coaching classes in Indore',
    'best CBSE coaching Indore',
    'ICSE coaching classes Indore',
    'MP Board coaching Indore',
    'Class 10 board coaching Indore',
    'Class 12 PCM PCB coaching Indore',
    'Commerce coaching Indore',
    'CUET coaching Indore',
    'coaching in Usha Nagar Indore',
    'coaching near Airport Road Indore',
    'ALIVE Institute Indore',
  ],
  alternates: {
    canonical: 'https://aliveinstitute.in',
  },
  openGraph: {
    title: 'ALIVE Institute Indore | Premier Coaching for Class 6–12',
    description:
      'Indore’s premier coaching institute for Class 6th to 12th students. Specialized batches for CBSE, ICSE, and MP Board across PCM, PCB, and Commerce.',
    url: 'https://aliveinstitute.in',
    siteName: 'ALIVE Institute Indore',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALIVE Institute Indore | Premier Coaching for Class 6–12',
    description:
      'Specialized batches for CBSE, ICSE, and MP Board with campuses at Usha Nagar and Airport Road, Indore.',
  },
};

const faqs = [
  {
    question: 'Which classes and boards are coached at ALIVE Institute in Indore?',
    answer:
      'ALIVE Institute provides dedicated coaching for Class 6th to 12th students across CBSE, ICSE, and MP Board curricula. Our specialized programs encompass Middle School Foundation (Class 6–8), High School Board Prep (Class 9–10), and Senior Secondary streams (Class 11–12 PCM, PCB, and Commerce), alongside CUET competitive coaching.',
  },
  {
    question: 'Where are ALIVE Institute campuses located in Indore?',
    answer:
      'We operate two accessible campuses in Indore: our Main Center is located at 380-B, Usha Nagar Extension (Behind Kidzee Pre-School), and our second branch is located at 13, Vyanktesh Nagar, Above LIC Office, Airport Road. Both branches feature well-lit modern classrooms, dedicated faculty spaces, and library facilities.',
  },
  {
    question: 'What is the student-to-teacher ratio and batch size?',
    answer:
      'We adhere to a strict batch size limit of 20 to 25 students per batch. This allows our educators to provide personalized attention, observe each learner’s specific problem-solving techniques, and conduct 1:1 doubt-clearing sessions.',
  },
  {
    question: 'How does ALIVE Institute assess and report student progress?',
    answer:
      'We implement a continuous assessment framework consisting of weekly topic quizzes, chapter-wise analytical evaluations, and full-length simulated board examinations. Detailed performance metrics and attendance analytics are shared regularly with parents.',
  },
  {
    question: 'Can new students attend a trial class or diagnostic counseling session?',
    answer:
      'Yes, we offer complimentary diagnostic counseling and demo sessions. This allows prospective students to experience our concept-first teaching methodology and discuss their academic targets before formal admission.',
  },
  {
    question: 'Does ALIVE Institute offer entrance exam coaching for CUET?',
    answer:
      'Yes, our senior secondary curriculum integrates specialized CUET preparation. We provide subject-wise question banks, speed-building test series, and negative-marking strategy drills alongside core board syllabus coverage.',
  },
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': 'https://aliveinstitute.in/#organization',
  name: 'ALIVE Institute',
  legalName: 'ALIVE Institute Indore',
  url: 'https://aliveinstitute.in',
  logo: 'https://aliveinstitute.in/alive-logo.png',
  image: 'https://aliveinstitute.in/og-image.jpg',
  description:
    'Indore’s premier coaching institute for Class 6th to 12th students across CBSE, ICSE, and MP Board. Specialized coaching in PCM, PCB, Commerce, and CUET.',
  telephone: '+919302204651',
  email: 'contact@aliveinstitute.in',
  priceRange: '₹₹',
  foundingDate: '2012',
  sameAs: [
    'https://www.instagram.com/aliveinstituteindore/',
    'https://www.youtube.com/@aliveinstituteindore',
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '380-B, Usha Nagar Extension, Behind Kidzee Pre-School',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: '452009',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '13, Vyanktesh Nagar, Above LIC Office, Airport Road',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: '452005',
      addressCountry: 'IN',
    },
  ],
  geo: [
    {
      '@type': 'GeoCoordinates',
      latitude: 22.7058,
      longitude: 75.8398,
    },
    {
      '@type': 'GeoCoordinates',
      latitude: 22.738,
      longitude: 75.8239,
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:30',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
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
              <span>Admissions Open 2026–27 • Established 2012</span>
            </div>

            <h1 className="hero-title">
              Where Learning Comes <em className="hero-em">Alive</em>
            </h1>

            <p className="hero-lead">
              Since 2012, ALIVE Institute has helped 2,000+ students succeed in CBSE, ICSE &amp; MP Board
              examinations through expert faculty, 1:1 mentorship, and concept-first board + CUET preparation in Indore.
            </p>

            <div className="hero-actions">
              <Link href="/courses" className="btn btn-accent btn-lg">
                Explore Our Courses
              </Link>
              <Link href="/contact" className="btn btn-outline-hero btn-lg">
                Contact Admissions
              </Link>
              <a
                href="https://wa.me/919752997597?text=Hello%20ALIVE%20Institute%2C%20I%20would%20like%20to%20enquire%20about%20admissions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp-hero btn-lg"
                aria-label="Chat with ALIVE Institute on WhatsApp at +91 97529 97597"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Large Crisp Classroom Showcase */}
            <div className="hero-showcase" role="img" aria-label="Dr. Aditi Agrawal teaching biology and genetics with interactive smart board at ALIVE Institute Indore">
              <div className="hero-image-frame">
                <img
                  src="/images/alive-classroom-hero.jpg"
                  alt="Dr. Aditi Agrawal teaching concept-first biology & genetics on smart board to students at ALIVE Institute Indore"
                  className="hero-classroom-image"
                  width={1280}
                  height={736}
                  loading="eager"
                />
                <div className="hero-image-pill">
                  <span className="hero-pill-pulse" aria-hidden="true" />
                  <span>Interactive Smart Classroom • Concept-First Teaching</span>
                </div>
              </div>
            </div>

            {/* Stat bar below */}
            <div className="hero-stat-bar" role="region" aria-label="Key Institute Facts">
              <div className="stat-item">
                <span className="stat-label">Students Mentored</span>
                <span className="stat-value">2,000+ Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Academic Legacy</span>
                <span className="stat-value">12+ Years (Est. 2012)</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Indore Campuses</span>
                <span className="stat-value">Usha Nagar &amp; Airport Rd</span>
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

              <div className="approach-focus-card">
                <div className="focus-header">
                  <span className="focus-pill">Academic Standard</span>
                  <span className="focus-tag">Class 6 to 12</span>
                </div>
                <div className="focus-metrics">
                  <div className="metric-cell">
                    <strong>20–25</strong>
                    <span>Max Batch Size</span>
                  </div>
                  <div className="metric-cell">
                    <strong>Weekly</strong>
                    <span>Diagnostic Tests</span>
                  </div>
                  <div className="metric-cell">
                    <strong>1:1</strong>
                    <span>Doubt Guidance</span>
                  </div>
                </div>
                <p className="focus-note">
                  Every batch follows board-calibrated rubrics designed specifically for CBSE, ICSE, and MP Board scoring patterns.
                </p>
              </div>
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

      {/* ── 5. Frequently Asked Questions (SEO FAQPage) ── */}
      <section className="section home-faq" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-heading" className="heading-2">
              Common Questions About ALIVE Institute
            </h2>
            <p className="section-lead">
              Everything parents and students need to know about our batches, curriculum coverage, and admissions in Indore.
            </p>
          </div>

          <div className="faq-grid" role="region" aria-label="Institute FAQs">
            {faqs.map((faq, index) => (
              <details key={index} className="faq-item" open={index === 0}>
                <summary className="faq-question">
                  <span>{faq.question}</span>
                  <ChevronDownIcon size={20} className="faq-icon-chevron" aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Section ── */}
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

      {/* ── 7. Social Connect ── */}
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

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}

