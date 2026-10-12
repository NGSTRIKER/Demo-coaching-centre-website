"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StudentResult } from "@/lib/mock-data";
import "@/styles/student-results.css";

const defaultMockResults: StudentResult[] = [
  {
    id: "res-initial-1",
    testId: "demo-test-101",
    testTitle: "Class 10 Mathematics — Demo Assessment",
    subject: "Mathematics",
    date: "10 Oct 2026",
    score: 16,
    totalMarks: 20,
    percentage: 80,
    timeTakenMinutes: 11,
    accuracy: 80,
    totalQuestions: 5,
    correctCount: 4,
    incorrectCount: 1,
    unansweredCount: 0,
    userAnswers: {},
  },
];

export default function StudentResultsPage() {
  const [results, setResults] = useState<StudentResult[]>(defaultMockResults);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("alive_test_results");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResults(parsed);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  return (
    <div className="student-results-page">
      <div className="results-header">
        <h1>Assessment Performance & Scorecards</h1>
        <p>Review historical tests, track answer accuracy, and analyze your preparation journey.</p>
      </div>

      {results.length > 0 ? (
        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Subject</th>
                <th>Attempt Date</th>
                <th>Time Spent</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => {
                const isPassed = res.percentage >= 40;
                return (
                  <tr key={res.id}>
                    <td>
                      <strong>{res.testTitle}</strong>
                    </td>
                    <td>{res.subject}</td>
                    <td>{res.date}</td>
                    <td>{res.timeTakenMinutes} mins</td>
                    <td>
                      {res.score} / {res.totalMarks}
                    </td>
                    <td>
                      <span className={`score-badge-pill ${isPassed ? "passed" : "failed"}`}>
                        {res.percentage}% {isPassed ? "✓ Passed" : "Needs Work"}
                      </span>
                    </td>
                    <td>
                      <Link href={`/student/tests/${res.testId}`} className="btn-review-link">
                        Re-take / Practice →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-results-box">
          <div className="icon">📝</div>
          <h3>No Assessment Attempts Found</h3>
          <p>
            You have not attempted any assessments yet. Begin with the Class 10 Demo Assessment to evaluate your preparation level.
          </p>
          <Link
            href="/student/tests/demo-test-101"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-white)",
              padding: "var(--space-3) var(--space-6)",
              borderRadius: "var(--radius-md)",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Take Demo Test Now
          </Link>
        </div>
      )}
    </div>
  );
}
