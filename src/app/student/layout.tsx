"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "@/styles/student-layout.css";

const navItems = [
  { href: "/student/dashboard", label: "Dashboard" },
  { href: "/student/canvas", label: "AI Canvas Board" },
  { href: "/student/tests", label: "Assessments" },
  { href: "/student/results", label: "Results & Analysis" },
  { href: "/student/questions", label: "Saved Questions" },
];

function StudentLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="student-app-layout">
      {/* Desktop Sidebar */}
      <aside className="student-sidebar">
        <div>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              ALIVE Institute
            </div>
            <div className="sidebar-badge">Student Portal</div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/student/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div style={{ margin: "var(--space-4) var(--space-3) var(--space-2)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)" }}>
              Shortcuts
            </div>
            <Link href="/staff/dashboard" className="sidebar-link">
              <span>Switch to Staff</span>
            </Link>
            <Link href="/admin/users" className="sidebar-link">
              <span>Switch to Admin</span>
            </Link>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile-snippet">
            <div className="user-avatar-circle">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div className="user-info-text">
              <div className="user-info-name">{user?.name || "Aarav Sharma"}</div>
              <div className="user-info-meta">{user?.grade || "Class 10 CBSE"}</div>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="student-main-content">
        <header className="student-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <span className="student-topbar-title">Student Learning Space</span>
          </div>

          <div className="topbar-actions">
            <span className="topbar-pill-tag">Academic Year 2026-27</span>
            <ThemeToggle />
            <Link
              href="/login"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-primary)",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Change Role
            </Link>
          </div>
        </header>

        <main className="student-page-viewport">{children}</main>
      </div>

      {/* Mobile Bottom Tabs */}
      <nav className="mobile-bottom-tabs" aria-label="Mobile Navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/student/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-tab-item ${isActive ? "active" : ""}`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense
      fallback={
        <div style={{ padding: "var(--space-8)", textAlign: "center" }}>
          Loading student learning workspace...
        </div>
      }
    >
      <StudentLayoutContent>{children}</StudentLayoutContent>
    </React.Suspense>
  );
}
