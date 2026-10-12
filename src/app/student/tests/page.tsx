"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_TESTS } from "@/lib/mock-data";
import "@/styles/student-tests.css";

export default function StudentTestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filteredTests = MOCK_TESTS.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "All" || test.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="student-tests-page">
      <div className="tests-header-box">
        <div>
          <h1>Assessments & Mock Exams</h1>
          <p>Practice under timed conditions with instant step-by-step solutions.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="tests-filter-bar">
        <div className="filter-input-wrap">
          <input
            type="text"
            className="filter-input"
            placeholder="Search by test name or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="All">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
        </select>
      </div>

      {/* Tests List */}
      <div className="tests-list-grid">
        {filteredTests.map((test) => (
          <div key={test.id} className="test-row-card">
            <div className="test-row-info">
              <div className="test-row-badge-row">
                <span className="badge-status-available">{test.subject}</span>
                <span className="badge-grade">{test.grade}</span>
                {test.id === "demo-test-101" && (
                  <span style={{ fontSize: "11px", background: "var(--color-accent-muted)", color: "var(--color-accent)", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>
                    ⭐ Featured Demo
                  </span>
                )}
              </div>
              <h2 className="test-row-title">{test.title}</h2>
              <div className="test-row-meta">
                <span className="test-row-meta-item">
                  <span>⏱️</span> {test.durationMinutes} Minutes
                </span>
                <span className="test-row-meta-item">
                  <span>❓</span> {test.questionCount} Questions
                </span>
                <span className="test-row-meta-item">
                  <span>🏆</span> {test.totalMarks} Marks Total
                </span>
                <span className="test-row-meta-item">
                  <span>🎯</span> Pass: {test.passingMarks} Marks
                </span>
              </div>
            </div>

            <div className="test-row-actions">
              <Link href={`/student/tests/${test.id}`} className="btn-primary-action">
                Start Test →
              </Link>
            </div>
          </div>
        ))}

        {filteredTests.length === 0 && (
          <div style={{ textAlign: "center", padding: "var(--space-12)", background: "white", borderRadius: "var(--radius-lg)" }}>
            <h3>No tests found</h3>
            <p style={{ color: "var(--color-gray-600)", fontSize: "var(--text-sm)" }}>Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
