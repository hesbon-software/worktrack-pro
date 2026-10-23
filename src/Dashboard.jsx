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
      <div style={{ minHeight: '100vh', backgroundColor: 'transparent', color: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <p>Loading your secure workspace...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', color: '#f8fafc', padding: '1.5rem', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(30, 41, 59, 0.8)', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>WorkTrack Pro Dashboard</h1>
            <p style={{ fontSize: '0.75rem', color: '#22d3ee', fontWeight: 'bold', textTransform: 'uppercase', margin: '0.25rem 0 0 0' }}>
              POWERED BY HESBON SOFTWARE DESIGNER
            </p>
          </div>
          
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(30, 41, 59, 0.8)', fontSize: '0.85rem', color: '#38bdf8' }}>
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

      {/* Formal Software License Footer (Displayed Down Here) */}
      <footer style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(51, 65, 85, 0.8)', borderRadius: '0.75rem', fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.5' }}>
        <p style={{ color: '#f8fafc', fontWeight: 'bold', marginBottom: '0.5rem' }}>📜 SOFTWARE END-USER LICENSE & TERMS OF SERVICE</p>
        <p style={{ margin: '0.25rem 0' }}><strong>Developer:</strong> Hesbon Software Designer | <strong>Platform:</strong> WorkTrack Pro Enterprise Suite</p>
        <p style={{ margin: '0.25rem 0' }}>
          1. <strong>License Grant:</strong> This software is licensed, not sold. Unauthorized reverse engineering, redistribution, or modification of source files is prohibited.
        </p>
        <p style={{ margin: '0.25rem 0' }}>
          2. <strong>Security & Access:</strong> Access to employee, manager, and employer dashboards is strictly gated via Firebase Authentication and Firestore role permissions.
        </p>
        <p style={{ margin: '0.25rem 0' }}>
          3. <strong>Disclaimer:</strong> Provided "AS IS" without warranties of any kind. All data logs and shift reports are securely managed under organization privacy standards.
        </p>
      </footer>
    </div>
  );
}
