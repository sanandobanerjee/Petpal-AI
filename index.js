
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pets = [];
const activities = [];
const chatHistory = [];

function getToday() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

app.post('/api/activity', (req, res) => {
  const { petName, type, durationOrQuantity, timestamp } = req.body;
  if (!petName || !type || !durationOrQuantity || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  activities.push({ petName, type, durationOrQuantity, timestamp });
  res.json({ success: true });
});

app.get('/api/summary', (req, res) => {
  const today = getToday();
  const todayActivities = activities.filter(a => a.timestamp.startsWith(today));
  const summary = {};
  todayActivities.forEach(a => {
    if (!summary[a.petName]) {
      summary[a.petName] = { walk: 0, meal: 0, medication: 0 };
    }
    if (a.type === 'walk') summary[a.petName].walk += Number(a.durationOrQuantity);
    if (a.type === 'meal') summary[a.petName].meal += Number(a.durationOrQuantity);
    if (a.type === 'medication') summary[a.petName].medication += Number(a.durationOrQuantity);
  });
  res.json(summary);
});

app.get('/api/activities', (req, res) => {
  res.json(activities);
});

// AI chatbot endpoint with OpenAI integration
app.post('/api/chat', async (req, res) => {
  const { message, petName } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required.' });
  chatHistory.push({ message, petName, timestamp: new Date().toISOString() });
  if (chatHistory.length > 10) chatHistory.shift();

  let response = `Advice for ${petName || 'your pet'}: Make sure to log walks, meals, and medications!`;

  if (process.env.OPENAI_API_KEY) {
    try {
      const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful pet care assistant.' },
            ...chatHistory.map(c => ({ role: 'user', content: c.message })),
            { role: 'user', content: message }
          ],
          max_tokens: 100
        })
      });
      const openaiData = await openaiRes.json();
      response = openaiData.choices?.[0]?.message?.content || response;
    } catch (err) {
      response = 'AI service error. Showing default advice.';
    }
  }
  res.json({ response, history: chatHistory });
});

app.get('/api/reminder', (req, res) => {
  const now = new Date();
  if (now.getHours() < 18) return res.json({ reminder: false });
  const today = getToday();
  const walkedPets = new Set(
    activities.filter(a => a.type === 'walk' && a.timestamp.startsWith(today)).map(a => a.petName)
  );
  const allPets = Array.from(new Set(activities.map(a => a.petName)));
  const petsNeedingWalk = allPets.filter(pet => !walkedPets.has(pet));
  res.json({ reminder: petsNeedingWalk });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
