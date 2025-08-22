import React, { useState } from 'react';

function Chatbot() {
  const [petName, setPetName] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, petName })
      });
      const data = await res.json();
      setResponse(data.response);
      setChat(data.history || []);
      setMessage('');
    } catch {
      setResponse('Error contacting AI.');
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-ui">
      <form className="chatbot-form" onSubmit={sendMessage}>
        <label>
          Pet Name (optional)
          <input
            type="text"
            value={petName}
            onChange={e => setPetName(e.target.value)}
            placeholder="e.g. Buddy"
          />
        </label>
        <label>
          Your Question
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Ask about pet care..."
            required
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Send'}</button>
      </form>
      <div className="chatbot-response">
        {response && <div className="ai-response"><strong>AI:</strong> {response}</div>}
        {chat.length > 0 && (
          <div className="chat-history">
            <h4>Chat History</h4>
            <ul>
              {chat.map((c, i) => (
                <li key={i}><strong>You:</strong> {c.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
