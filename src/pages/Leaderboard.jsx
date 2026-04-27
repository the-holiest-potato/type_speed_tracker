import { useState, useEffect } from "react";
import "./Leaderboard.css";

const API_URL =
  "http://ec2-40-192-38-237.ap-south-2.compute.amazonaws.com:5000/api";

function Leaderboard() {
  const [mode, setMode] = useState("time 30");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const modes = [
    { label: "15", value: "time 15" }, // Added 15 just in case, though Home uses 30, 60, 120
    { label: "30", value: "time 30" },
    { label: "60", value: "time 60" },
    { label: "120", value: "time 120" },
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/tests/leaderboard/${mode}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [mode]);

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1 className="leaderboard-title">Leaderboard</h1>
        <div className="leaderboard-modes">
          {modes.map((m) => (
            <button
              key={m.value}
              className={`mode-btn ${mode === m.value ? "active" : ""}`}
              onClick={() => setMode(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </header>

      <div className="leaderboard-table-container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : data.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th className="rank">#</th>
                <th>User</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index}>
                  <td className="rank">{index + 1}</td>
                  <td className="user-cell">{entry.username}</td>
                  <td className="wpm-cell">{entry.wpm}</td>
                  <td className="acc-cell">{entry.accuracy}%</td>
                  <td className="date-cell">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            No results found for this mode yet. Be the first!
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
