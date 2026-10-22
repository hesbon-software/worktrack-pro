import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState("employees");
  const [loading, setLoading] = useState(true);

  // User Role State ("employer", "manager", "staff")
  const [userRole, setUserRole] = useState("staff");

  // Firestore Data Collections
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [reports, setReports] = useState([]);

  // Form Controls
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPosition, setEditPosition] = useState("");

  // Access Roles
  const isEmployer = userRole === "employer";
  const isManager = userRole === "manager" || userRole === "employer";

  // Check Role from Firestore
  const checkUserRole = async () => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists() && userDoc.data().role) {
        setUserRole(userDoc.data().role.toLowerCase());
      } else {
        setUserRole("staff");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
      setUserRole("staff");
    }
  };

  // Fetch Firestore Collections
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const empSnap = await getDocs(collection(db, "employees"));
      setEmployees(empSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const attSnap = await getDocs(collection(db, "attendance"));
      setAttendance(attSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const taskSnap = await getDocs(collection(db, "task"));
      setTasks(taskSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const deptSnap = await getDocs(collection(db, "departments"));
      setDepartments(deptSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const repSnap = await getDocs(collection(db, "reports"));
      setReports(repSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserRole();
    fetchAllData();
  }, [user]);

  // Add Employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!isManager || !name || !position) return;
    try {
      await addDoc(collection(db, "employees"), { name, position });
      setName("");
      setPosition("");
      fetchAllData();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Delete Employee (Employer Only)
  const handleDeleteEmployee = async (id) => {
    if (!isEmployer) {
      alert("Only Employers have permission to delete employee records.");
      return;
    }
    try {
      await deleteDoc(doc(db, "employees", id));
      fetchAllData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Start Editing Record
  const handleStartEdit = (emp) => {
    if (!isManager) return;
    setEditingId(emp.id);
    setEditName(emp.name || "");
    setEditPosition(emp.position || "");
  };

  // Save Edited Record
  const handleSaveEdit = async (id) => {
    if (!isManager) return;
    try {
      await updateDoc(doc(db, "employees", id), {
        name: editName,
        position: editPosition,
      });
      setEditingId(null);
      fetchAllData();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          padding: "16px 32px",
          backgroundColor: "#1e293b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #334155",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "18px",
            }}
          >
            WT
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px" }}>
              WorkTrack <span style={{ color: "#a855f7" }}>Pro</span>
            </h2>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>
              User: <strong style={{ color: "#38bdf8" }}>{user?.email}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              backgroundColor: isEmployer
                ? "rgba(168, 85, 247, 0.2)"
                : isManager
                ? "rgba(56, 189, 248, 0.2)"
                : "rgba(52, 211, 153, 0.2)",
              color: isEmployer
                ? "#c084fc"
                : isManager
                ? "#38bdf8"
                : "#34d399",
            }}
          >
            {userRole}
          </span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main
        style={{
          width: "100%",
          maxWidth: "900px",
          padding: "24px 16px",
          boxSizing: "border-box",
        }}
      >
        {/* Designer Banner */}
        <div
          style={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "11px", color: "#c084fc", fontWeight: "700" }}>
            ENGINEERED BY
          </div>
          <div style={{ fontSize: "20px", fontWeight: "800", marginTop: "2px" }}>
            Hesbon Software Designer
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["employees", "attendance", "tasks", "departments", "reports"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: activeTab === tab ? "#6366f1" : "#1e293b",
                  color: "#ffffff",
                  fontWeight: "600",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* TAB 1: EMPLOYEES */}
        {activeTab === "employees" && (
          <div>
            {isManager && (
              <div
                style={{
                  backgroundColor: "#1e293b",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ marginTop: 0, marginBottom: "16px" }}>
                  Add Staff Member ({userRole.toUpperCase()})
                </h3>
                <form
                  onSubmit={handleAddEmployee}
                  style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      flex: "1",
                      minWidth: "180px",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #475569",
                      backgroundColor: "#0f172a",
                      color: "#fff",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Position / Department"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    style={{
                      flex: "1",
                      minWidth: "180px",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #475569",
                      backgroundColor: "#0f172a",
                      color: "#fff",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#a855f7",
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    + Add Staff
                  </button>
                </form>
              </div>
            )}

            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  Staff Directory ({employees.length})
                </h3>
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #475569",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                  }}
                />
              </div>

              {loading ? (
                <p>Loading directory...</p>
              ) : filteredEmployees.length === 0 ? (
                <p style={{ color: "#94a3b8" }}>No employees found.</p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {filteredEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      style={{
                        padding: "12px 16px",
                        backgroundColor: "#0f172a",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {editingId === emp.id ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            width: "100%",
                          }}
                        >
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            style={{
                              padding: "6px",
                              borderRadius: "4px",
                              border: "1px solid #a855f7",
                              backgroundColor: "#1e293b",
                              color: "#fff",
                              flex: 1,
                            }}
                          />
                          <input
                            type="text"
                            value={editPosition}
                            onChange={(e) => setEditPosition(e.target.value)}
                            style={{
                              padding: "6px",
                              borderRadius: "4px",
                              border: "1px solid #a855f7",
                              backgroundColor: "#1e293b",
                              color: "#fff",
                              flex: 1,
                            }}
                          />
                          <button
                            onClick={() => handleSaveEdit(emp.id)}
                            style={{
                              backgroundColor: "#10b981",
                              color: "#fff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            style={{
                              backgroundColor: "#64748b",
                              color: "#fff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div style={{ fontWeight: "bold" }}>{emp.name}</div>
                            <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                              {emp.position}
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {isManager && (
                              <button
                                onClick={() => handleStartEdit(emp)}
                                style={{
                                  backgroundColor: "#38bdf8",
                                  color: "#000",
                                  border: "none",
                                  padding: "6px 12px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                              >
                                Edit
                              </button>
                            )}
                            {isEmployer && (
                              <button
                                onClick={() => handleDeleteEmployee(emp.id)}
                                style={{
                                  backgroundColor: "#ef4444",
                                  color: "#fff",
                                  border: "none",
                                  padding: "6px 12px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE */}
        {activeTab === "attendance" && (
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h3>Attendance Log ({attendance.length})</h3>
            {attendance.map((att) => (
              <div
                key={att.id}
                style={{
                  padding: "12px",
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <div>Date: {att.date || "N/A"}</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  Check-In: {att.checkIn || "N/A"} | Check-Out:{" "}
                  {att.checkOut || "N/A"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TASKS */}
        {activeTab === "tasks" && (
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h3>Task Log ({tasks.length})</h3>
            {tasks.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: "12px",
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {t.title || "Untitled Task"}
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  Status: {t.status || "Pending"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: DEPARTMENTS */}
        {activeTab === "departments" && (
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h3>Departments ({departments.length})</h3>
            {departments.map((dep) => (
              <div
                key={dep.id}
                style={{
                  padding: "12px",
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {dep.name || dep.departmentName || "Department"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: REPORTS */}
        {activeTab === "reports" && (
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h3>Reports ({reports.length})</h3>
            {isEmployer ? (
              reports.map((r) => (
                <div
                  key={r.id}
                  style={{
                    padding: "12px",
                    backgroundColor: "#0f172a",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div>Report ID: {r.id}</div>
                </div>
              ))
            ) : (
              <p style={{ color: "#f87171" }}>
                Restricted Access: Reports are reserved for Employer role.
              </p>
            )}
          </div>
        )}

        {/* Footer Signature */}
        <footer
          style={{
            marginTop: "32px",
            textAlign: "center",
            fontSize: "13px",
            color: "#94a3b8",
          }}
        >
          Designed & Engineered by{" "}
          <strong style={{ color: "#38bdf8" }}>Hesbon Software Designer</strong>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
