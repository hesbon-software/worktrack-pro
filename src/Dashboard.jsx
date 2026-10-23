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
          // Fetch user role from Firestore 'users' collection using their UID
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().role) {
            setUserRole(userDoc.data().role.toLowerCase()); // 'employee', 'manager', or 'employer'
          } else {
            // Default fallback if no role document is found yet
            setUserRole('employee');
          }
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('employee'); // Default safe fallback
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <p>Loading your secure workspace...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '1.5rem', fontFamily: 'sans-serif' }}>
      {/* Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #1e293b' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>WorkTrack Pro Dashboard</h1>
          <p style={{ fontSize: '0.75rem', color: '#22d3ee', fontWeight: 'bold', textTransform: 'uppercase', margin: '0.25rem 0 0 0' }}>
            POWERED BY HESBON SOFTWARE DESIGNER
          </p>
        </div>
        <div style={{ backgroundColor: '#0f172a', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #1e293b', fontSize: '0.85rem', color: '#38bdf8' }}>
          Role: <strong style={{ textTransform: 'capitalize' }}>{userRole}</strong>
        </div>
      </header>

      {/* Main Content Area - Renders based strictly on Firebase Role */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {userRole === 'employee' && <EmployeeDashboard />}
        {userRole === 'manager' && <ManagerDashboard />}
        {userRole === 'employer' && <EmployerDashboard />}
        
        {/* Fallback if role doesn't match any known type */}
        {userRole !== 'employee' && userRole !== 'manager' && userRole !== 'employer' && (
          <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
            <h3 style={{ color: '#ef4444' }}>Access Restricted</h3>
            <p style={{ color: '#94a3b8' }}>No valid role profile found for this account. Please contact your system administrator.</p>
          </div>
        )}
      </main>
    </div>
  );
}
