import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/navbar";

// Dynamically set Navbar props based on current route
function NavbarWrapper() {
  const location = useLocation();

  let role: "guest" | "teacher" | "student" = "guest";
  let active = "";

  if (location.pathname.startsWith("/teacher")) {
    role = "teacher";
    active = "dashboard";
  } else if (location.pathname.startsWith("/student")) {
    role = "student";
    active = "dashboard";
  } else if (location.pathname === "/login") {
    role = "guest";
    active = "login";
  } else if (location.pathname === "/register") {
    role = "guest";
    active = "register";
  }

  return <Navbar role={role} active={active} />;
}

export default function App() {
  return (
    <Router>
      {/* Navbar visible on every page */}
      <NavbarWrapper />

      {/* Add padding top so content is not hidden behind fixed Navbar */}
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/teacher" replace />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}