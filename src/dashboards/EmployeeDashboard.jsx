import React, { useState } from 'react';

// Comprehensive list of company roles
const COMPANY_ROLES = [
  { id: 'swe', name: 'Software Engineer', department: 'Engineering' },
  { id: 'pm', name: 'Product Manager', department: 'Product' },
  { id: 'qa', name: 'QA Specialist', department: 'Quality Assurance' },
  { id: 'devops', name: 'DevOps Engineer', department: 'Infrastructure' },
  { id: 'uiux', name: 'UI/UX Designer', department: 'Design' },
  { id: 'data', name: 'Data Analyst', department: 'Analytics' },
  { id: 'hr', name: 'HR Specialist', department: 'Human Resources' },
];

export default function EmployeeDashboard() {
  const [currentStep, setCurrentStep] = useState('initial'); // 'initial' or 'shift-form'
  const [autoTimeIn, setAutoTimeIn] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [taskNote, setTaskNote] = useState('');
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClockIn = () => {
    // Automatic time-in capture
    const timestamp = new Date().toLocaleString();
    setAutoTimeIn(timestamp);
    setCurrentStep('shift-form');
    setSuccessMessage('');
  };

  const handleCheckboxChange = (roleName) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== roleName));
    } else {
      setSelectedRoles([...selectedRoles, roleName]);
    }
  };

  const handleSubmitToManager = (e) => {
    e.preventDefault();
    if (!taskNote.trim()) return;

    const newTaskEntry = {
      id: Date.now(),
      note: taskNote,
      timeIn: autoTimeIn,
      timeOut: new Date().toLocaleTimeString(),
      rolesInvolved: selectedRoles,
      date: new Date().toLocaleDateString(),
    };

    setSubmittedTasks([newTaskEntry, ...submittedTasks]);
    setTaskNote('');
    setSelectedRoles([]);
    setSuccessMessage('Shift report and role selections successfully submitted to Manager review!');
    
    setTimeout(() => {
      setCurrentStep('initial');
    }, 2500);
  };

  // Filter roles based on search query
  const filteredRoles = COMPANY_ROLES.filter((r) => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      
      {/* STEP 1: INITIAL WORKSPACE ENTRY */}
      {currentStep === 'initial' && (
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#22d3ee', margin: '0 0 0.5rem 0' }}>Employee Workspace</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Ready to log your shift? Click below to initialize automatic time-in and access task insertions.
          </p>

          <button
            onClick={handleClockIn}
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              padding: '0.9rem 2.5rem',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            Clock In & Start Shift ➔
          </button>
        </div>
      )}

      {/* STEP 2: SHIFT REPORT & ROLE TICK BOXES */}
      {currentStep === 'shift-form' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          
          {/* Header Banner with Automatic Time-In */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#38bdf8', margin: '0 0 0.2rem 0' }}>Shift Report & Task Insertions</h2>
              <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>Hesbon Software Designer - Active Secure Session</p>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Automatic Time-In: </span>
              <strong style={{ color: '#4ade80', fontSize: '0.85rem' }}>{autoTimeIn}</strong>
            </div>
          </div>

          {/* Company Roles Selection Section with Search Bar & Tick Boxes */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 0.5rem 0' }}>🏢 Select Company Roles / Departments Involved</h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Use the search bar to find roles and tick the boxes matching your shift collaborators or focus areas.
            </p>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search company roles or departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box', fontSize: '0.85rem', marginBottom: '1rem' }}
            />

            {/* Tick Box List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {filteredRoles.map((role) => (
                <label 
                  key={role.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    backgroundColor: '#1e293b', 
                    padding: '0.5rem 0.75rem', 
                    borderRadius: '0.375rem', 
                    border: '1px solid #334155', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: '#f8fafc'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role.name)}
                    onChange={() => handleCheckboxChange(role.name)}
                    style={{ accentColor: '#2563eb', cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                  <div>
                    <span style={{ fontWeight: '600', display: 'block' }}>{role.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{role.department}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Task Insertion Form for Manager */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>📝 Task Insertions & Details</h3>

            {successMessage && (
              <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmitToManager}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                  Detail your shift tasks and submissions for management review
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Enter task insertions, completed deliverables, or progress notes..."
                  value={taskNote}
                  onChange={(e) => setTaskNote(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  Submit Insertions to Manager
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep('initial')}
                  style={{ backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #334155', padding: '0.75rem 1rem', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* Submitted Logs History */}
      {submittedTasks.length > 0 && (
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>📋 Sent Shift Reports History</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {submittedTasks.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#1e293b', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ color: '#f8fafc', fontSize: '0.85rem', margin: '0 0 0.2rem 0' }}>{item.note}</p>
                  <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>
                    Time-In: {item.timeIn} | Roles: {item.rolesInvolved.length > 0 ? item.rolesInvolved.join(', ') : 'None selected'}
                  </p>
                </div>
                <span style={{ backgroundColor: '#065f46', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem', fontWeight: 'bold' }}>
                  Delivered to Manager
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
