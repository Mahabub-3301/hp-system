import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState, useEffect } from "react";

import TeacherDashboard from "./components/teacher/TeacherDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/protectedRoute";
import { getUserFromToken } from "./utils/auth";
import Cohorts from "./pages/cohorts";

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
  const navigate = useNavigate();

  const [role, setRole] = useState("guest");
  const [active, setActive] = useState("");

  /* 🔥 FIX: Re-check token whenever route changes */
  useEffect(() => {
    const user = getUserFromToken();
    setRole(user ? user.role : "guest");
  }, [location.pathname]);

  /* Active tab tracking */
  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard") ||
      location.pathname.startsWith("/student") ||
      location.pathname.startsWith("/teacher")
    ) {
      setActive("dashboard");
    } else if (location.pathname === "/login") {
      setActive("login");
    } else if (location.pathname === "/register") {
      setActive("register");
    } else if (location.pathname === "/courses") {
      setActive("my courses");
    } else if (location.pathname === "/cohorts") {
      setActive("cohorts");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole("guest");
    navigate("/login");
  };

  return <Navbar role={role} active={active} onLogout={handleLogout} />;
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

          {/* Direct role routes */}
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
          <Route path="/cohorts"
            element={
              <ProtectedRoute role = "teacher"> <Cohorts /></ProtectedRoute>
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