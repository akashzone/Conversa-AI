
import './ChatWindow.css'
import { MyContext } from './MyContext'
import { useContext, useState, useEffect } from 'react'
import Chat from "./Chat.jsx"
import { ScaleLoader } from 'react-spinners'

const ChatWindow = () => {

  let { prompt, setPrompt, reply, setReply, currThreadId, prevChat, setPrevChat } = useContext(MyContext);
  let [loading, setLoading] = useState(false);
  const handleRes = async () => {

    if (!prompt) {
      console.log("Enter required fields!");
    }
    else {
      setLoading(true)
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId
        })
      }

      try {
        console.log("content:", prompt, "threadId:", currThreadId)
        let res = await fetch("http://localhost:5000/api/chat", options);
        let data = await res.json();
        console.log(data.reply);
        setReply(data.reply);

      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    if (prompt && reply) {
      setPrevChat(
        prevChat => (
          [...prevChat, {
            role: "user",
            message: prompt,
          },
          {
            role: "assistant",
            message: reply
          }
          ])
      )
    }
    setPrompt("");
  }, [reply])
  return (
    <div className="mainChatWindow">
      <div className="navbar">
        <span className="appName">Conversa AI <i className="fa-solid fa-angle-down"></i></span>
        <div className="userProfile">
          <i className="fa-solid fa-user userIcon"></i>
        </div>
      </div>
      <Chat />
      <div className="inputArea">
        <ScaleLoader loading={loading} className="loader" color="#ffffff" />
        <div className="inputBox">
          <input type="text" value={prompt} onKeyDown={(e) => {
            if (e.key === "Enter") handleRes();
          }} onChange={(e) => {
            setPrompt(e.target.value)
          }} placeholder="Ask anything..." />
          <button onClick={handleRes} className="sendBtn"><i className="fa-solid fa-paper-plane sendIcon"></i></button>
        </div>
        <div className="footer">
          <span>Conversa AI can make mistakes. Check important info. <a href="#">See Cookie Preferences.</a></span>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow