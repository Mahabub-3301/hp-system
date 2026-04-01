import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import TeacherDashboard from "./components/teacher/TeacherDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/protectedRoute";
import { getUserFromToken } from "./utils/auth";



/* =========================
   🎯 Dashboard Router
========================= */

function DashboardRouter() {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "teacher") return <TeacherDashboard />;
  if (user.role === "student") return <StudentDashboard />;

  return <Navigate to="/login" />;
}

/* =========================
   🧭 Navbar Wrapper
========================= */

function NavbarWrapper() {
  const location = useLocation();
  const user = getUserFromToken();

  let role: "guest" | "teacher" | "student" = "guest";
  let active = "";

  if (user) {
    role = user.role;
  }

  if (location.pathname.startsWith("/dashboard")) {
    active = "dashboard";
  } else if (location.pathname === "/login") {
    active = "login";
  } else if (location.pathname === "/register") {
    active = "register";
  }

  return <Navbar role={role} active={active} />;
}

/* =========================
   🚀 App Component
========================= */

export default function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <NavbarWrapper />

      {/* Prevent content hiding under fixed navbar */}
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Unified Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />

          {/* Optional direct role routes */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute role="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}