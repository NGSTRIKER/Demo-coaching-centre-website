import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { courses } from '@/lib/data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { ArrowRightIcon } from '@/components/ui/SocialIcons';
import '@/styles/admissions.css';

export const metadata: Metadata = {
  title: 'Admissions | ALIVE Institute Indore',
  description:
    'Admissions guidance, enrolment process, and batch onboarding for Classes 6th to 12th at ALIVE Institute Indore.',
};

export default function AdmissionsPage() {
  const steps = [
    {
      number: '01',
      title: 'Initial Academic Enquiry & Consultation',
      description:
        'Connect with our admissions team online or walk into our Usha Nagar or Airport Road campus. We discuss the student’s current academic level, target board (CBSE, ICSE, or MP Board), and specific learning goals.',
      details: [
        'Review current syllabus and student report cards',
        'Discuss batch timings, stream choices, and student routines',
      ],
    },
    {
      number: '02',
      title: 'Diagnostic Assessment & Student Interaction',
      description:
        'We conduct an informal, low-stress diagnostic test in fundamental mathematics and scientific concepts. This helps teachers understand existing strengths and knowledge gaps rather than acting as an eliminator.',
      details: [
        'Identifies foundational gaps before batch allocation',
        'One-on-one feedback shared transparently with parents',
      ],
    },
    {
      number: '03',
      title: 'Batch Allocation & Academic Orientation',
      description:
        'Students are assigned to small batches aligned with their school timetable and board curriculum. Prior to formal lectures, an orientation introduces study material, homework submission workflows, and faculty mentorship.',
      details: [
        'Distribution of course notes and formula booklets',
        'Student and parent portal / notification group onboarding',
      ],
    },
    {
      number: '04',
      title: 'Continuous Classroom Learning & Mentorship',
      description:
        'Lectures begin with rigorous concept explanations, followed by classroom problem solving, weekly tests, and dedicated Saturday doubt counters.',
      details: [
        'Weekly attendance & test performance SMS / reports',
        'Regular parent-teacher feedback sessions',
      ],
    },
  ];

  const expectations = [
    {
      title: 'Small Cohorts',
      description:
        'We cap batches strictly to ensure instructors recognize each student by name and track their personal learning curve.',
    },
    {
      title: 'Dedicated Doubt Desk',
      description:
        'Students do not have to wait until test week to ask questions; faculty hours are scheduled specifically for individual queries.',
    },
    {
      title: 'Board-Specific Rigor',
      description:
        'Targeted mock exams and evaluation rubrics matched to the specific marking guidelines of CBSE, ICSE, and MP Board.',
    },
    {
      title: 'No Fabricated Promises',
      description:
        'We do not guarantee miraculous shortcuts. We provide structured, disciplined guidance that delivers real academic progress.',
    },
    {
      title: 'Parent Partnership',
      description:
        'Parents receive genuine updates regarding attendance, assessment scores, and classroom engagement without sugarcoating.',
    },
    {
      title: 'Comprehensive Study Notes',
      description:
        'Curated concept summaries, problem sets graded by difficulty, and revision checklists given to every enrolled student.',
    },
  ];

  return (
    <div className="admissions-page">
      {/* ── Hero Section ── */}
      <section className="admissions-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Admissions', href: '/admissions' }]} />

          <div className="admissions-hero-content">
            <p className="section-label">ENROLMENT &amp; ONBOARDING</p>
            <h1 className="admissions-hero-title">Admissions at ALIVE Institute</h1>
            <p className="admissions-hero-lead">
              Our admission process is transparent, structured, and focused on finding the right academic path for every student in Classes 6th through 12th.
            </p>
            <div className="admissions-hero-actions">
              <Link href="/contact" className="btn btn-accent btn-lg">
                Submit Admission Enquiry
              </Link>
              <Link href="/courses" className="btn btn-outline btn-lg">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admission Process Steps ── */}
      <section className="admissions-steps-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">HOW IT WORKS</p>
            <h2 className="heading-2">Step-by-Step Admission Process</h2>
            <p className="section-lead">
              From your initial enquiry to the first day of class, here is what you can expect when joining ALIVE Institute.
            </p>
          </div>

          <div className="steps-container">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-badge" aria-hidden="true">
                  {step.number}
                </div>
                <div className="step-body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <ul>
                    {step.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to Expect ── */}
      <section className="expect-section">
        <div className="container">
          <div className="section-header text-center">
            <p className="section-label">STUDENT EXPERIENCE</p>
            <h2 className="heading-2">What to Expect as an ALIVE Student</h2>
            <p className="section-lead">
              A supportive academic environment designed for disciplined growth and intellectual confidence.
            </p>
          </div>

          <div className="expect-grid">
            {expectations.map((item) => (
              <div key={item.title} className="expect-card">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Available Courses Summary ── */}
      <section className="admissions-courses-summary">
        <div className="container">
          <div className="section-header">
            <p className="section-label">ACADEMIC OFFERINGS</p>
            <h2 className="heading-2">Programs Open for Enrolment</h2>
            <p className="section-lead">
              Seats are filled on a first-come, first-evaluated basis to maintain small batch limits.
            </p>
          </div>

          <div className="courses-summary-table-wrapper">
            <table className="courses-summary-table">
              <thead>
                <tr>
                  <th>Program Name</th>
                  <th>Eligible Grades</th>
                  <th>Boards Supported</th>
                  <th>Typical Batch Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.title}</strong>
                    </td>
                    <td>{c.classes}</td>
                    <td>{c.boards.join(', ')}</td>
                    <td>{c.batchSize || '25 Students'}</td>
                    <td>
                      <Link
                        href={`/courses#${c.slug}`}
                        style={{
                          color: 'var(--color-primary)',
                          fontWeight: 600,
                          fontSize: 'var(--text-xs)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>Details</span>
                        <ArrowRightIcon size={12} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Callout box */}
          <div className="admissions-callout">
            <div className="admissions-callout-text">
              <h3>Ready to Discuss Your Enrolment?</h3>
              <p>
                Our counselors are available at both Usha Nagar and Airport Road centers to assist with syllabus queries, sample study materials, and batch schedules.
              </p>
            </div>
            <Link href="/contact" className="btn btn-accent btn-lg">
              <span>Contact Admissions Desk</span>
              <ArrowRightIcon size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
