import React from 'react';
import { User, Settings, History, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
        <h1 className="title">Not Logged In</h1>
        <p style={{ color: 'var(--sub-color)' }}>Please login to view your profile.</p>
        <div style={{ marginTop: '2rem' }}>
          <a href="/login" className="nav-item" style={{ display: 'inline-block', color: 'var(--main-color)' }}>Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          backgroundColor: '#1a1a1a', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          margin: '0 auto 1.5rem',
          border: '2px solid var(--main-color)'
        }}>
          <User size={50} color="var(--main-color)" />
        </div>
        <h1 className="title" style={{ color: 'var(--main-color)', margin: '0' }}>{user.username || 'User'}</h1>
        <p style={{ color: 'var(--sub-color)' }}>{user.email}</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {[
          { icon: <History />, label: 'Test History', desc: '0 tests completed' },
          { icon: <Award />, label: 'Achievements', desc: 'No badges yet' },
          { icon: <Settings />, label: 'Settings', desc: 'Customize experience' }
        ].map((item, index) => (
          <div key={index} style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '1.5rem', 
            borderRadius: '12px',
            textAlign: 'center',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ color: 'var(--main-color)', marginBottom: '0.5rem' }}>{item.icon}</div>
            <h3 style={{ margin: '0.5rem 0', fontSize: '1.1rem' }}>{item.label}</h3>
            <p style={{ color: 'var(--sub-color)', fontSize: '0.9rem', margin: '0' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
