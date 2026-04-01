import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/register", form);
      setMessage("Registration successful ✅");
      navigate('/login');
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Registration failed ❌");
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .input-focus:focus {
          border-color: #6366F1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.25);
          outline: none;
        }

        .btn-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.5);
        }
      `}</style>

      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.glow}></div>

          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join the platform</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              className="input-focus"
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              className="input-focus"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              className="input-focus"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select
              name="role"
              onChange={handleChange}
              style={styles.input}
              className="input-focus"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <button type="submit" style={styles.button} className="btn-hover">
              Register →
            </button>
          </form>

          {message && (
            <p
              style={{
                ...styles.message,
                color: message.includes("successful")
                  ? "#22C55E"
                  : "#EF4444",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

const styles: any = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #16213E 100%)",
    fontFamily: "'Inter', sans-serif",
    padding: "20px",
  },

  card: {
    width: "420px",
    padding: "40px",
    borderRadius: "24px",
    background: "rgba(30, 41, 59, 0.65)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(71, 85, 105, 0.4)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
    textAlign: "center",
    position: "relative",
    animation: "fadeIn 0.6s ease",
  },

  glow: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 60%)",
    zIndex: 0,
  },

  title: {
    fontSize: "36px",
    fontWeight: "900",
    marginBottom: "10px",
    background: "linear-gradient(135deg, #FFFFFF 0%, #A5B4FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
    position: "relative",
  },

  subtitle: {
    fontSize: "18px",
    color: "#94A3B8",
    marginBottom: "28px",
    position: "relative",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    position: "relative",
  },

  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "2px solid rgba(71, 85, 105, 0.4)",
    background: "rgba(15, 23, 42, 0.7)",
    color: "#E2E8F0",
    fontSize: "16px",
    fontWeight: "500",
    transition: "0.3s",
  },

  button: {
    marginTop: "12px",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background:
      "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },

  message: {
    marginTop: "18px",
    fontSize: "15px",
    fontWeight: "600",
  },
};

export default Register;
