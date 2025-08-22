import React, { useState } from 'react';

const activityTypes = [
  { value: 'walk', label: 'Walk', unit: 'minutes' },
  { value: 'meal', label: 'Meal', unit: 'grams' },
  { value: 'medication', label: 'Medication', unit: 'dose(s)' }
];

function ActivityLog() {
  const [petName, setPetName] = useState('');
  const [type, setType] = useState('walk');
  const [durationOrQuantity, setDurationOrQuantity] = useState('');
  const [timestamp, setTimestamp] = useState(() => new Date().toISOString().slice(0,16));
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    if (!petName || !durationOrQuantity || !timestamp) {
      setStatus('Please fill all fields.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ petName, type, durationOrQuantity, timestamp })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Activity logged!');
        setPetName('');
        setDurationOrQuantity('');
        setTimestamp(new Date().toISOString().slice(0,16));
      } else {
        setStatus(data.error || 'Error logging activity.');
      }
    } catch (err) {
      setStatus('Server error.');
    }
  };

  return (
    <form className="activity-log-form" onSubmit={handleSubmit}>
      <label>
        Pet Name
        <input
          type="text"
          value={petName}
          onChange={e => setPetName(e.target.value)}
          placeholder="e.g. Buddy"
          required
        />
      </label>
      <label>
        Activity Type
        <select value={type} onChange={e => setType(e.target.value)}>
          {activityTypes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </label>
      <label>
        {type === 'walk' ? 'Duration' : type === 'meal' ? 'Quantity' : 'Dose'} ({activityTypes.find(t => t.value === type).unit})
        <input
          type="number"
          min="1"
          value={durationOrQuantity}
          onChange={e => setDurationOrQuantity(e.target.value)}
          required
        />
      </label>
      <label>
        Timestamp
        <input
          type="datetime-local"
          value={timestamp}
          onChange={e => setTimestamp(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log Activity</button>
      {status && <div className="status-msg">{status}</div>}
    </form>
  );
}

export default ActivityLog;
