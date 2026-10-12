'use client';

import React, { useState } from 'react';
import { courses } from '@/lib/data';

export interface FormState {
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
}

export const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    courseInterest: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    setIsSubmitting(true);

    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      courseInterest: '',
      message: '',
    });
    setIsSubmitted(false);
    setErrorMsg('');
  };

  if (isSubmitted) {
    return (
      <div className="form-success-box" role="status" aria-live="polite">
        <h3 className="form-success-title">Thank You, {formData.name}!</h3>
        <p className="form-success-message">
          Your enquiry regarding{' '}
          <strong>{formData.courseInterest || 'our programs'}</strong> has been
          received. Our admissions counselor will call you back at{' '}
          <strong>{formData.phone}</strong> within 1 business day.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-outline btn-sm"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      {errorMsg && (
        <div className="form-error" role="alert" style={{ marginBottom: 'var(--space-2)' }}>
          {errorMsg}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Student or Parent Name <span style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. Ramesh Sharma"
          className="form-input"
          autoComplete="name"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Contact Number <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 98765 43210"
            className="form-input"
            autoComplete="tel"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ramesh@example.com"
            className="form-input"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="courseInterest" className="form-label">
          Course of Interest
        </label>
        <select
          id="courseInterest"
          name="courseInterest"
          value={formData.courseInterest}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select a program...</option>
          {courses.map((course) => (
            <option key={course.id} value={course.title}>
              {course.title} ({course.classes})
            </option>
          ))}
          <option value="General Admission Enquiry">General Admission Enquiry</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message or Specific Questions (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Please share details such as student's current school, board, or any specific questions..."
          className="form-input form-textarea"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-accent btn-lg form-submit-btn"
      >
        {isSubmitting ? 'Submitting Enquiry...' : 'Send Admission Enquiry'}
      </button>

      <p className="body-small" style={{ textAlign: 'center', color: 'var(--color-gray-500)' }}>
        Your contact details remain confidential and are only used for academic counseling.
      </p>
    </form>
  );
};

export default EnquiryForm;
