import React, { useState } from 'react';

export default function TaskInsertionView() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Website Update', status: 'Completed', time: '08:00 AM - 11:30 AM' },
    { id: 2, title: 'API Integration', status: 'In Progress', time: '12:00 PM - 04:00 PM' },
    { id: 3, title: 'UI Fixes', status: 'Pending', time: '04:00 PM - 05:00 PM' }
  ]);

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)', boxSizing: 'border-box' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        
        {/* Left Form Panel */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 0.25rem 0' }}>Task Insertion & Details</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>Add your daily tasks and provide details for your manager.</p>

          <form style={{ display: 'grid', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Department</label>
              <select style={{ width: '100%', padding: '0.6rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.85rem' }}>
                <option>Software Engineer</option>
                <option>Quality Assurance</option>
                <option>Product Management</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Task Title *</label>
                <input type="text" placeholder="Enter task title" style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Task Description *</label>
                <input type="text" placeholder="Describe what you did..." style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Task Status *</label>
                <select style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Start Time *</label>
                <input type="text" defaultValue="2026-10-23 08:00 AM" style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Completion Time</label>
                <input type="text" defaultValue="2026-10-23 12:00 PM" style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Challenges / Issues</label>
                <input type="text" placeholder="Any challenges or blockers?" style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Next Day Plan</label>
                <input type="text" placeholder="What will you work on next?" style={{ width: '100%', padding: '0.55rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#475569', marginBottom: '0.35rem', fontWeight: '500' }}>Attach File (optional)</label>
              <input type="file" style={{ fontSize: '0.8rem', color: '#64748b' }} />
            </div>

            <button type="button" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.75rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' }}>
              Submit Insertions to Manager
            </button>
          </form>
        </div>

        {/* Right Task List Sidebar */}
        <div>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a' }}>Task List</h4>
              <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                + Add Task
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {tasks.map((t) => (
                <div key={t.id} style={{ border: '1px solid #f1f5f9', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>▸ {t.title}</span>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: 'bold', 
                      padding: '0.15rem 0.45rem', 
                      borderRadius: '0.25rem',
                      backgroundColor: t.status === 'Completed' ? '#dcfce7' : t.status === 'In Progress' ? '#dbeafe' : '#fef3c7',
                      color: t.status === 'Completed' ? '#16a34a' : t.status === 'In Progress' ? '#2563eb' : '#d97706'
                    }}>
                      {t.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{t.time}</div>
                </div>
              ))}
            </div>

            <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.65rem', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', width: '100%', marginTop: '1.25rem' }}>
              Submit Insertions to Manager
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

