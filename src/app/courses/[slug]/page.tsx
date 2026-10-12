import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CourseCard from '@/components/courses/CourseCard';
import { getCourses, getCourseBySlug } from '@/lib/data';
import '@/styles/courses.css';
import '@/styles/course-detail.css';

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allCourses = getCourses();
  return allCourses.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found | ALIVE Institute',
      description: 'The requested academic course could not be found.',
    };
  }

  return {
    title: `${course.title} — ${course.classes} | ALIVE Institute Indore`,
    description: course.shortDescription,
    openGraph: {
      title: `${course.title} | ALIVE Institute Indore`,
      description: course.shortDescription,
      url: `https://aliveinstitute.in/courses/${course.slug}`,
      type: 'article',
    },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const allCourses = getCourses();
  const relatedCourses = allCourses.filter((c) => c.slug !== course.slug).slice(0, 3);

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'ALIVE Institute Indore',
      sameAs: 'https://aliveinstitute.in',
    },
    educationalCredentialAwarded: course.classes,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.mode || 'Classroom',
      courseWorkload: course.duration || '1 Academic Year',
    },
  };

  return (
    <main className="course-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* ── Hero Section ── */}
      <section className="course-detail-hero">
        <div className="course-detail-container">
          <Breadcrumb
            items={[
              { label: 'Courses', href: '/courses' },
              { label: course.title },
            ]}
          />

          <div className="course-detail-hero-content">
            <div className="course-detail-top-tags">
              <span className="course-detail-category-badge">
                {course.category.toUpperCase()}
              </span>
              <span className="course-detail-class-badge">{course.classes}</span>
              {course.badge && (
                <span className="course-detail-class-badge">{course.badge}</span>
              )}
            </div>

            <h1 className="course-detail-title">{course.title}</h1>
            <p className="course-detail-lead">{course.shortDescription}</p>

            <div className="course-detail-quick-specs">
              <div className="spec-item">
                <span className="spec-label">Target Boards</span>
                <span className="spec-value">{course.boards.join(', ')}</span>
              </div>
              {course.duration && (
                <div className="spec-item">
                  <span className="spec-label">Program Duration</span>
                  <span className="spec-value">{course.duration}</span>
                </div>
              )}
              {course.batchSize && (
                <div className="spec-item">
                  <span className="spec-label">Batch Size</span>
                  <span className="spec-value">{course.batchSize}</span>
                </div>
              )}
              {course.mode && (
                <div className="spec-item">
                  <span className="spec-label">Mode of Delivery</span>
                  <span className="spec-value">{course.mode}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content + Sidebar Layout ── */}
      <div className="course-detail-container">
        <div className="course-detail-main-layout">
          <div className="course-detail-primary-content">
            {/* Overview / Description */}
            <section className="detail-block">
              <h2 className="detail-block-title">Program Overview</h2>
              <p className="detail-block-text">{course.description}</p>
            </section>

            {/* Subjects Covered */}
            {course.subjects && course.subjects.length > 0 && (
              <section className="detail-block">
                <h2 className="detail-block-title">Curriculum &amp; Subjects Covered</h2>
                <ul className="subjects-grid">
                  {course.subjects.map((subject) => (
                    <li key={subject} className="subject-item-card">
                      <span className="subject-dot" aria-hidden="true" />
                      <span className="subject-item-name">{subject}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Key Features */}
            {course.features && course.features.length > 0 && (
              <section className="detail-block">
                <h2 className="detail-block-title">Key Program Highlights</h2>
                <ul className="features-list">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="feature-check-icon" aria-hidden="true">
                        ✓
                      </span>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Pedagogical Methodology */}
            <section className="detail-block">
              <h2 className="detail-block-title">Our Pedagogical Framework</h2>
              <div className="methodology-grid">
                <div className="methodology-card">
                  <span className="methodology-num">Pillar 01</span>
                  <h3 className="methodology-heading">Conceptual First-Principles</h3>
                  <p className="methodology-desc">
                    Rather than rote memorization, topics are built from fundamental derivations
                    and interactive visual models so students retain core logic effortlessly.
                  </p>
                </div>

                <div className="methodology-card">
                  <span className="methodology-num">Pillar 02</span>
                  <h3 className="methodology-heading">Tiered Problem Sheets</h3>
                  <p className="methodology-desc">
                    Graded assignments spanning Level 1 (Board Textbook Mastery), Level 2
                    (Exemplar &amp; Higher Order), and Level 3 (Competitive Application).
                  </p>
                </div>

                <div className="methodology-card">
                  <span className="methodology-num">Pillar 03</span>
                  <h3 className="methodology-heading">Weekly Diagnostic Tests</h3>
                  <p className="methodology-desc">
                    Continuous feedback with line-by-line step marking that mirrors board rubric
                    standards, highlighting calculation flaws and time bottlenecks.
                  </p>
                </div>

                <div className="methodology-card">
                  <span className="methodology-num">Pillar 04</span>
                  <h3 className="methodology-heading">Personalized Doubt Clinics</h3>
                  <p className="methodology-desc">
                    Dedicated Saturday 1-on-1 doubt clearing slots ensuring no learner carries
                    unresolved queries into subsequent chapters.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Enrollment Card Sidebar */}
          <aside className="course-detail-sidebar">
            <div className="course-sidebar-card">
              <h3 className="sidebar-title">Enroll in this Program</h3>
              <p className="sidebar-subtitle">
                Admissions for academic sessions are open at our Indore campuses. Limited batch capacity.
              </p>

              <ul className="sidebar-highlights">
                <li className="sidebar-highlight-item">
                  <span className="sidebar-highlight-label">Eligible Classes:</span>
                  <span className="sidebar-highlight-val">{course.classes}</span>
                </li>
                <li className="sidebar-highlight-item">
                  <span className="sidebar-highlight-label">Batch Size:</span>
                  <span className="sidebar-highlight-val">{course.batchSize || 'Max 25'}</span>
                </li>
                <li className="sidebar-highlight-item">
                  <span className="sidebar-highlight-label">Locations:</span>
                  <span className="sidebar-highlight-val">Usha Nagar &amp; Airport Rd</span>
                </li>
                <li className="sidebar-highlight-item">
                  <span className="sidebar-highlight-label">Study Material:</span>
                  <span className="sidebar-highlight-val">Included</span>
                </li>
              </ul>

              <div className="sidebar-actions">
                <Link href="/contact" className="sidebar-btn-primary">
                  Inquire for Admission
                </Link>
                <Link href="/test" className="sidebar-btn-secondary">
                  Take Diagnostic Test
                </Link>
              </div>

              <p className="sidebar-help-note">
                Need immediate details? Call us at <strong>+91 84015 58669</strong> or visit our centers.
              </p>
            </div>
          </aside>
        </div>

        {/* ── Related Courses ── */}
        {relatedCourses.length > 0 && (
          <section className="related-courses-section">
            <div className="related-courses-header">
              <span className="related-section-label">EXPLORE MORE</span>
              <h2 className="related-courses-title">Other Academic Programs</h2>
            </div>

            <div className="related-courses-grid">
              {relatedCourses.map((relCourse) => (
                <CourseCard key={relCourse.id} course={relCourse} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
