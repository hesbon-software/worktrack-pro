import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// --- COMPANY ROLES FOR TASK INSERTION ---
const COMPANY_ROLES = [
  { id: 'swe', name: 'Software Engineer', department: 'IT / Software' },
  { id: 'pm', name: 'Product Manager', department: 'Product' },
  { id: 'qa', name: 'QA Specialist', department: 'Quality Assurance' },
  { id: 'devops', name: 'DevOps Engineer', department: 'Infrastructure' },
  { id: 'uiux', name: 'UI/UX Designer', department: 'Design' },
  { id: 'data', name: 'Data Analyst', department: 'Analytics' },
  { id: 'hr', name: 'HR Specialist', department: 'Human Resources' },
];

export default function Dashboard() {
  const [userRole, setUserRole] = useState('employee');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // --- INTERACTIVE STATE ---
  const [clockInTime, setClockInTime] = useState('08:12 AM');
  const [isPresent, setIsPresent] = useState(true);
  
  // Task Insertion state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskStatus, setTaskStatus] = useState('In Progress');
  const [taskList, setTaskList] = useState([
    { id: 1, title: 'Website Update', status: 'Completed', time: '08:00 AM - 11:30 AM' },
    { id: 2, title: 'API Integration', status: 'In Progress', time: '12:00 PM - 04:00 PM' },
    { id: 3, title: 'UI Fixes', status: 'Pending', time: '04:00 PM - 05:00 PM' }
  ]);

  // Absence state
  const [absenceDate, setAbsenceDate] = useState('2026-10-24');
  const [absenceReason, setAbsenceReason] = useState('');
  const [absenceDetails, setAbsenceDetails] = useState('');
  const [absenceRequests, setAbsenceRequests] = useState([
    { id: 1, date: '22 Oct 2026', reason: 'Personal', status: 'Pending', feedback: '-' },
    { id: 2, date: '15 Oct 2026', reason: 'Sick Leave', status: 'Approved', feedback: 'Get well soon!' },
  ]);

  // License Modal State
  const [showLicense, setShowLicense] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists() && userDoc.data().role) {
            setUserRole(userDoc.data().role.toLowerCase());
          }
        }
      } catch (error) {
        console.error('Error fetching role:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleClockInToggle = () => {
    if (isPresent) {
      setIsPresent(false);
    } else {
      setIsPresent(true);
      setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleCheckboxChange = (roleName) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== roleName));
    } else {
      setSelectedRoles([...selectedRoles, roleName]);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      status: taskStatus,
      time: `${clockInTime} - Active`
    };
    setTaskList([newTask, ...taskList]);
    setTaskTitle('');
    setTaskDesc('');
    alert('Task successfully submitted to Manager!');
  };

  const handleAbsenceSubmit = (e) => {
    e.preventDefault();
    if (!absenceReason) return;
    const newReq = {
      id: Date.now(),
      date: absenceDate,
      reason: absenceReason,
      status: 'Pending',
      feedback: '-'
    };
    setAbsenceRequests([newReq, ...absenceRequests]);
    setAbsenceReason('');
    setAbsenceDetails('');
    alert('Absence request submitted to Manager!');
  };

  const filteredRoles = COMPANY_ROLES.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
       <div style={{ minHeight: '100vh', backgroundColor: '#0b1329', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Loading WorkTrack Pro Workspace...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      
      {/* ================= SIDEBAR NAVIGATION ================= */}
      <aside style={{ width: '250px', backgroundColor: '#0b1329', color: '#94a3b8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.25rem 1rem', flexShrink: 0 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
            <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.5rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>❖</div>
            <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#ffffff' }}>WorkTrack Pro</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {[
              { id: 'dashboard', label: userRole === 'manager' ? 'Overview' : 'Dashboard', icon: '📊' },
              { id: 'attendance', label: 'Attendance', icon: '⏱️' },
              { id: 'tasks', label: userRole === 'manager' ? 'Task Reports' : 'My Tasks', icon: '📝' },
              { id: 'absence', label: userRole === 'manager' ? 'Absence Requests' : 'Report Absence', icon: '📅' },
              { id: 'payroll', label: 'Payroll Management', icon: '💳' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    backgroundColor: isActive ? '#1d2a4a' : 'transparent',
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    fontWeight: isActive ? '600' : 'normal',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <button
            onClick={() => setShowLicense(true)}
            style={{ width: '100%', backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer', marginBottom: '1rem' }}
          >
            📜 View License & Terms
          </button>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'transparent', border: 'none', color: '#f87171', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* TOP HEADER */}
        <header style={{ height: '65px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#334155' }}>
            Hesbon Software Designer - Platform View
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>📅 Thu, 23 Oct 2026</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f1f5f9', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#2563eb', fontWeight: 'bold' }}>
              <span>User Role:</span>
              <span style={{ textTransform: 'capitalize' }}>{userRole}</span>
            </div>
          </div>
        </header>

        {/* VIEW ROUTING */}
        <main style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          
          {/* VIEW 1: EMPLOYEE DASHBOARD */}
          {activeTab === 'dashboard' && userRole === 'employee' && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.25rem 0' }}>Welcome back, Hesbon Ndemo!</h2>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Work hard, stay focused, achieve more.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#475569' }}>
                  <div><strong>ID:</strong> EMP001</div>
                  <div><strong>Dept:</strong> IT / Software</div>
                  <div><strong>Role:</strong> Software Engineer</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <h4>Attendance Today</h4>
                  <p style={{ color: isPresent ? '#16a34a' : '#ef4444', fontWeight: 'bold' }}>
                    {isPresent ? `Present (Clocked in at ${clockInTime})` : 'Clocked Out'}
                  </p>
                  <button onClick={handleClockInToggle} style={{ backgroundColor: isPresent ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    {isPresent ? 'Clock Out' : 'Clock In Now'}
                  </button>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <h4>Task Insertions</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{taskList.length} active tasks submitted today.</p>
                  <button onClick={() => setActiveTab('tasks')} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Manage Tasks ➔
                  </button>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <h4>Absence Reporting</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Need to request time off?</p>
                  <button onClick={() => setActiveTab('absence')} style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Report Absence ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: MANAGER DASHBOARD */}
          {activeTab === 'dashboard' && userRole === 'manager' && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Staff</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>18</div>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Present Today</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>14</div>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Absent Today</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>2</div>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Pending Reports</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706' }}>4</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: TASK INSERTION PAGE */}
          {activeTab === 'tasks' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
              
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Task Insertion & Details</h3>
                
                {/* Search & Select Company Roles */}
                <div style={{ marginBottom: '1.25rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>🏢 Search & Select Involved Company Roles</label>
                  <input
                    type="text"
                    placeholder="Search roles or departments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box', marginBottom: '0.75rem' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', maxHeight: '140px', overflowY: 'auto' }}>
                    {filteredRoles.map((role) => (
                      <label key={role.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: '#fff', padding: '0.35rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role.name)}
                          onChange={() => handleCheckboxChange(role.name)}
                        />
                        <span>{role.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddTask} style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Task Title *</label>
                    <input type="text" required placeholder="Enter task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Task Description *</label>
                    <textarea rows="3" required placeholder="Describe deliverables..." value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Submit Insertions to Manager
                  </button>
                </form>
              </div>

              {/* Task Sidebar */}
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 1rem 0' }}>Submitted Tasks</h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {taskList.map((t) => (
                    <div key={t.id} style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: '#f8fafc' }}>
                      <strong style={{ fontSize: '0.85rem' }}>{t.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.status} | {t.time}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEW 4: ATTENDANCE PAGE */}
          {activeTab === 'attendance' && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Attendance Workspace</h3>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button onClick={handleClockInToggle} style={{ backgroundColor: isPresent ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                  {isPresent ? 'Clock Out Now' : 'Clock In Now'}
                </button>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                Status: <strong>{isPresent ? `Present (Clock-In: ${clockInTime})` : 'Clocked Out'}</strong>
              </p>
            </div>
          )}

          {/* VIEW 5: REPORT ABSENCE PAGE */}
          {activeTab === 'absence' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0' }}>Report Absence</h3>
                <form onSubmit={handleAbsenceSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Date of Absence</label>
                    <input type="date" value={absenceDate} onChange={(e) => setAbsenceDate(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Reason</label>
                    <select value={absenceReason} onChange={(e) => setAbsenceReason(e.target.value)} required style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1' }}>
                      <option value="">Select Reason</option>
                      <option value="Personal">Personal</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Family Emergency">Family Emergency</option>
                    </select>
                  </div>
                  <button type="submit" style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Submit Request
                  </button>
                </form>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0' }}>My Requests</h3>
                {absenceRequests.map((req) => (
                  <div key={req.id} style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <strong>{req.date}</strong> - {req.reason} ({req.status})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 8: PAYROLL PAGE */}
          {activeTab === 'payroll' && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Payroll Management</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Monthly Payroll Total: <strong>KSh 1,280,000</strong></p>
            </div>
          )}

        </main>

        {/* SOFTWARE LICENSE FOOTER */}
        <footer style={{ padding: '1rem 1.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
          <strong>WorkTrack Pro Workspace Platform</strong> | Powered by Hesbon Software Designer | Software End-User License & Terms Active
        </footer>

      </div>

      {/* SOFTWARE LICENSE MODAL */}
      {showLicense && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '2rem', maxWidth: '550px', width: '100%', color: '#0f172a' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Software End-User License Agreement</h3>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.5' }}>
              <strong>Developer:</strong> Hesbon Software Designer<br />
              <strong>Grant:</strong> Non-exclusive, non-transferable enterprise access.<br />
              <strong>Security:</strong> Enforced via Firebase Auth & Firestore role rules.
            </p>
            <button onClick={() => setShowLicense(false)} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 'bold' }}>
              Close Agreement
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

