import React from 'react'
import './ChatWindow.css'
const ChatWindow = () => {
  return (
    <div className="mainChatWindow">
      <div className="navbar">
        <span className="appName">Conversa AI <i class="fa-solid fa-angle-down"></i></span>
        <div className="userProfile">
          <i class="fa-solid fa-user userIcon"></i>
        </div>
      </div>
      <div className="chatArea">
      
      </div>
      <div className="inputArea">
      <div className="inputBox">
        <input type="text" name="" id="" placeholder="Ask anything..."/>
        <button className="sendBtn"><i class="fa-solid fa-paper-plane sendIcon"></i></button>
      </div>
      <div className="footer">
          <span>Conversa AI can make mistakes. Check important info. <a href="#">See Cookie Preferences.</a></span>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow