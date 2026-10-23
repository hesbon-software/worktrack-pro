import React, { useState, useEffect } from 'react';

export default function EmployeeDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [taskNote, setTaskNote] = useState('');
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Timer effect when clocked in
  useEffect(() => {
    let timer;
    if (isClockedIn) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isClockedIn]);

  const handleClockToggle = () => {
    if (!isClockedIn) {
      setIsClockedIn(true);
      setClockInTime(new Date().toLocaleTimeString());
      setElapsedTime(0);
      setSuccessMessage('');
    } else {
      setIsClockedIn(false);
    }
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
    setSuccessMessage('Shift report and task insertions successfully submitted to Manager review!');
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Workspace Greeting Card */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#22d3ee', margin: '0 0 0.5rem 0' }}>Employee Workspace</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          Welcome back! Track your daily shift, document tasks, and submit your work records directly to management.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Time Tracking Panel */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>⏱️ Shift Time Tracking</h3>
            
            <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.25rem 0' }}>CURRENT STATUS</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: isClockedIn ? '#4ade80' : '#f87171', margin: 0 }}>
                {isClockedIn ? '🟢 Active Shift (Clocked In)' : '🔴 Shift Ended / Clocked Out'}
              </p>
              {isClockedIn && (
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8', margin: '0.5rem 0 0 0' }}>
                  {formatTime(elapsedTime)}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleClockToggle}
            style={{
              backgroundColor: isClockedIn ? '#ef4444' : '#10b981',
              color: '#fff',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In Now'}
          </button>
        </div>

        {/* Task Submission Panel */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>📝 Submit Work Insertions to Manager</h3>
          
          {successMessage && (
            <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmitToManager}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                Daily Progress / Task Insertions
              </label>
              <textarea
                rows="3"
                required
                placeholder="Describe tasks completed during your shift..."
                value={taskNote}
                onChange={(e) => setTaskNote(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box', fontSize: '0.85rem' }}
              />
            </div>

            <button
              type="submit"
              style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Submit to Manager
            </button>
          </form>
        </div>

      </div>

      {/* Submitted Logs History */}
      {submittedTasks.length > 0 && (
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '1.5rem', borderRadius: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>📋 Submitted Shift Reports</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {submittedTasks.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#1e293b', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ color: '#f8fafc', fontSize: '0.85rem', margin: '0 0 0.2rem 0' }}>{item.note}</p>
                  <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Date: {item.date} | Shift Duration: {item.duration}</p>
                </div>
                <span style={{ backgroundColor: '#065f46', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem', fontWeight: 'bold' }}>
                  Sent to Manager
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}