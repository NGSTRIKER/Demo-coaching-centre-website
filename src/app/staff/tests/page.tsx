"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_TESTS, TestItem } from "@/lib/mock-data";
import "@/styles/staff-tests.css";

export default function StaffTestsPage() {
  const [testsList, setTestsList] = useState<TestItem[]>(MOCK_TESTS);

  return (
    <div className="staff-tests-page">
      <div className="staff-tests-header">
        <div>
          <h1>Assessments & Question Banks</h1>
          <p>Author diagnostic mock exams, monitor completion rates, and manage grading criteria.</p>
        </div>
        <Link
          href="/staff/tests/new"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#fff",
            padding: "var(--space-2) var(--space-5)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--text-sm)",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          + Author New Test
        </Link>
      </div>

      <div className="tests-table-box">
        <table className="tests-table">
          <thead>
            <tr>
              <th>Test Title</th>
              <th>Class & Subject</th>
              <th>Questions</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Submissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testsList.map((test, idx) => (
              <tr key={test.id}>
                <td>
                  <strong>{test.title}</strong>
                  {test.id === "demo-test-101" && (
                    <span style={{ marginLeft: "8px", fontSize: "10px", background: "var(--color-accent-muted)", color: "var(--color-accent)", padding: "2px 6px", borderRadius: "4px" }}>
                      Live Demo
                    </span>
                  )}
                </td>
                <td>
                  {test.grade} • {test.subject}
                </td>
                <td>{test.questionCount} MCQs</td>
                <td>{test.durationMinutes} Mins</td>
                <td>
                  <span className="status-published">{test.status}</span>
                </td>
                <td>{idx === 0 ? "48 Students" : "29 Students"}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Link
                      href={`/student/tests/${test.id}`}
                      style={{
                        padding: "4px 8px",
                        border: "1px solid var(--color-gray-300)",
                        borderRadius: "4px",
                        fontSize: "12px",
                        color: "var(--color-primary)",
                        textDecoration: "none",
                      }}
                    >
                      Preview Test
                    </Link>
                    <button
                      onClick={() => alert(`Demo action: Analytics opened for ${test.title}`)}
                      style={{
                        padding: "4px 8px",
                        border: "1px solid var(--color-gray-300)",
                        borderRadius: "4px",
                        fontSize: "12px",
                        cursor: "pointer",
                        background: "none",
                      }}
                    >
                      Analytics
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
