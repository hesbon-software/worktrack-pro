import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// Company Roles List
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clock & State Tracking
  const [clockInTime, setClockInTime] = useState('08:12 AM');
  const [isPresent, setIsPresent] = useState(true);

  // Tasks & Roles State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskList, setTaskList] = useState([
    { id: 1, title: 'Website Update', status: 'Completed', time: '08:00 AM - 11:30 AM' },
    { id: 2, title: 'API Integration', status: 'In Progress', time: '12:00 PM - 04:00 PM' }
  ]);

  // Absence State
  const [absenceDate, setAbsenceDate] = useState('2026-10-24');
  const [absenceReason, setAbsenceReason] = useState('');
  const [absenceRequests, setAbsenceRequests] = useState([
    { id: 1, date: '22 Oct 2026', reason: 'Personal', status: 'Pending', feedback: '-' },
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

  const handleLogout = () => auth.signOut();

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
    setTaskList([
      { id: Date.now(), title: taskTitle, status: 'In Progress', time: `${clockInTime} - Active` },
      ...taskList
    ]);
    setTaskTitle('');
    setTaskDesc('');
    alert('Task successfully submitted to Manager!');
  };

  const handleAbsenceSubmit = (e) => {
    e.preventDefault();
    if (!absenceReason) return;
    setAbsenceRequests([
      { id: Date.now(), date: absenceDate, reason: absenceReason, status: 'Pending', feedback: '-' },
      ...absenceRequests
    ]);
    setAbsenceReason('');
    alert('Absence request submitted!');
  };

  const filteredRoles = COMPANY_ROLES.filter(
    (r) =>
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

  const navItems = [
    { id: 'dashboard', label: userRole === 'manager' ? 'Overview' : 'Dashboard', icon: '📊' },
    { id: 'attendance', label: 'Attendance', icon: '⏱️' },
    { id: 'tasks', label: userRole === 'manager' ? 'Task Reports' : 'My Tasks', icon: '📝' },
    { id: 'absence', label: userRole === 'manager' ? 'Absence Requests' : 'Report Absence', icon: '📅' },
    { id: 'payroll', label: 'Payroll Management', icon: '💳' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      
      {/* ================= SIDEBAR (Visible on Laptop, Collapsible on Mobile) ================= */}
      <aside
        className={mobileMenuOpen ? 'mobile-show' : ''}
        style={{
          width: '260px',
          backgroundColor: '#0b1329',
          color: '#94a3b8',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          padding: '1.25rem 1rem',
          flexShrink: 0,
          boxSizing: 'border-box'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
            <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.5rem', borderRadius: '0.5rem', fontWeight: 'bold' }}>❖</div>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff' }}>WorkTrack Pro</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.7rem 0.85rem',
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
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <button
            onClick={() => setShowLicense(true)}
            style={{ width: '100%', backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '0.55rem', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer', marginBottom: '1rem' }}
          >
            📜 View Software License
          </button>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.65rem 0.85rem', backgroundColor: 'transparent', border: 'none', color: '#f87171', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN WRAPPER ================= */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP HEADER */}
        <header style={{ height: '65px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', display: 'none' }}
              className="hamburger-btn"
            >
              ☰
            </button>
            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a' }}>
              Hesbon Software Designer
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>📅 Thu, 23 Oct 2026</span>
            <div style={{ backgroundColor: '#f1f5f9', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#2563eb', fontWeight: 'bold' }}>
              Role: <span style={{ textTransform: 'capitalize' }}>{userRole}</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT VIEWS */}
        <main style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.25rem 0' }}>Welcome back, Hesbon Ndemo!</h2>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>Work hard, stay focused, achieve more.</p>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#475569' }}>
                  <div><strong>ID:</strong> EMP001</div>
                  <div><strong>Dept:</strong> IT / Software</div>
                  <div><strong>Position:</strong> Software Engineer</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Attendance Status</h4>
                  <p style={{ color: isPresent ? '#16a34a' : '#ef4444', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {isPresent ? `Present (Clocked in at ${clockInTime})` : 'Clocked Out'}
                  </p>
                  <button onClick={handleClockInToggle} style={{ backgroundColor: isPresent ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>
                    {isPresent ? 'Clock Out' : 'Clock In Now'}
                  </button>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Today's Tasks</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{taskList.length} active tasks submitted.</p>
                  <button onClick={() => setActiveTab('tasks')} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Manage Tasks ➔
                  </button>
                </div>

                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>Absence Reporting</h4>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Request time off or sick leave.</p>
                  <button onClick={() => setActiveTab('absence')} style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Report Absence ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TASK INSERTION VIEW */}
          {activeTab === 'tasks' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Task Insertion & Roles</h3>
                
                <div style={{ marginBottom: '1.25rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}> Search & Select Company Roles Involved</label>
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
                    <textarea rows="3" required placeholder="Describe completed tasks..." value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    Submit Insertions to Manager
                  </button>
                </form>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <h4 style={{ margin: '0 0 1rem 0' }}>Task List</h4>
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

          {/* ATTENDANCE VIEW */}
          {activeTab === 'attendance' && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Attendance Workspace</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.5rem' }}>
                Current Status: <strong style={{ color: isPresent ? '#16a34a' : '#ef4444' }}>{isPresent ? `Present (Clocked in at ${clockInTime})` : 'Clocked Out'}</strong>
              </p>
              <button onClick={handleClockInToggle} style={{ backgroundColor: isPresent ? '#ef4444' : '#16a34a', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
                {isPresent ? 'Clock Out Now' : 'Clock In Now'}
              </button>
            </div>
          )}

          {/* ABSENCE REPORT VIEW */}
          {activeTab === 'absence' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0' }}>Report Absence</h3>
                <form onSubmit={handleAbsenceSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Date of Absence</label>
                    <input type="date" value={absenceDate} onChange={(e) => setAbsenceDate(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Reason</label>
                    <select value={absenceReason} onChange={(e) => setAbsenceReason(e.target.value)} required style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
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
                <h3 style={{ margin: '0 0 1rem 0' }}>My Absence Requests</h3>
                {absenceRequests.map((req) => (
                  <div key={req.id} style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <strong>{req.date}</strong> - {req.reason} ({req.status})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYROLL VIEW */}
          {activeTab === 'payroll' && (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Payroll Management</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                Monthly Payroll Total: <strong style={{ color: '#16a34a' }}>KSh 1,280,000</strong>
              </p>
            </div>
          )}

        </main>

        {/* FOOTER */}
        <footer style={{ padding: '1rem 1.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#64748b' }}>
          <strong>WorkTrack Pro Workspace Platform</strong> | Powered by Hesbon Software Designer
        </footer>

      </div>

      {/* SOFTWARE LICENSE MODAL */}
      {showLicense && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', maxWidth: '500px', width: '100%', color: '#0f172a' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Software End-User License Agreement</h3>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: '1.5' }}>
              <strong>Developer:</strong> Hesbon Software Designer<br />
              <strong>Grant:</strong> Non-exclusive, non-transferable enterprise license.<br />
              <strong>Security:</strong> Enforced via Firebase Authentication & Firestore role profiles.
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
