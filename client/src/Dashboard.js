import React, { useEffect, useState } from 'react';

function ProgressRing({ value, max, color, label }) {
  const radius = 32;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = Math.min(value / max, 1);
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <div className="progress-ring">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#eee"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="progress-label">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

const GOALS = {
  walk: 60, // minutes
  meal: 300, // grams
  medication: 1 // dose
};

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/summary');
        const data = await res.json();
        setSummary(data);
      } catch {
        setSummary({});
      }
      setLoading(false);
    }
    fetchSummary();
  }, []);

  if (loading) return <div>Loading summary...</div>;
  if (!Object.keys(summary).length) return <div>No activities logged today.</div>;

  return (
    <div className="dashboard-summary">
      {Object.entries(summary).map(([pet, stats]) => (
        <div key={pet} className="pet-summary-card">
          <h3>{pet}</h3>
          <div className="progress-rings">
            <ProgressRing value={stats.walk} max={GOALS.walk} color="var(--primary)" label="Walk (min)" />
            <ProgressRing value={stats.meal} max={GOALS.meal} color="var(--secondary)" label="Meal (g)" />
            <ProgressRing value={stats.medication} max={GOALS.medication} color="var(--accent)" label="Medication" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
