import './ChatWindow.css'
import { MyContext } from './MyContext'
import { useContext, useState } from 'react'
import Chat from "./Chat.jsx"
import { ScaleLoader } from 'react-spinners'

const ChatWindow = () => {

  const {
    prompt,
    setPrompt,
    setReply,
    currThreadId,
    setPrevChat,
    setNewChat
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleRes = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage,
          threadId: currThreadId
        })
      });

      const data = await res.json();
      if (!res.ok || !data.reply) {
        throw new Error(data.error || "Failed to fetch response");
      }
      setPrevChat(prev => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: data.reply }
      ]);

      setReply(data.reply); // for typing effect
      setNewChat(false);

    } catch (err) {
      console.error("Frontend error:", err);
      setPrevChat(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: Failed to get response" }
      ]);
    }
    setPrompt("");
    setLoading(false);
  };

  const handleUserProfile = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mainChatWindow">
      <div className="navbar">
        <span className="appName">
          Conversa AI <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userProfile">
          <i className="fa-solid fa-user userIcon" onMouseOver={handleUserProfile}></i>
        </div>
      </div>
      {
        isOpen && (
          <div className="dropDown">
        <div className="dropDownItem"><i class="fa-solid fa-star-of-david"></i>Upgrade Plan</div>
        <div className="dropDownItem"><i class="fa-solid fa-star-of-david"></i>Settings</div>
        <div className="dropDownItem"><i class="fa-regular fa-life-ring"></i>Help</div>
        <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</div>
      </div>
        )
      }
      <Chat />

      <div className="inputArea">
        <ScaleLoader loading={loading} className="loader" color="#ffffff" />

        <div className="inputBox">
          <input
            type="text"
            value={prompt}
            placeholder="Ask anything..."
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRes();
            }}
          />

          <button onClick={handleRes} className="sendBtn">
            <i className="fa-solid fa-paper-plane sendIcon"></i>
          </button>
        </div>

        <div className="footer">
          <span>
            Conversa AI can make mistakes. Check important info.
            <a href="#"> See Cookie Preferences.</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow