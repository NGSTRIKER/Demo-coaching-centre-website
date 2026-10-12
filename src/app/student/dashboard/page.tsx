"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { MOCK_TESTS } from "@/lib/mock-data";
import "@/styles/student-dashboard.css";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [todayFormatted, setTodayFormatted] = React.useState<string>("Academic Session 2026–27");

  React.useEffect(() => {
    try {
      const formatted = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date());
      setTodayFormatted(formatted);
    } catch {
      // fallback preserved
    }
  }, []);

  const availableTests = MOCK_TESTS;

  return (
    <div className="student-dashboard">
      {/* Welcome Hero */}
      <section className="dashboard-hero">
        <div className="hero-text">
          <h1>Welcome back, {user?.name || "Aarav"}!</h1>
          <p>Today is {todayFormatted} • Ready for today's problem practice?</p>
          <div className="hero-badge-group">
            <span className="hero-badge">Curriculum: CBSE Class 10</span>
            <span className="hero-badge">Term 2 Active</span>
          </div>
        </div>
      </section>

      {/* Quick Stats Row */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-blue" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-value">{availableTests.length}</span>
            <span className="stat-label">Available Tests</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-orange" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-value">1</span>
            <span className="stat-label">Completed Tests</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-green" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-value">85%</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-purple" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="stat-data">
            <span className="stat-value">4</span>
            <span className="stat-label">Saved Questions</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="actions-grid">
          <Link href="/student/canvas" className="action-tile" style={{ border: "2px solid var(--color-primary-light)", background: "var(--color-primary-muted)" }}>
            <span className="action-label" style={{ fontWeight: 700, color: "var(--color-primary-dark)" }}>AI Smart Canvas Board</span>
          </Link>
          <Link href="/student/tests" className="action-tile">
            <span className="action-label">Take an Assessment</span>
          </Link>
          <Link href="/student/results" className="action-tile">
            <span className="action-label">View Recent Scorecards</span>
          </Link>
          <Link href="/student/questions" className="action-tile">
            <span className="action-label">Review Bookmarks</span>
          </Link>
        </div>
      </section>

      {/* Available Tests Section */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Assigned & Available Tests</h2>
          <Link href="/student/tests" className="section-link">
            View All Tests →
          </Link>
        </div>

        <div className="tests-cards-grid">
          {availableTests.slice(0, 2).map((test) => (
            <div key={test.id} className="test-card">
              <div>
                <div className="test-card-top">
                  <span className="test-badge">{test.subject}</span>
                  <span style={{ fontSize: "12px", color: "var(--color-gray-500)" }}>{test.grade}</span>
                </div>
                <h3>{test.title}</h3>
                <div className="test-card-meta">
                  <span className="test-meta-item">
                    <span>Duration:</span> {test.durationMinutes} Mins
                  </span>
                  <span className="test-meta-item">
                    <span>Questions:</span> {test.questionCount}
                  </span>
                  <span className="test-meta-item">
                    <span>Marks:</span> {test.totalMarks} Total
                  </span>
                </div>
              </div>

              <div>
                <Link href={`/student/tests/${test.id}`} className="btn-start-test">
                  Start Assessment →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Results Section */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Recent Performance</h2>
          <Link href="/student/results" className="section-link">
            Performance History →
          </Link>
        </div>

        <div className="empty-state-card" style={{ textAlign: "left", alignItems: "flex-start", padding: "var(--space-6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <div>
              <span className="test-badge" style={{ background: "var(--color-success-light)", color: "var(--color-success)" }}>
                Completed • 17/20 (85%)
              </span>
              <h4 style={{ margin: "var(--space-2) 0 4px" }}>Class 10 Arithmetic Progressions Diagnostic</h4>
              <p style={{ margin: 0, fontSize: "var(--text-xs)" }}>Completed 2 days ago • 14 mins elapsed</p>
            </div>
            <Link href="/student/results" style={{ fontSize: "var(--text-xs)", color: "var(--color-primary)", fontWeight: 600 }}>
              Review Answers →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
