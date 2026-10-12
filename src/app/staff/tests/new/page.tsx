"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Question } from "@/lib/mock-data";
import "@/styles/test-create.css";

export default function NewTestPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Test details
  const [testTitle, setTestTitle] = useState("");
  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Class 10");
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [passingMarks, setPassingMarks] = useState(8);

  // Step 2: Questions list
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "q-new-1",
      questionNumber: 1,
      text: "If α and β are the zeroes of the polynomial f(x) = x² - 5x + k such that α - β = 1, find the value of k.",
      options: [
        { id: "opt-1", label: "A", text: "6" },
        { id: "opt-2", label: "B", text: "5" },
        { id: "opt-3", label: "C", text: "4" },
        { id: "opt-4", label: "D", text: "12" },
      ],
      correctOptionId: "opt-1",
      marks: 4,
      explanation: "Using (α - β)² = (α + β)² - 4αβ: 1² = 5² - 4k => 1 = 25 - 4k => 4k = 24 => k = 6.",
      subject: "Mathematics",
      topic: "Polynomials",
    },
  ]);

  // Current question draft
  const [draftQText, setDraftQText] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [correctOpt, setCorrectOpt] = useState("opt-a");
  const [draftMarks, setDraftMarks] = useState(4);
  const [draftExplanation, setDraftExplanation] = useState("");
  const [draftTopic, setDraftTopic] = useState("Algebra");

  const handleAddQuestion = () => {
    if (!draftQText || !optA || !optB) {
      alert("Please fill question text and at least options A & B.");
      return;
    }

    const newQ: Question = {
      id: "q-" + Date.now(),
      questionNumber: questions.length + 1,
      text: draftQText,
      options: [
        { id: "opt-a", label: "A", text: optA },
        { id: "opt-b", label: "B", text: optB },
        { id: "opt-c", label: "C", text: optC || "None of the above" },
        { id: "opt-d", label: "D", text: optD || "Cannot be determined" },
      ],
      correctOptionId: correctOpt,
      marks: draftMarks,
      explanation: draftExplanation || "Standard textbook concept.",
      subject: subject,
      topic: draftTopic,
    };

    setQuestions([...questions, newQ]);
    // Reset draft fields
    setDraftQText("");
    setOptA("");
    setOptB("");
    setOptC("");
    setOptD("");
    setDraftExplanation("");
  };

  const handlePublish = () => {
    alert("Assessment published successfully! It is now accessible on the Student Portal.");
    router.push("/staff/tests");
  };

  return (
    <div className="test-create-page">
      <div className="create-header">
        <h1>Author Assessment Paper</h1>
        <p>Curate questions, set timings, configure scoring rules and release to student cohorts.</p>
      </div>

      {/* Wizard Progress */}
      <div className="wizard-steps">
        <div className={`wizard-step-item ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}>
          <div className="step-number-circle">{step > 1 ? "✓" : "1"}</div>
          <span>Step 1: Test Details</span>
        </div>
        <div className={`wizard-step-item ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}>
          <div className="step-number-circle">{step > 2 ? "✓" : "2"}</div>
          <span>Step 2: Add Questions ({questions.length})</span>
        </div>
        <div className={`wizard-step-item ${step === 3 ? "active" : ""}`}>
          <div className="step-number-circle">3</div>
          <span>Step 3: Review & Publish</span>
        </div>
      </div>

      {/* STEP 1: Details */}
      {step === 1 && (
        <div className="form-card">
          <h2 style={{ fontSize: "var(--text-lg)" }}>Assessment Metadata</h2>

          <div>
            <label className="input-label">Assessment Title</label>
            <input
              type="text"
              className="form-field"
              placeholder="e.g. Class 10 Trigonometry & Identities Mastery Test"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-grid-2">
            <div>
              <label className="input-label">Subject</label>
              <select className="form-field" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <div>
              <label className="input-label">Target Class</label>
              <select className="form-field" value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div>
              <label className="input-label">Time Limit (Minutes)</label>
              <input
                type="number"
                className="form-field"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                min={5}
                max={180}
              />
            </div>

            <div>
              <label className="input-label">Passing Marks</label>
              <input
                type="number"
                className="form-field"
                value={passingMarks}
                onChange={(e) => setPassingMarks(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>

          <div className="wizard-footer-actions">
            <Link href="/staff/tests" style={{ color: "var(--color-gray-600)", textDecoration: "none" }}>
              ← Cancel
            </Link>
            <button
              type="button"
              onClick={() => {
                if (!testTitle) {
                  alert("Please specify a test title.");
                  return;
                }
                setStep(2);
              }}
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Continue to Questions →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Questions */}
      {step === 2 && (
        <div className="form-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: "var(--text-lg)" }}>Questions Roster ({questions.length} Ready)</h2>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--color-gray-600)" }}>
              Total Marks: {questions.reduce((acc, q) => acc + q.marks, 0)}
            </span>
          </div>

          {/* Existing questions mini pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {questions.map((q, idx) => (
              <div
                key={q.id}
                style={{
                  background: "var(--color-gray-50)",
                  border: "1px solid var(--color-gray-200)",
                  padding: "10px 14px",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "var(--text-sm)" }}>
                  <strong>Q{idx + 1}.</strong> {q.text.slice(0, 60)}...
                </span>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--color-success)", fontWeight: "bold" }}>
                  +{q.marks} Marks
                </span>
              </div>
            ))}
          </div>

          {/* Builder Form */}
          <div className="question-builder-box">
            <h3 style={{ fontSize: "var(--text-sm)", color: "var(--color-primary)" }}>+ Add Another Question</h3>

            <div>
              <label className="input-label">Question Text</label>
              <textarea
                className="form-field"
                rows={3}
                placeholder="Enter mathematical problem statement..."
                value={draftQText}
                onChange={(e) => setDraftQText(e.target.value)}
              />
            </div>

            <div className="options-builder-grid">
              <div className="option-builder-field">
                <span className="option-badge-label">A.</span>
                <input
                  type="text"
                  className="form-field"
                  placeholder="Option A"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                />
              </div>
              <div className="option-builder-field">
                <span className="option-badge-label">B.</span>
                <input
                  type="text"
                  className="form-field"
                  placeholder="Option B"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                />
              </div>
              <div className="option-builder-field">
                <span className="option-badge-label">C.</span>
                <input
                  type="text"
                  className="form-field"
                  placeholder="Option C"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                />
              </div>
              <div className="option-builder-field">
                <span className="option-badge-label">D.</span>
                <input
                  type="text"
                  className="form-field"
                  placeholder="Option D"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div>
                <label className="input-label">Correct Option</label>
                <select className="form-field" value={correctOpt} onChange={(e) => setCorrectOpt(e.target.value)}>
                  <option value="opt-a">Option A</option>
                  <option value="opt-b">Option B</option>
                  <option value="opt-c">Option C</option>
                  <option value="opt-d">Option D</option>
                </select>
              </div>

              <div>
                <label className="input-label">Marks</label>
                <input
                  type="number"
                  className="form-field"
                  value={draftMarks}
                  onChange={(e) => setDraftMarks(Number(e.target.value))}
                  min={1}
                />
              </div>
            </div>

            <div>
              <label className="input-label">Step-by-Step Explanation / Proof</label>
              <textarea
                className="form-field"
                rows={2}
                placeholder="Walkthrough shown to students upon test submission..."
                value={draftExplanation}
                onChange={(e) => setDraftExplanation(e.target.value)}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleAddQuestion}
                style={{
                  backgroundColor: "var(--color-primary-muted)",
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-primary)",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                + Append Question to Paper
              </button>
            </div>
          </div>

          <div className="wizard-footer-actions">
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-gray-600)" }}
            >
              ← Back to Details
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Review Test Paper →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review & Publish */}
      {step === 3 && (
        <div className="form-card">
          <h2 style={{ fontSize: "var(--text-lg)" }}>Final Review Before Publishing</h2>

          <div style={{ background: "var(--color-gray-50)", padding: "var(--space-5)", borderRadius: "var(--radius-lg)", border: "var(--border-thin)" }}>
            <h3 style={{ margin: "0 0 8px 0" }}>{testTitle || "Class 10 Trigonometry & Identities Mastery Test"}</h3>
            <p style={{ margin: "0 0 12px 0", fontSize: "var(--text-sm)", color: "var(--color-gray-600)" }}>
              {grade} • {subject} • {durationMinutes} Minutes Duration • Passing Marks: {passingMarks}
            </p>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--color-primary)", fontWeight: "bold" }}>
              Total Questions: {questions.length} | Total Paper Marks: {questions.reduce((a, b) => a + b.marks, 0)}
            </div>
          </div>

          <div className="wizard-footer-actions">
            <button
              type="button"
              onClick={() => setStep(2)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-gray-600)" }}
            >
              ← Back to Questions
            </button>
            <button
              type="button"
              onClick={handlePublish}
              style={{
                backgroundColor: "var(--color-success)",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "6px",
                border: "none",
                fontSize: "var(--text-base)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Publish Assessment Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
