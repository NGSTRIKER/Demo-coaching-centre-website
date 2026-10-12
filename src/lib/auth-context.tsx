"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "staff" | "admin" | null;

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade?: string;
  avatar?: string;
  enrolledCourses?: string[];
}

interface AuthContextType {
  user: MockUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: "student" | "staff" | "admin") => void;
  logout: () => void;
}

const defaultStudent: MockUser = {
  id: "std-001",
  name: "Aarav Sharma",
  email: "student@demo.com",
  role: "student",
  grade: "Class 10 CBSE",
  enrolledCourses: ["Class 10 Mathematics Comprehensive", "CBSE Board Booster"],
};

const defaultStaff: MockUser = {
  id: "stf-001",
  name: "Dr. Sunita Sen",
  email: "staff@demo.com",
  role: "staff",
  grade: "Senior Faculty — Mathematics",
};

const defaultAdmin: MockUser = {
  id: "adm-001",
  name: "Admin Office",
  email: "admin@demo.com",
  role: "admin",
};

const AuthContext = createContext<AuthContextType>({
  user: defaultStudent,
  role: "student",
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(defaultStudent);

  // Initialize from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("alive_mock_user");
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // default to student for instant demo feel
        setUser(defaultStudent);
      }
    } catch {
      // fallback
    }
  }, []);

  const login = (email: string, roleParam?: "student" | "staff" | "admin") => {
    let selectedUser: MockUser;
    const effectiveRole = roleParam || (email.includes("staff") ? "staff" : email.includes("admin") ? "admin" : "student");

    if (effectiveRole === "staff") {
      selectedUser = { ...defaultStaff, email: email || defaultStaff.email };
    } else if (effectiveRole === "admin") {
      selectedUser = { ...defaultAdmin, email: email || defaultAdmin.email };
    } else {
      selectedUser = { ...defaultStudent, email: email || defaultStudent.email };
    }

    setUser(selectedUser);
    try {
      localStorage.setItem("alive_mock_user", JSON.stringify(selectedUser));
    } catch {
      // ignore storage failure
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("alive_mock_user");
    } catch {
      // ignore
    }
  };

  const isAuthenticated = !!user;
  const role = user ? user.role : null;

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
