import React, { useMemo, useState, useEffect } from 'react';
import { User, History, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import './Profile.css';

const Profile = () => {
  const { user, testHistory } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stats = useMemo(() => {
    if (testHistory.length === 0) return { avgWpm: 0, bestWpm: 0, totalTests: 0 };
    
    const totalWpm = testHistory.reduce((acc, curr) => acc + curr.wpm, 0);
    const bestWpm = Math.max(...testHistory.map(t => t.wpm));
    
    return {
      avgWpm: Math.round(totalWpm / testHistory.length),
      bestWpm: bestWpm,
      totalTests: testHistory.length
    };
  }, [testHistory]);

  const chartData = useMemo(() => {
    return [...testHistory].reverse().map((test, index) => ({
      name: index + 1,
      wpm: test.wpm,
      accuracy: test.accuracy,
      date: new Date(test.date).toLocaleDateString()
    }));
  }, [testHistory]);

  if (!user) {
    return (
      <div className="profile-container" style={{ textAlign: 'center' }}>
        <h1 className="title">Not Logged In</h1>
        <p className="sub-text">Please login to view your profile.</p>
        <div style={{ marginTop: '2rem' }}>
          <a href="/login" className="nav-item" style={{ color: 'var(--main-color)' }}>Go to Login</a>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.date}</p>
          <p className="tooltip-value" style={{ color: 'var(--main-color)' }}>
            WPM: {payload[0].value}
          </p>
          {payload[1] && (
            <p className="tooltip-value" style={{ color: '#8884d8' }}>
              Accuracy: {payload[1].value}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-circle">
          <User size={50} color="var(--main-color)" />
        </div>
        <h1 className="title" style={{ color: 'var(--main-color)', margin: '0' }}>{user.username || 'User'}</h1>
        <p className="sub-text">{user.email}</p>
        
        <div className="profile-stats-summary">
          <div className="stat-item">
            <p className="label">tests started</p>
            <p className="value">{stats.totalTests}</p>
          </div>
          <div className="stat-item">
            <p className="label">avg. wpm</p>
            <p className="value">{stats.avgWpm}</p>
          </div>
          <div className="stat-item">
            <p className="label">best wpm</p>
            <p className="value">{stats.bestWpm}</p>
          </div>
        </div>
      </div>

      <div className="performance-section">
        <h2 className="section-title">
          <TrendingUp size={20} color="var(--main-color)" />
          Performance
        </h2>
        <div className="chart-wrapper">
          {testHistory.length > 0 && isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c2e31" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#646669" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#646669" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  label={{ value: 'WPM', angle: -90, position: 'insideLeft', fill: '#646669', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#646669" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  domain={[0, 100]}
                  label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight', fill: '#646669', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="wpm" 
                  stroke="var(--main-color)" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--main-color)' }}
                  activeDot={{ r: 6 }}
                  name="WPM"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#8884d8' }}
                  activeDot={{ r: 6 }}
                  name="Accuracy"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--sub-color)' }}>
              {testHistory.length > 0 ? 'Initializing chart...' : 'No data available to display'}
            </div>
          )}
        </div>
      </div>

      <div className="history-section">
        <h2 className="section-title">
          <History size={20} color="var(--main-color)" />
          Recent Tests
        </h2>
        
        {testHistory.length === 0 ? (
          <p className="sub-text" style={{ textAlign: 'center', padding: '2rem' }}>No tests completed yet. Start typing!</p>
        ) : (
          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>wpm</th>
                  <th>accuracy</th>
                  <th>raw</th>
                  <th>mode</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((test) => (
                  <tr key={test.id}>
                    <td className="wpm-text">{test.wpm}</td>
                    <td>{test.accuracy}%</td>
                    <td className="sub-text">{test.rawWpm}</td>
                    <td className="sub-text small-text">{test.mode}</td>
                    <td className="sub-text small-text">
                      {new Date(test.date).toLocaleDateString()} {new Date(test.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
