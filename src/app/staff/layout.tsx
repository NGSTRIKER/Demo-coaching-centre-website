"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import "@/styles/staff-layout.css";

const staffNavItems = [
  { href: "/staff/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/staff/courses", label: "Courses", icon: "📚" },
  { href: "/staff/tests", label: "Assessments", icon: "✍️" },
  { href: "/staff/students", label: "Students", icon: "👥" },
  { href: "/staff/enquiries", label: "Enquiries", icon: "📬" },
];

function StaffLayoutContent({
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
    <div className="staff-app-layout">
      {/* Desktop Sidebar */}
      <aside className="staff-sidebar">
        <div>
          <div className="staff-sidebar-header">
            <div className="staff-sidebar-logo">
              <span>📐</span> ALIVE Faculty
            </div>
            <div className="staff-badge">Staff Console</div>
          </div>

          <nav className="staff-sidebar-nav">
            {staffNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/staff/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`staff-sidebar-link ${isActive ? "active" : ""}`}
                >
                  <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div style={{ margin: "var(--space-4) var(--space-3) var(--space-2)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)" }}>
              Shortcuts
            </div>
            <Link href="/student/dashboard" className="staff-sidebar-link">
              <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>🎓</span>
              <span>Student View</span>
            </Link>
            <Link href="/admin/users" className="staff-sidebar-link">
              <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>🛡️</span>
              <span>Admin Console</span>
            </Link>
          </nav>
        </div>

        <div className="staff-sidebar-footer">
          <div className="staff-user-snippet">
            <div className="staff-avatar-circle">
              {user?.name ? user.name.charAt(0) : "S"}
            </div>
            <div>
              <div style={{ fontSize: "var(--text-sm)", fontWeight: "600", color: "#fff" }}>
                {user?.name || "Dr. Sunita Sen"}
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)" }}>
                Faculty Desk
              </div>
            </div>
          </div>
          <button className="staff-logout-btn" onClick={handleLogout}>
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="staff-main-content">
        <header className="staff-topbar">
          <div className="staff-topbar-title">Faculty Management Portal</div>
          <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <span style={{ fontSize: "var(--text-xs)", background: "var(--color-primary-muted)", color: "var(--color-primary)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontWeight: 600 }}>
              Term 2 Live Academic Session
            </span>
            <Link href="/login" style={{ fontSize: "var(--text-xs)", color: "var(--color-primary)", textDecoration: "underline", fontWeight: 600 }}>
              Switch Account
            </Link>
          </div>
        </header>

        <main className="staff-page-viewport">{children}</main>
      </div>

      {/* Mobile Tabs */}
      <nav className="staff-mobile-tabs" aria-label="Staff Mobile Navigation">
        {staffNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/staff/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`staff-mobile-tab-item ${isActive ? "active" : ""}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense
      fallback={
        <div style={{ padding: "var(--space-8)", textAlign: "center" }}>
          Loading faculty workspace...
        </div>
      }
    >
      <StaffLayoutContent>{children}</StaffLayoutContent>
    </React.Suspense>
  );
}
