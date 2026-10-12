"use client";

import React, { useState } from "react";
import { MOCK_COURSES, CourseItem } from "@/lib/mock-data";
import "@/styles/staff-courses.css";

export default function StaffCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>(MOCK_COURSES);
  const [showModal, setShowModal] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newGrade, setNewGrade] = useState("Class 10");
  const [newBoard, setNewBoard] = useState("CBSE");

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName) return;

    const created: CourseItem = {
      id: "crs-" + Date.now(),
      name: newCourseName,
      grade: newGrade,
      board: newBoard,
      studentsEnrolled: 0,
      testsCount: 0,
      faculty: "Staff Faculty",
      status: "Upcoming",
    };

    setCourses([created, ...courses]);
    setNewCourseName("");
    setShowModal(false);
  };

  return (
    <div className="staff-courses-page">
      <div className="staff-page-header">
        <div>
          <h1>Curriculum Batches & Courses</h1>
          <p>Organize academic streams, syllabus schedules, and student allocations.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#fff",
            padding: "var(--space-2) var(--space-5)",
            borderRadius: "var(--radius-md)",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          + Create New Course Batch
        </button>
      </div>

      <div className="table-wrapper">
        <table className="management-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Class & Level</th>
              <th>Board Affiliation</th>
              <th>Enrolled Students</th>
              <th>Tests Attached</th>
              <th>Faculty Lead</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>
                  <strong>{course.name}</strong>
                </td>
                <td>{course.grade}</td>
                <td>{course.board}</td>
                <td>{course.studentsEnrolled} Students</td>
                <td>{course.testsCount} Assessments</td>
                <td>{course.faculty}</td>
                <td>
                  <span
                    className={`status-badge ${course.status === "Active" ? "active" : "upcoming"}`}
                  >
                    {course.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      className="table-btn"
                      onClick={() => alert(`Demo Action: Editing curriculum for ${course.name}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="table-btn"
                      onClick={() => alert(`Demo Action: Batch roster opened for ${course.name}`)}
                    >
                      Roster
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding course */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "var(--space-4)",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "var(--space-6)",
              borderRadius: "var(--radius-xl)",
              maxWidth: "480px",
              width: "100%",
            }}
          >
            <h3 style={{ marginBottom: "var(--space-4)" }}>Create New Course Batch</h3>
            <form onSubmit={handleAddCourse} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div>
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "bold" }}>Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Class 10 Trigonometry Special Batch"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "bold" }}>Class</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                >
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "bold" }}>Board</label>
                <select
                  value={newBoard}
                  onChange={(e) => setNewBoard(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "var(--space-4)" }}>
                <button
                  type="button"
                  className="table-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
