"use client";

import React, { useState } from "react";
import { MOCK_STUDENTS, StudentRecord } from "@/lib/mock-data";
import "@/styles/staff-students.css";

export default function StaffStudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "All" || s.grade.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="staff-students-page">
      <div className="students-header">
        <div>
          <h1>Student Directory & Progress Index</h1>
          <p>Monitor enrolled candidates, individual performance indices, and test engagement.</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="filter-bar-students">
        <input
          type="text"
          className="student-search-input"
          placeholder="Search by student name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="student-select-filter"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="All">All Grades</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
        </select>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class & Board</th>
              <th>Contact Phone</th>
              <th>Tests Taken</th>
              <th>Avg Score</th>
              <th>Enrolled Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((std) => (
              <tr key={std.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="student-initials-bubble">{std.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{std.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--color-gray-500)" }}>{std.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {std.grade} ({std.board})
                </td>
                <td>{std.phone}</td>
                <td>
                  <strong>{std.testsTaken}</strong> tests
                </td>
                <td>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: std.averageScore >= 80 ? "var(--color-success)" : "var(--color-primary)",
                    }}
                  >
                    {std.averageScore}%
                  </span>
                </td>
                <td>{std.joinedDate}</td>
                <td>
                  <span
                    style={{
                      background: "var(--color-success-light)",
                      color: "var(--color-success)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {std.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => alert(`Demo Action: Scorecard dossier for ${std.name}`)}
                    style={{
                      background: "none",
                      border: "1px solid var(--color-gray-300)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
