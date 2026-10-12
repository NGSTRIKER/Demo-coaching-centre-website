"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DEMO_TEST_QUESTIONS, Question } from "@/lib/mock-data";
import "@/styles/student-questions.css";

export default function SavedQuestionsPage() {
  const [savedItems, setSavedItems] = useState<Question[]>([
    DEMO_TEST_QUESTIONS[0],
    DEMO_TEST_QUESTIONS[2],
  ]);

  const handleRemove = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="student-questions-page">
      <div className="questions-header">
        <h1>Saved & Bookmarked Questions</h1>
        <p>Curated problems you have flagged for revision before board exams or class tests.</p>
      </div>

      {savedItems.length > 0 ? (
        <div className="saved-questions-list">
          {savedItems.map((q) => (
            <div key={q.id} className="saved-card">
              <div className="saved-card-top">
                <span className="topic-tag">{q.topic} • {q.subject}</span>
                <button
                  onClick={() => handleRemove(q.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-gray-500)",
                    fontSize: "var(--text-xs)",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Remove Bookmark
                </button>
              </div>

              <div className="saved-card-text">{q.text}</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-2)" }}>
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    style={{
                      fontSize: "var(--text-xs)",
                      padding: "6px 10px",
                      background: opt.id === q.correctOptionId ? "var(--color-success-light)" : "var(--color-gray-50)",
                      border: opt.id === q.correctOptionId ? "1px solid var(--color-success)" : "1px solid var(--color-gray-200)",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: opt.id === q.correctOptionId ? "bold" : "normal",
                      color: opt.id === q.correctOptionId ? "var(--color-success)" : "inherit",
                    }}
                  >
                    <strong>{opt.label}.</strong> {opt.text} {opt.id === q.correctOptionId && "✓"}
                  </div>
                ))}
              </div>

              <div className="saved-card-solution">
                <strong>Solution / Hint:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-questions-card">
          <div className="icon">🔖</div>
          <h3>No Bookmarked Questions Yet</h3>
          <p>
            When taking tests or viewing results, click the "Save Question" button to build your personal revision bank.
          </p>
          <Link
            href="/student/tests"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-white)",
              padding: "var(--space-3) var(--space-6)",
              borderRadius: "var(--radius-md)",
              fontWeight: "bold",
              textDecoration: "none",
              marginTop: "var(--space-4)",
            }}
          >
            Explore Available Tests →
          </Link>
        </div>
      )}
    </div>
  );
}
