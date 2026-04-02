import { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  _id: string;
  name: string;
  baseHP: number;
  currentHP: number;
}

interface Cohort {
  _id: string;
  name: string;
  baseHp: number;
  students: number;
}

export default function Cohorts() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     📥 FETCH ALL COHORTS
  ========================= */
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/teacher/cohorts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCohorts(res.data);
      } catch (err) {
        setError("Failed to fetch cohorts");
      }
    };

    fetchCohorts();
  }, []);

  /* =========================
     📥 FETCH SINGLE COHORT
  ========================= */
  const handleSelect = async (cohortId: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/teacher/cohorts/${cohortId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelected(res.data);
      setStudents(res.data.students || []);
    } catch (err) {
      setError("Failed to fetch cohort details");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Cohorts</h1>

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          {error}
        </div>
      )}

      {/* COHORT CARDS */}
      <div style={styles.grid}>
        {cohorts.map((c) => (
          <div
            key={c._id}
            style={styles.card}
            className="card-hover"
            onClick={() => handleSelect(c._id)}
          >
            <h3>{c.name}</h3>
            <p>{c.students} students</p>
            <p>Base HP: {c.baseHp}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{selected.name}</h2>

            {/* STUDENTS LIST */}
            <div style={styles.studentList}>
              {students.length === 0 ? (
                <p>No students</p>
              ) : (
                students.map((s) => (
                  <div key={s._id} style={styles.studentCard}>
                    <div>
                      <strong>{s.name}</strong>
                      <p>Base HP: {s.baseHP}</p>
                      <p>Current HP: {s.currentHP}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button style={styles.closeBtn} onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   🎨 STYLES (MATCH YOUR UI)
========================= */
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #16213E 100%)",
    color: "#E2E8F0",
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(30, 41, 59, 0.6)",
    border: "1px solid rgba(71, 85, 105, 0.4)",
    cursor: "pointer",
    transition: "0.3s",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#1E293B",
    padding: "20px",
    borderRadius: "16px",
    width: "400px",
    maxHeight: "80vh",
    overflowY: "auto",
  },

  studentList: {
    marginTop: "15px",
  },

  studentCard: {
    padding: "10px",
    borderBottom: "1px solid #334155",
  },

  closeBtn: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    background: "#EF4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  errorBox: {
    background: "#7f1d1d",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
};