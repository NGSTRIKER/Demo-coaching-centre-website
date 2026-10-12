"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_ADMIN_USERS, AdminUserRecord } from "@/lib/mock-data";
import "@/styles/admin-users.css";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserRecord[]>(MOCK_ADMIN_USERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"Student" | "Staff" | "Administrator">("Staff");
  const [newDept, setNewDept] = useState("Mathematics Department");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const created: AdminUserRecord = {
      id: "usr-" + Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
      department: newDept,
      status: "Active",
      lastLogin: "Never",
    };

    setUsers([created, ...users]);
    setNewName("");
    setNewEmail("");
    setShowAddModal(false);
  };

  const handleToggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
      )
    );
  };

  return (
    <div className="admin-users-page">
      <div className="admin-top-bar">
        <div>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ fontSize: "var(--text-xs)", background: "var(--color-primary-muted)", color: "var(--color-primary)", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold" }}>
              SYSTEM ADMINISTRATION
            </span>
          </div>
          <h1>Identity & Access Control</h1>
          <p>Manage faculty permissions, student enrollment accounts, and portal access policies.</p>
        </div>

        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Link
            href="/student/dashboard"
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid var(--color-gray-300)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              textDecoration: "none",
              color: "var(--color-gray-700)",
            }}
          >
            Student Portal →
          </Link>
          <Link
            href="/staff/dashboard"
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid var(--color-gray-300)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              textDecoration: "none",
              color: "var(--color-gray-700)",
            }}
          >
            Staff Console →
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "bold",
              fontSize: "var(--text-sm)",
              cursor: "pointer",
            }}
          >
            + Provision User
          </button>
        </div>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department / Batch</th>
              <th>Status</th>
              <th>Last Sign In</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>{u.name}</strong>
                </td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-pill ${u.role}`}>{u.role}</span>
                </td>
                <td>{u.department}</td>
                <td>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: u.status === "Active" ? "var(--color-success)" : "var(--color-error)",
                    }}
                  >
                    ● {u.status}
                  </span>
                </td>
                <td>{u.lastLogin}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      style={{
                        padding: "4px 8px",
                        fontSize: "11px",
                        borderRadius: "4px",
                        border: "1px solid var(--color-gray-300)",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      {u.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
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
              maxWidth: "460px",
              width: "100%",
            }}
          >
            <h3 style={{ marginBottom: "var(--space-4)" }}>Provision New Portal User</h3>
            <form onSubmit={handleAddUser} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div>
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "bold" }}>Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "bold" }}>Email Address</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "bold" }}>Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as "Student" | "Staff" | "Administrator")}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                >
                  <option value="Student">Student</option>
                  <option value="Staff">Staff</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "var(--text-xs)", fontWeight: "bold" }}>Department / Grade</label>
                <input
                  type="text"
                  placeholder="e.g. Class 10 CBSE or Senior Faculty"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "4px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "var(--space-4)" }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    background: "none",
                    cursor: "pointer",
                  }}
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
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
