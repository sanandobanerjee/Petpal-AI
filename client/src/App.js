import React from 'react';
import ActivityLog from './ActivityLog';
import Dashboard from './Dashboard';
import Chatbot from './Chatbot';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>PetPalAI</h1>
        <p className="subtitle">Your pet activity tracker & AI assistant</p>
      </header>
      <main>
        {/* Dashboard, Activity Log, and Chatbot will be added here */}
        <section className="dashboard-card">
          <h2>Today's Summary</h2>
          <Dashboard />
        </section>
        <section className="activity-log-card">
          <h2>Log Activity</h2>
          <ActivityLog />
        </section>
        <section className="chatbot-card">
          <h2>Pet Care Chatbot</h2>
          <Chatbot />
        </section>
      </main>
    </div>
  );
}

export default App;
