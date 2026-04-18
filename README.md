# 🚀 Conversa AI

A full-stack AI-powered chat application built using the MERN stack. It allows users to interact with an AI assistant, manage conversations, and experience a modern chat interface with real-time feedback.

---

## 🌐 Live Demo

- **Frontend:** https://conversa-ai-taupe.vercel.app/  
- **Backend:** https://conversa-ai-rnmc.onrender.com  

---

## 📌 Features

- 💬 Real-time AI chat interface  
- ✨ Typing animation for responses  
- 🧵 Multiple chat threads (create, switch, delete)  
- 📂 Sidebar with active chat highlighting  
- 🧠 Global state management using Context API  
- 📝 Markdown support (code blocks, formatting)  
- 📱 Responsive UI (mobile + desktop)  
- 🗄️ Persistent chat history with MongoDB  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Context API  
- CSS  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  

### Integrations
- Gemini API  
- REST APIs  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/akashzone/Conversa-AI.git
cd Conversa-AI
2. Setup Backend
cd backend
npm install

Create .env file:

MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_api_key

Run backend:

npm start
3. Setup Frontend
cd ../frontend
npm install

Create .env file:

VITE_API_URL=https://conversa-ai-rnmc.onrender.com

Run frontend:

npm run dev
🚀 Deployment
Frontend deployed on Vercel
Backend deployed on Render
⚠️ Notes
Backend may take a few seconds to respond initially (Render free tier sleep)
Ensure environment variables are correctly configured
📌 Future Improvements
User authentication
Chat export feature
UI/UX enhancements
Performance optimizations
👨‍💻 Author

Akash Nadar

LinkedIn: https://www.linkedin.com/in/akashnadar-dev
GitHub: https://github.com/akashzone
⭐ Acknowledgements
Google Gemini API
MERN Stack ecosystem

---