import React, { useState, useEffect } from 'react';

export default function EmployeeDashboard() {
  const [currentStep, setCurrentStep] = useState('initial'); // 'initial' or 'shift-form'
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [taskNote, setTaskNote] = useState('');
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Timer effect when clocked in
  useEffect(() => {
    let timer;
    if (currentStep === 'shift-form') {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep]);

  const handleClockIn = () => {
    setCurrentStep('shift-form');
    setClockInTime(new Date().toLocaleTimeString());
    setElapsedTime(0);
    setSuccessMessage('');
  };

  const handleSubmitToManager = (e) => {
    e.preventDefault();
    if (!taskNote.trim()) return;

    const newTaskEntry = {
      id: Date.now(),
      note: taskNote,
      clockIn: clockInTime,
      clockOut: new Date().toLocaleTimeString(),
      duration: formatTime(elapsedTime),
      date: new Date().toLocaleDateString(),
    };

    setSubmittedTasks([newTaskEntry, ...submittedTasks]);
    setTaskNote('');
    setSuccessMessage('Shift report and insertions successfully submitted to Manager review!');
    
    // Optional: Reset back or stay on page
    setTimeout(() => {
      setCurrentStep('initial');
    }, 2500);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      
      {/* STEP 1: INITIAL WELCOME & CLOCK IN BUTTON */}
      {currentStep === 'initial' && (
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#22d3ee', margin: '0 0 0.5rem 0' }}>Employee Workspace</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Ready to begin your shift? Clock in to access your department details and submit task reports to management.
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
            Clock In Now ➔
          </button>
        </div>
      )}

      {/* STEP 2: ACTIVE SHIFT DETAILS PAGE & SUBMISSION FORM */}
      {currentStep === 'shift-form' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          
          {/* Header Banner */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#38bdf8', margin: '0 0 0.2rem 0' }}>Active Shift Portal</h2>
              <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>Hesbon Software Designer - Secured Employee Session</p>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live Timer: </span>
              <strong style={{ color: '#4ade80', fontSize: '1.1rem' }}>{formatTime(elapsedTime)}</strong>
            </div>
          </div>

          {/* Department & Role Information Table */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>📊 Shift & Department Credentials</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                    <th style={{ padding: '0.75rem' }}>Parameter</th>
                    <th style={{ padding: '0.75rem' }}>Assigned Details</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#f8fafc' }}>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>Department</td>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>Software Engineering & Operations</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>System Role</td>
                    <td style={{ padding: '0.75rem', fontWeight: '600', textTransform: 'capitalize' }}>Employee</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>Clock-In Timestamp</td>
                    <td style={{ padding: '0.75rem', color: '#38bdf8' }}>{clockInTime}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>Current Status</td>
                    <td style={{ padding: '0.75rem', color: '#4ade80', fontWeight: 'bold' }}>🟢 Active Shift In Progress</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Task Insertion Form for Manager */}
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>📝 Task Insertions & Shift Report</h3>

            {successMessage && (
              <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmitToManager}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                  Enter Tasks Completed / Shift Insertions for Management Review
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Detail your code commits, tasks solved, or operational progress..."
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
                  Cancel Shift
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* Submitted Logs History (Always visible below) */}
      {submittedTasks.length > 0 && (
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>📋 Sent Shift Reports History</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {submittedTasks.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#1e293b', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ color: '#f8fafc', fontSize: '0.85rem', margin: '0 0 0.2rem 0' }}>{item.note}</p>
                  <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Date: {item.date} | Duration: {item.duration}</p>
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
