"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";

import { MOCK_TESTS, TestItem, StudentResult } from "@/lib/mock-data";
import "@/styles/test-engine.css";

type EngineState = "instructions" | "active" | "submitted";

export default function TestEnginePage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const resolvedParams = use(params);

  // Find the test or fallback to the first mock test
  const currentTest: TestItem =
    MOCK_TESTS.find((t) => t.id === resolvedParams.testId) || MOCK_TESTS[0];

  const [engineState, setEngineState] = useState<EngineState>("instructions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({
    [currentTest.questions[0]?.id]: true,
  });

  // Timer countdown in seconds
  const totalSeconds = currentTest.durationMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<Record<string, boolean>>({});

  // Countdown effect
  useEffect(() => {
    if (engineState !== "active") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [engineState]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartTest = () => {
    setEngineState("active");
    setTimeLeft(currentTest.durationMinutes * 60);
    setVisitedQuestions({ [currentTest.questions[0]?.id]: true });
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleClearOption = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const toggleMarkForReview = (questionId: string) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < currentTest.questions.length) {
      setCurrentQuestionIndex(index);
      const targetQ = currentTest.questions[index];
      setVisitedQuestions((prev) => ({ ...prev, [targetQ.id]: true }));
    }
  };

  const toggleSaveBookmark = (questionId: string) => {
    setSavedQuestions((prev) => {
      const next = { ...prev, [questionId]: !prev[questionId] };
      try {
        localStorage.setItem("alive_saved_bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSubmitTest = () => {
    setIsSubmitModalOpen(false);
    setEngineState("submitted");

    // Calculate score
    let correct = 0;
    let incorrect = 0;
    let totalScore = 0;

    currentTest.questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      if (chosen === q.correctOptionId) {
        correct++;
        totalScore += q.marks;
      } else if (chosen) {
        incorrect++;
      }
    });

    const unanswered = currentTest.questions.length - (correct + incorrect);
    const percentage = Math.round((totalScore / currentTest.totalMarks) * 100);

    // Persist result in localStorage for the Student Results page
    const resultRecord: StudentResult = {
      id: "res-" + Date.now(),
      testId: currentTest.id,
      testTitle: currentTest.title,
      subject: currentTest.subject,
      date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date()),
      score: totalScore,
      totalMarks: currentTest.totalMarks,
      percentage,
      timeTakenMinutes: Math.round((totalSeconds - timeLeft) / 60) || 1,
      accuracy: (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0,
      totalQuestions: currentTest.questions.length,
      correctCount: correct,
      incorrectCount: incorrect,
      unansweredCount: unanswered,
      userAnswers: selectedAnswers,
    };

    try {
      const existing = localStorage.getItem("alive_test_results");
      const list: StudentResult[] = existing ? JSON.parse(existing) : [];
      list.unshift(resultRecord);
      localStorage.setItem("alive_test_results", JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  // Helper counts for modal
  const answeredCount = Object.keys(selectedAnswers).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = currentTest.questions.length - answeredCount;

  // Active Question
  const activeQ = currentTest.questions[currentQuestionIndex];

  // ==========================================
  // VIEW 1: INSTRUCTIONS VIEW
  // ==========================================
  if (engineState === "instructions") {
    return (
      <div className="test-engine-container">
        <div className="instructions-card">
          <div className="instructions-header">
            <span className="instructions-badge">{currentTest.subject} • {currentTest.grade}</span>
            <h1 className="instructions-title">{currentTest.title}</h1>
            <p className="instructions-subtitle">
              Official assessment platform instructions and candidate guidelines.
            </p>
          </div>

          <div className="instructions-stats-bar">
            <div className="inst-stat-item">
              <span className="inst-stat-label">Duration</span>
              <span className="inst-stat-val">{currentTest.durationMinutes} Mins</span>
            </div>
            <div className="inst-stat-item">
              <span className="inst-stat-label">Questions</span>
              <span className="inst-stat-val">{currentTest.questionCount} MCQs</span>
            </div>
            <div className="inst-stat-item">
              <span className="inst-stat-label">Total Marks</span>
              <span className="inst-stat-val">{currentTest.totalMarks} Marks</span>
            </div>
            <div className="inst-stat-item">
              <span className="inst-stat-label">Pass Marks</span>
              <span className="inst-stat-val">{currentTest.passingMarks} Marks</span>
            </div>
          </div>

          <h2 className="rules-heading">Candidate Exam Regulations:</h2>
          <div className="rules-list">
            {currentTest.instructions.map((rule, idx) => (
              <div key={idx} className="rule-item">
                <span className="rule-num">{idx + 1}</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>

          <div className="instructions-actions">
            <Link href="/student/tests" className="btn-cancel-exam">
              ← Return to Tests Directory
            </Link>
            <button onClick={handleStartTest} className="btn-start-exam">
              Start Test Now →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: ACTIVE TEST TAKING VIEW
  // ==========================================
  if (engineState === "active") {
    const isWarning = timeLeft <= 300 && timeLeft > 60;
    const isDanger = timeLeft <= 60;

    return (
      <div className="test-engine-container">
        <div className="test-active-view">
          {/* Top Sticky Bar */}
          <header className="test-top-bar">
            <div className="test-bar-title-wrap">
              <span style={{ fontSize: "18px" }}>📝</span>
              <span className="test-bar-title">{currentTest.title}</span>
            </div>

            <div className={`test-timer-badge ${isDanger ? "danger" : isWarning ? "warning" : ""}`}>
              <span>⏱️</span>
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn-submit-exam"
            >
              Submit Exam
            </button>
          </header>

          {/* Test Engine Workspace */}
          <div className="test-layout-grid">
            {/* Left Question Navigation Palette */}
            <aside className="question-nav-card">
              <div className="palette-header">Question Palette</div>

              <div className="palette-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--color-success)" }}></span>
                  <span>Answered</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "#f59e0b" }}></span>
                  <span>Review</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--color-primary-muted)", border: "1px solid var(--color-primary)" }}></span>
                  <span>Current</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--color-white)", border: "1px solid var(--color-gray-300)" }}></span>
                  <span>Not Visited</span>
                </div>
              </div>

              <div className="palette-grid">
                {currentTest.questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = !!selectedAnswers[q.id];
                  const isMarked = !!markedForReview[q.id];
                  const isVisited = !!visitedQuestions[q.id];

                  let statusClass = "unvisited";
                  if (isCurrent) statusClass = "current";
                  else if (isMarked) statusClass = "marked";
                  else if (isAnswered) statusClass = "answered";
                  else if (isVisited) statusClass = "visited";

                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(idx)}
                      className={`palette-btn ${statusClass}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Main Question Display Area */}
            <main className="question-workspace-card">
              <div>
                <div className="question-header-row">
                  <span className="question-index-tag">
                    Question {currentQuestionIndex + 1} of {currentTest.questions.length}
                  </span>
                  <span className="question-marks-tag">
                    {activeQ.marks} Marks • Single Option Correct
                  </span>
                </div>

                <div className="question-text">{activeQ.text}</div>

                {/* 4 Radio Options */}
                <div className="options-list" role="radiogroup" aria-label={`Question ${currentQuestionIndex + 1} options`}>
                  {activeQ.options.map((option) => {
                    const isSelected = selectedAnswers[activeQ.id] === option.id;
                    return (
                      <div
                        key={option.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        className={`option-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSelectOption(activeQ.id, option.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelectOption(activeQ.id, option.id);
                          }
                        }}
                      >
                        <div className="option-radio-visual">
                          {isSelected && <div className="option-radio-inner" />}
                        </div>
                        <span className="option-letter-badge">{option.label}</span>
                        <span className="option-text">{option.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Question Controls */}
              <div className="question-footer">
                <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                  <label className="review-checkbox-label">
                    <input
                      type="checkbox"
                      checked={!!markedForReview[activeQ.id]}
                      onChange={() => toggleMarkForReview(activeQ.id)}
                    />
                    Mark for Review
                  </label>

                  {selectedAnswers[activeQ.id] && (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleClearOption(activeQ.id)}
                      style={{ fontSize: "var(--text-xs)" }}
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="question-nav-buttons">
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={currentQuestionIndex === 0}
                    onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  >
                    ← Previous
                  </button>

                  {currentQuestionIndex < currentTest.questions.length - 1 ? (
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => goToQuestion(currentQuestionIndex + 1)}
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-submit-exam"
                      onClick={() => setIsSubmitModalOpen(true)}
                    >
                      Review & Submit
                    </button>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {isSubmitModalOpen && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Submit Assessment?</h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-gray-600)" }}>
                  Are you ready to submit your answers? Once submitted, your scorecard and step-by-step solutions will be generated.
                </p>
              </div>

              <div className="modal-stats-list">
                <div className="modal-stat-line">
                  <span>Total Questions:</span>
                  <strong>{currentTest.questions.length}</strong>
                </div>
                <div className="modal-stat-line" style={{ color: "var(--color-success)" }}>
                  <span>Answered:</span>
                  <strong>{answeredCount}</strong>
                </div>
                <div className="modal-stat-line" style={{ color: "#d97706" }}>
                  <span>Marked for Review:</span>
                  <strong>{markedCount}</strong>
                </div>
                <div className="modal-stat-line" style={{ color: "var(--color-gray-600)" }}>
                  <span>Unanswered:</span>
                  <strong>{unansweredCount}</strong>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsSubmitModalOpen(false)}
                >
                  Resume Test
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSubmitTest}
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW 3: RESULTS & SCORECARD VIEW
  // ==========================================
  let correctCount = 0;
  let incorrectCount = 0;
  let earnedScore = 0;

  currentTest.questions.forEach((q) => {
    const chosen = selectedAnswers[q.id];
    if (chosen === q.correctOptionId) {
      correctCount++;
      earnedScore += q.marks;
    } else if (chosen) {
      incorrectCount++;
    }
  });

  const unanswered = currentTest.questions.length - (correctCount + incorrectCount);
  const percentage = Math.round((earnedScore / currentTest.totalMarks) * 100);
  const isPassed = earnedScore >= currentTest.passingMarks;

  return (
    <div className="test-engine-container">
      <div className="results-view">
        {/* Scorecard Hero Banner */}
        <section className="scorecard-banner">
          <div className="scorecard-left">
            <span
              style={{
                display: "inline-block",
                background: isPassed ? "rgba(26, 122, 74, 0.4)" : "rgba(192, 57, 43, 0.4)",
                padding: "3px 10px",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                fontWeight: "bold",
                marginBottom: "var(--space-2)",
              }}
            >
              {isPassed ? "PASSED ASSESSMENT" : "NEEDS PRACTICE"}
            </span>
            <h1>{currentTest.title}</h1>
            <p>Assessment submitted successfully. Review your performance breakdown below.</p>
          </div>

          <div className="scorecard-metric-circle">
            <div className="scorecard-score-big">
              {earnedScore} <span style={{ fontSize: "var(--text-lg)", opacity: 0.8 }}>/ {currentTest.totalMarks}</span>
            </div>
            <div className="scorecard-score-percent">{percentage}% Overall Score</div>
          </div>
        </section>

        {/* Results Stats Tiles */}
        <section className="results-stats-row">
          <div className="result-stat-tile">
            <div className="label">Correct Answers</div>
            <div className="value" style={{ color: "var(--color-success)" }}>
              {correctCount}
            </div>
          </div>
          <div className="result-stat-tile">
            <div className="label">Incorrect Answers</div>
            <div className="value" style={{ color: "var(--color-error)" }}>
              {incorrectCount}
            </div>
          </div>
          <div className="result-stat-tile">
            <div className="label">Unanswered</div>
            <div className="value" style={{ color: "var(--color-gray-600)" }}>
              {unanswered}
            </div>
          </div>
          <div className="result-stat-tile">
            <div className="label">Passing Requirement</div>
            <div className="value">{currentTest.passingMarks} Marks</div>
          </div>
        </section>

        {/* Action Bar */}
        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="review-section-title" style={{ margin: 0 }}>
            Question-by-Question Solution Review
          </h2>
          <div style={{ display: "flex", gap: "var(--space-2)" }}>
            <button
              onClick={() => {
                setSelectedAnswers({});
                setMarkedForReview({});
                setCurrentQuestionIndex(0);
                setEngineState("active");
                setTimeLeft(currentTest.durationMinutes * 60);
              }}
              className="btn-secondary"
            >
              🔄 Re-take Test
            </button>
            <Link href="/student/results" className="btn-primary" style={{ textDecoration: "none" }}>
              View Results Dashboard →
            </Link>
          </div>
        </div>

        {/* Questions Detailed Review List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {currentTest.questions.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correctOptionId;
            const isAttempted = !!userAnswer;
            const isSaved = !!savedQuestions[q.id];

            return (
              <div key={q.id} className="review-question-card">
                <div className="review-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <span style={{ fontWeight: "bold", fontSize: "var(--text-sm)" }}>
                      Q{idx + 1}. ({q.topic})
                    </span>
                    {isCorrect ? (
                      <span className="review-badge correct">✓ Correct (+{q.marks} Marks)</span>
                    ) : isAttempted ? (
                      <span className="review-badge incorrect">✗ Incorrect (0 Marks)</span>
                    ) : (
                      <span className="review-badge unanswered">⚪ Unattempted</span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSaveBookmark(q.id)}
                    className="btn-secondary"
                    style={{ fontSize: "var(--text-xs)", padding: "4px 8px" }}
                  >
                    {isSaved ? "★ Bookmarked" : "☆ Save Question"}
                  </button>
                </div>

                <div style={{ fontSize: "var(--text-base)", fontWeight: 500, color: "var(--color-gray-900)" }}>
                  {q.text}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  {q.options.map((opt) => {
                    const isOptionCorrect = opt.id === q.correctOptionId;
                    const isOptionUserSelected = opt.id === userAnswer;

                    let pillClass = "";
                    if (isOptionCorrect) pillClass = "is-correct";
                    else if (isOptionUserSelected) pillClass = "is-user-incorrect";

                    return (
                      <div key={opt.id} className={`review-option-pill ${pillClass}`}>
                        <div>
                          <strong>{opt.label}.</strong> {opt.text}
                        </div>
                        {isOptionCorrect && <span>✓ Correct Answer</span>}
                        {isOptionUserSelected && !isOptionCorrect && <span>✗ Your Selection</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="explanation-box">
                  <strong>Step-by-step Solution & Concept:</strong>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
