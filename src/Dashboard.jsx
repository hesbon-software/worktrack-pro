import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import EmployerDashboard from './dashboards/EmployerDashboard';

export default function Dashboard() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().role) {
            setUserRole(userDoc.data().role.toLowerCase());
          } else {
            setUserRole('employee');
          }
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('employee');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', color: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <p>Loading workspace...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', padding: '1.5rem', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>WorkTrack Pro Dashboard</h1>
            <p style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase', margin: '0.25rem 0 0 0' }}>
              POWERED BY HESBON SOFTWARE DESIGNER
            </p>
          </div>
          
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#38bdf8' }}>
            Role: <strong style={{ textTransform: 'capitalize' }}>{userRole}</strong>
          </div>
        </header>

        {/* Main Content Area */}
        <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {userRole === 'employee' && <EmployeeDashboard />}
          {userRole === 'manager' && <ManagerDashboard />}
          {userRole === 'employer' && <EmployerDashboard />}
        </main>
      </div>

      {/* Software License Footer */}
      <footer style={{ marginTop: '3rem', padding: '1.25rem 1.5rem', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.5' }}>
        <p style={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '0.4rem' }}>📜 SOFTWARE END-USER LICENSE & TERMS OF SERVICE</p>
        <p style={{ margin: '0.2rem 0' }}><strong>Developer:</strong> Hesbon Software Designer | <strong>Platform:</strong> WorkTrack Pro Enterprise Suite</p>
        <p style={{ margin: '0.2rem 0' }}>
          1. <strong>License Grant:</strong> This software is licensed, not sold. Unauthorized reverse engineering, redistribution, or modification of source files is prohibited.
        </p>
        <p style={{ margin: '0.2rem 0' }}>
          2. <strong>Security & Access:</strong> Access to employee, manager, and employer dashboards is strictly gated via Firebase Authentication and Firestore role permissions.
        </p>
        <p style={{ margin: '0.2rem 0' }}>
          3. <strong>Disclaimer:</strong> Provided "AS IS" without warranties of any kind. All data logs and shift reports are securely managed under organization privacy standards.
        </p>
      </footer>
    </div>
  );
}
