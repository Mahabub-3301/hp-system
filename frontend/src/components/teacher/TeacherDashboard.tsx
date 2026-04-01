import { useState, useEffect } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
}

interface Cohort {
  _id: string;
  name: string;
  students: Student[];
}

export default function TeacherDashboard() {
  const [error,setError] = useState<String | null>(null);
  const [cohorts, setCohorts] = useState<Cohort[]>([
    {
      _id: "1",
      name: "Euclidian",
      students: [
        { id: "1", name: "Rehan" },
        { id: "2", name: "Rahul" },
      ],
    },
    {
      _id: "2",
      name: "Askarian",
      students: [{ id: "3", name: "Aman" }],
    },
    {
      _id: "3",
      name: "Turing",
      students: [{ id: "4", name: "John" }],
    },
  ]);

  useEffect(() =>
  {
    const fetchCohorts = async () => {
      try{
        const response = await axios.get('http://localhost:5000/teacher/cohorts');
        const data = response.data;
        setCohorts(data);
        setError(null);
      } catch(error) {
        console.log("Error Fetching Cohorts !!")
        setError('Failed to fetch Cohots');
      }
    }
  },[])

  useEffect(()=> {
    if(error) {
      const timer = setTimeout(()=>{
        setError(null);
      }, 10000);
      return ()=> clearTimeout(timer);
    }
  },[error]);

  const [selected, setSelected] = useState<Cohort | null>(null);
  const [newStudent, setNewStudent] = useState("");

  const totalStudents = cohorts.reduce(
    (total, c) => total + c.students.length,
    0
  );

  const addStudent = () => {
    if (!newStudent.trim() || !selected) return;

    const newEntry = {
      id: Date.now().toString(),
      name: newStudent,
    };

    const updated = cohorts.map((c) =>
      c._id === selected._id
        ? { ...c, students: [...c.students, newEntry] }
        : c
    );

    setCohorts(updated);
    setSelected({
      ...selected,
      students: [...selected.students, newEntry],
    });

    setNewStudent("");
  };

  const removeStudent = (id: string) => {
    if (!selected) return;

    const updated = cohorts.map((c) =>
      c._id === selected._id
        ? { ...c, students: c.students.filter((s) => s.id !== id) }
        : c
    );

    setCohorts(updated);
    setSelected({
      ...selected,
      students: selected.students.filter((s) => s.id !== id),
    });
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .card-hover:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.3) !important;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #818CF8 0%, #6366F1 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }
        .btn-success:hover {
          background: linear-gradient(135deg, #34D399 0%, #10B981 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
        }
        .btn-danger:hover {
          background: linear-gradient(135deg, #F87171 0%, #EF4444 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
        }
        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.15) !important;
          transform: scale(1.1);
        }
        .input-focus:focus {
          border-color: #6366F1 !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
          outline: none;
        }
        .student-item:hover {
          background: rgba(99, 102, 241, 0.08);
        }
        .scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        .scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
      `}</style>

      <>
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px'
        }}>
          <p>{error}</p>
          <button onClick={()=>  setError(null)}>x</button>
        </div>
      )}
      </>

      <div style={styles.page}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>Teacher Dashboard</h1>
            <p style={styles.subtitle}>Manage your cohorts and students</p>
          </div>
          <div style={styles.headerDecor}></div>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📚</div>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>Total Cohorts</p>
              <h2 style={styles.statValue}>{cohorts.length}</h2>
            </div>
          </div>

          <div style={styles.statCardHighlight}>
            <div style={styles.statIcon}>👥</div>
            <div style={styles.statInfo}>
              <p style={styles.statLabelLight}>Total Students</p>
              <h2 style={styles.statValueLight}>{totalStudents}</h2>
            </div>
            <div style={styles.statGlow}></div>
          </div>
        </div>

        {/* Cohorts */}
        <h2 style={styles.sectionTitle}>Your Cohorts</h2>
        <div style={styles.grid}>
          {cohorts.map((c, index) => (
            <div
              key={c._id}
              className="card-hover"
              style={{
                ...styles.card,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div style={styles.cardAccent}></div>
              <div style={styles.cardContent}>
                <div style={styles.cardHeader}>
                  <div style={styles.cohortIcon}>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={styles.cohortName}>{c.name}</h3>
                    <p style={styles.subText}>
                      {c.students.length} {c.students.length === 1 ? 'Student' : 'Students'} enrolled
                    </p>
                  </div>
                </div>

                <div style={styles.studentPreview}>
                  {c.students.slice(0, 3).map((s, i) => (
                    <div
                      key={s.id}
                      style={{
                        ...styles.avatarSmall,
                        marginLeft: i > 0 ? '-8px' : '0',
                        zIndex: 3 - i,
                      }}
                    >
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {c.students.length > 3 && (
                    <span style={styles.moreStudents}>
                      +{c.students.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  className="btn-primary"
                  style={styles.btn}
                  onClick={() => setSelected(c)}
                >
                  <span>Manage Cohort</span>
                  <span style={styles.btnArrow}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div style={styles.overlay} onClick={() => setSelected(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <div style={styles.modalIcon}>
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 style={styles.modalTitle}>{selected.name}</h2>
                  <p style={styles.modalSub}>
                    {selected.students.length} {selected.students.length === 1 ? 'student' : 'students'} enrolled
                  </p>
                </div>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.inputRow}>
                <input
                  className="input-focus"
                  style={styles.input}
                  placeholder="Enter student name..."
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addStudent()}
                />
                <button
                  className="btn-success"
                  style={styles.addBtn}
                  onClick={addStudent}
                >
                  <span style={styles.addIcon}>+</span>
                  Add
                </button>
              </div>

              <div className="scrollbar" style={styles.studentList}>
                {selected.students.length === 0 ? (
                  <div style={styles.emptyState}>
                    <span style={styles.emptyIcon}>👤</span>
                    <p>No students yet</p>
                    <p style={styles.emptyHint}>Add your first student above</p>
                  </div>
                ) : (
                  selected.students.map((s, index) => (
                    <div
                      key={s.id}
                      className="student-item"
                      style={{
                        ...styles.studentItem,
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      <div style={styles.studentInfo}>
                        <div style={styles.studentAvatar}>
                          {s.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={styles.studentName}>{s.name}</span>
                      </div>
                      <button
                        className="remove-btn"
                        style={styles.removeBtn}
                        onClick={() => removeStudent(s.id)}
                        title="Remove student"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                className="btn-danger"
                style={styles.closeBtn}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #16213E 100%)",
    color: "#E2E8F0",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  header: {
    position: "relative",
    marginBottom: "40px",
    paddingBottom: "20px",
  },

  headerContent: {
    position: "relative",
    zIndex: 1,
  },

  headerDecor: {
    position: "absolute",
    top: "-20px",
    right: "0",
    width: "300px",
    height: "100px",
    background: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
    filter: "blur(40px)",
  },

 title: {
  fontSize: "36px",
  fontWeight: "800",
  marginBottom: "12px",        // increased slightly from 8px
  lineHeight: "1.2",           // ensures the text doesn't get cut
  background: "linear-gradient(135deg, #FFFFFF 0%, #A5B4FC 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-0.5px",
},

  subtitle: {
    fontSize: "16px",
    color: "#64748B",
    fontWeight: "400",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#CBD5E1",
  },

  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
  },

  statCard: {
    flex: 1,
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(30, 41, 59, 0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(71, 85, 105, 0.4)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    animation: "fadeIn 0.5s ease forwards",
  },

  statCardHighlight: {
    flex: 1,
    padding: "24px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    position: "relative",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease 0.1s forwards",
    opacity: 0,
  },

  statGlow: {
    position: "absolute",
    top: "-50%",
    right: "-50%",
    width: "100%",
    height: "200%",
    background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)",
  },

  statIcon: {
    fontSize: "32px",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
  },

  statInfo: {
    position: "relative",
    zIndex: 1,
  },

  statLabel: {
    fontSize: "14px",
    color: "#94A3B8",
    marginBottom: "4px",
    fontWeight: "500",
  },

  statLabelLight: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "4px",
    fontWeight: "500",
  },

  statValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#F1F5F9",
    margin: 0,
  },

  statValueLight: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#FFFFFF",
    margin: 0,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },

  card: {
    borderRadius: "20px",
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(71, 85, 105, 0.3)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease forwards",
    opacity: 0,
  },

  cardAccent: {
    height: "4px",
    background: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)",
  },

  cardContent: {
    padding: "24px",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "20px",
  },

  cohortIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
    color: "white",
  },

  cohortName: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "2px",
    color: "#F1F5F9",
  },

  subText: {
    fontSize: "14px",
    color: "#64748B",
  },

  studentPreview: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    paddingTop: "4px",
  },

  avatarSmall: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
    border: "2px solid #1E293B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
  },

  moreStudents: {
    marginLeft: "12px",
    fontSize: "13px",
    color: "#64748B",
  },

  btn: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },

  btnArrow: {
    transition: "transform 0.3s ease",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.3s ease",
    zIndex: 1000,
  },

  modal: {
    width: "440px",
    maxWidth: "90vw",
    maxHeight: "85vh",
    padding: "28px",
    borderRadius: "24px",
    background: "linear-gradient(145deg, #1E293B 0%, #1A1F35 100%)",
    border: "1px solid rgba(71, 85, 105, 0.4)",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.1)",
    animation: "slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    display: "flex",
    flexDirection: "column",
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },

  modalIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    color: "white",
    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
  },

  modalTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#F1F5F9",
    margin: 0,
  },

  modalSub: {
    color: "#64748B",
    fontSize: "14px",
    marginTop: "2px",
  },

  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
    marginBottom: "20px",
  },

  inputRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid rgba(71, 85, 105, 0.4)",
    background: "rgba(15, 23, 42, 0.6)",
    color: "white",
    fontSize: "15px",
    transition: "all 0.3s ease",
  },

  addBtn: {
    padding: "14px 20px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.3s ease",
  },

  addIcon: {
    fontSize: "18px",
    fontWeight: "700",
  },

  studentList: {
    flex: 1,
    minHeight: "180px",
    maxHeight: "280px",
    overflowY: "auto",
    marginBottom: "20px",
    paddingRight: "8px",
  },

  emptyState: {
    textAlign: "center" as const,
    padding: "40px 20px",
    color: "#64748B",
  },

  emptyIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "12px",
    opacity: 0.5,
  },

  emptyHint: {
    fontSize: "13px",
    color: "#475569",
    marginTop: "4px",
  },

  studentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    borderRadius: "12px",
    marginBottom: "8px",
    background: "rgba(30, 41, 59, 0.4)",
    border: "1px solid rgba(71, 85, 105, 0.2)",
    transition: "all 0.2s ease",
    animation: "fadeIn 0.3s ease forwards",
  },

  studentInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  studentAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
  },

  studentName: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#E2E8F0",
  },

  removeBtn: {
    width: "32px",
    height: "32px",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    color: "#EF4444",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },

  closeBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s ease",
  },
};
