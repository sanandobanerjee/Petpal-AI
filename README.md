# PetPalAI

A responsive, mobile-first pet activity tracker web application that helps pet owners log and monitor their pet's daily activities—including walks, meals, and medications—with an integrated AI chatbot for pet care assistance.

## Features
- **Log Pet Activities:** Track walks, meals, and medications with pet name, duration/quantity, and timestamp.
- **Today's Summary Dashboard:** Visual progress indicators for total walk time, meals, and medications.
- **AI Chatbot:** Contextual pet care advice powered by OpenAI.
- **Smart Reminders:** Notifies if no walk is logged by 6 PM local time.
- **Mobile-First Design:** Inspired by health tracking apps, with playful, pet-friendly UI.

## Tech Stack
- **Frontend:** React (mobile-first, Poppins/Inter fonts, card-based layout)
- **Backend:** Node.js + Express (in-memory data, no database)
- **AI:** OpenAI GPT (via API key)

## Getting Started

### Prerequisites
- Node.js & npm installed
- OpenAI API key (for chatbot)

### Setup
1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/PetPalAI-app.git
   cd PetPalAI-app
   ```
2. **Install backend dependencies:**
   ```
   cd server
   npm install
   ```
3. **Add your OpenAI API key:**
   - Create a `.env` file in the `server` folder:
     ```
     OPENAI_API_KEY=your-key-here
     ```
4. **Start the backend server:**
   ```
   node index.js
   ```
5. **Install frontend dependencies and start React app:**
   ```
   cd ../client
   npm install
   npm start
   ```
6. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)

## API Endpoints
- `POST /api/activity` — Log pet activity
- `GET /api/summary` — Get today's summary
- `GET /api/activities` — List all activities
- `POST /api/chat` — AI chatbot
- `GET /api/reminder` — Smart walk reminder
  - Text: #2C3E50 (dark blue)
  - Success: #2ECC71 (green)
- **Design:** Poppins/Inter fonts, card-based layout, 16px spacing, rounded corners, smooth CSS animations

## License
MIT
