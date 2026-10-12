"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import "@/styles/login.css";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<"student" | "staff" | "admin">("student");
  const [email, setEmail] = useState("student@demo.com");
  const [password, setPassword] = useState("demo123");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRoleChange = (newRole: "student" | "staff" | "admin") => {
    setRole(newRole);
    if (newRole === "student") {
      setEmail("student@demo.com");
      setPassword("demo123");
    } else if (newRole === "staff") {
      setEmail("staff@demo.com");
      setPassword("demo123");
    } else {
      setEmail("admin@demo.com");
      setPassword("demo123");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      login(email, role);
      if (role === "student") {
        router.push("/student/dashboard");
      } else if (role === "staff") {
        router.push("/staff/dashboard");
      } else {
        router.push("/admin/users");
      }
    }, 400);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Brand / Left Info Panel */}
        <div className="login-brand-panel">
          <div className="login-brand-header">
            <div className="brand-badge">ALIVE INSTITUTE PORTAL</div>
            <h2 className="brand-logo-title">Mastering Mathematics With Purpose</h2>
            <p className="brand-tagline">
              Dedicated assessment engine, step-by-step performance analytics, and structured curriculum for CBSE & Olympiad achievers.
            </p>
          </div>

          <div className="brand-features-list">
            <div className="brand-feature-item">
              <div className="feature-icon-bubble">✓</div>
              <div className="feature-text-group">
                <h4>Interactive Test Engine</h4>
                <p>Timed mock papers, question review palette, and instant score breakdown.</p>
              </div>
            </div>
            <div className="brand-feature-item">
              <div className="feature-icon-bubble">✓</div>
              <div className="feature-text-group">
                <h4>Granular Progress Insights</h4>
                <p>Track accuracy across topics like Trigonometry, Quadratic Equations, and Calculus.</p>
              </div>
            </div>
            <div className="brand-feature-item">
              <div className="feature-icon-bubble">✓</div>
              <div className="feature-text-group">
                <h4>Faculty & Staff Command</h4>
                <p>Publish tests, curate questions, manage student batches, and resolve enquiries.</p>
              </div>
            </div>
          </div>

          <div className="brand-footer-quote">
            "Education is not just about memorizing formulas; it is about building intuitive problem-solving instincts."
          </div>
        </div>

        {/* Form / Right Panel */}
        <div className="login-form-panel">
          <div className="form-header">
            <h1>Account Sign In</h1>
            <p>Access your student workspace or faculty console.</p>
          </div>

          {/* Role Segmented Switcher */}
          <div className="role-segmented-control" role="tablist" aria-label="Select portal role">
            <button
              type="button"
              className={`role-tab-btn ${role === "student" ? "active" : ""}`}
              onClick={() => handleRoleChange("student")}
            >
              🎓 Student
            </button>
            <button
              type="button"
              className={`role-tab-btn ${role === "staff" ? "active" : ""}`}
              onClick={() => handleRoleChange("staff")}
            >
              👨‍🏫 Staff
            </button>
            <button
              type="button"
              className={`role-tab-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => handleRoleChange("admin")}
            >
              🛡️ Admin
            </button>
          </div>

          {/* Demo Credentials Notice Box */}
          <div className="demo-creds-box">
            <div className="demo-creds-header">
              <span className="demo-creds-title">Demo Credentials</span>
              <button
                type="button"
                className="demo-quickfill-btn"
                onClick={() => handleRoleChange(role)}
              >
                Autofill
              </button>
            </div>
            <div className="demo-creds-body">
              <div>
                <strong>Student:</strong> <code>student@demo.com</code> / <code>demo123</code>
              </div>
              <div>
                <strong>Staff:</strong> <code>staff@demo.com</code> / <code>demo123</code>
              </div>
              <div>
                <strong>Admin:</strong> <code>admin@demo.com</code> / <code>demo123</code>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div style={{ color: "var(--color-error)", fontSize: "var(--text-xs)", marginBottom: "var(--space-3)" }}>
              {errorMsg}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email-input">
                Email Address
              </label>
              <div className="form-input-wrap">
                <input
                  id="email-input"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password-input">
                Password
              </label>
              <div className="form-input-wrap">
                <input
                  id="password-input"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-meta-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember this device
              </label>
              <a
                href="#forgot"
                className="forgot-password-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Demo Notice: Password reset is pre-configured. Use credentials shown above.");
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing In..." : `Enter as ${role.charAt(0).toUpperCase() + role.slice(1)} →`}
            </button>
          </form>

          <div className="demo-disclaimer">
            * This is an interactive frontend prototype for ALIVE Institute. All data changes are simulated in browser state.
          </div>
        </div>
      </div>
    </div>
  );
}
