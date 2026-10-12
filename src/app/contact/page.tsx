import React from 'react';
import type { Metadata } from 'next';
import { branches, instituteInfo } from '@/lib/data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EnquiryForm from '@/components/forms/EnquiryForm';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ArrowRightIcon,
} from '@/components/ui/SocialIcons';
import '@/styles/contact.css';

export const metadata: Metadata = {
  title: 'Contact Us | ALIVE Institute Indore',
  description:
    'Get in touch with ALIVE Institute. Visit our Usha Nagar or Airport Road centers in Indore, call our academic counselors, or submit an online admission enquiry.',
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* ── Hero Section ── */}
      <section className="contact-hero">
        <div className="container">
          <Breadcrumb items={[{ label: 'Contact Us', href: '/contact' }]} />

          <div className="contact-hero-content">
            <p className="section-label">GET IN TOUCH</p>
            <h1 className="contact-hero-title">Contact ALIVE Institute</h1>
            <p className="contact-hero-lead">
              Have questions regarding admissions, batch timings, or our curriculum? Visit either of our Indore branches or send us an enquiry below.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Layout: Contact Info & Enquiry Form ── */}
      <section className="section" style={{ paddingTop: 'var(--space-8)' }}>
        <div className="container">
          <div className="contact-layout">
            {/* Left Column: Branch Directory & Direct Details */}
            <div className="contact-info-col">
              <div>
                <p className="section-label">CAMPUS DIRECTORY</p>
                <h2 className="heading-3" style={{ marginBottom: 'var(--space-4)' }}>
                  Our Centers in Indore
                </h2>
              </div>

              {branches.map((branch) => (
                <div key={branch.id} className="branch-contact-card">
                  <div className="branch-contact-header">
                    <h3 className="branch-contact-title">{branch.name}</h3>
                    {branch.isMain && (
                      <span className="branch-contact-badge">Main Branch</span>
                    )}
                  </div>

                  <div className="branch-details-list">
                    <div className="branch-detail-row">
                      <MapPinIcon size={18} aria-hidden="true" />
                      <div className="branch-detail-content">
                        <strong>Address &amp; Landmark</strong>
                        <span>
                          {branch.address}, {branch.city}, {branch.state} — {branch.pincode}
                        </span>
                        <div style={{ marginTop: 'var(--space-1)' }}>
                          <a
                            href={
                              branch.googleMapsUrl ||
                              `https://maps.google.com/?q=${encodeURIComponent(
                                branch.address + ' Indore'
                              )}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 'var(--text-xs)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <span>Open in Google Maps</span>
                            <ArrowRightIcon size={10} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="branch-detail-row">
                      <PhoneIcon size={18} aria-hidden="true" />
                      <div className="branch-detail-content">
                        <strong>Telephone / WhatsApp</strong>
                        <a href={`tel:${branch.phone}`}>{branch.displayPhone}</a>
                      </div>
                    </div>

                    <div className="branch-detail-row">
                      <MailIcon size={18} aria-hidden="true" />
                      <div className="branch-detail-content">
                        <strong>Center Email</strong>
                        <a href={`mailto:${branch.email}`}>{branch.email}</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="general-contact-card">
                <h4>Center Operating Hours</h4>
                <p>
                  <strong>Monday &ndash; Saturday:</strong> 8:00 AM &ndash; 8:00 PM<br />
                  <strong>Sunday:</strong> 9:00 AM &ndash; 2:00 PM (Doubt Counters &amp; Test Sessions)
                </p>
                <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)' }}>
                  For general administrative queries, contact central desk:{' '}
                  <a href={`tel:${instituteInfo.generalPhone}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    {instituteInfo.displayPhone}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column: Admission Enquiry Form */}
            <div className="contact-form-wrapper">
              <div className="form-header">
                <p className="section-label">ONLINE ENQUIRY</p>
                <h2>Send an Admission Enquiry</h2>
                <p>
                  Fill out the form below. An academic counselor will contact you to discuss batch availability, syllabus schedule, and fee details.
                </p>
              </div>

              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
