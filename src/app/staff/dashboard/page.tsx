"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { MOCK_COURSES, MOCK_TESTS, MOCK_STUDENTS, MOCK_ENQUIRIES } from "@/lib/mock-data";
import "@/styles/staff-dashboard.css";

export default function StaffDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="staff-dashboard">
      <div className="staff-header-banner">
        <div>
          <h1>Faculty Workspace — {user?.name || "Dr. Sunita Sen"}</h1>
          <p>Curriculum oversight, assessment authoring, student performance monitoring.</p>
        </div>
        <Link
          href="/staff/tests/new"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            padding: "var(--space-2) var(--space-5)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--text-sm)",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          + Create Assessment
        </Link>
      </div>

      {/* Stats Row */}
      <div className="staff-stats-grid">
        <div className="staff-stat-box">
          <span className="staff-stat-label">Active Courses</span>
          <span className="staff-stat-num">{MOCK_COURSES.length}</span>
          <span className="staff-stat-sub">Across Classes 9 - 12</span>
        </div>

        <div className="staff-stat-box">
          <span className="staff-stat-label">Published Tests</span>
          <span className="staff-stat-num">{MOCK_TESTS.length}</span>
          <span className="staff-stat-sub">3 Active Assessments</span>
        </div>

        <div className="staff-stat-box">
          <span className="staff-stat-label">Enrolled Students</span>
          <span className="staff-stat-num">{MOCK_STUDENTS.length * 48}</span>
          <span className="staff-stat-sub">+12 this month</span>
        </div>

        <div className="staff-stat-box">
          <span className="staff-stat-label">Pending Enquiries</span>
          <span className="staff-stat-num">{MOCK_ENQUIRIES.length}</span>
          <span className="staff-stat-sub" style={{ color: "#d97706" }}>
            Requires Follow-up
          </span>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="staff-two-col">
        {/* Activity Feed */}
        <div className="staff-card-panel">
          <div className="staff-panel-header">
            <h2>Recent Institute Activity</h2>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gray-500)" }}>Live Feed</span>
          </div>

          <div className="activity-feed">
            <div className="activity-item">
              <div className="activity-icon-bubble" aria-hidden="true">•</div>
              <div className="activity-content">
                <div>
                  <strong>Aarav Sharma</strong> submitted <em>Class 10 Mathematics Demo Assessment</em>
                </div>
                <div className="activity-time">24 minutes ago • Score: 16/20 (80%)</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-bubble" aria-hidden="true">•</div>
              <div className="activity-content">
                <div>
                  New enquiry from <strong>Meera Krishnan (Parent)</strong> for Class 10 Booster
                </div>
                <div className="activity-time">2 hours ago • Status: New</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-bubble" aria-hidden="true">•</div>
              <div className="activity-content">
                <div>
                  <strong>Diya Narang</strong> completed <em>Polynomials &amp; Quadratic Equations Test</em>
                </div>
                <div className="activity-time">5 hours ago • Score: 36/40 (90%)</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon-bubble" aria-hidden="true">•</div>
              <div className="activity-content">
                <div>
                  Faculty curriculum updated for <strong>Class 11 Calculus Intensive</strong>
                </div>
                <div className="activity-time">Yesterday at 4:30 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="staff-card-panel">
          <div className="staff-panel-header">
            <h2>Faculty Controls</h2>
          </div>

          <div className="staff-quick-actions-list">
            <Link href="/staff/tests/new" className="staff-action-link-btn">
              <span>Author New Assessment</span>
              <span>→</span>
            </Link>
            <Link href="/staff/courses" className="staff-action-link-btn">
              <span>Manage Course Batches</span>
              <span>→</span>
            </Link>
            <Link href="/staff/students" className="staff-action-link-btn">
              <span>Student Performance Ledger</span>
              <span>→</span>
            </Link>
            <Link href="/staff/enquiries" className="staff-action-link-btn">
              <span>Admission Enquiries</span>
              <span>→</span>
            </Link>
            <Link href="/staff/tests" className="staff-action-link-btn">
              <span>View All Test Submissions</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
