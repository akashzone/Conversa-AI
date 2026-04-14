import React from 'react'
import './ChatWindow.css'
import { MyContext } from './MyContext'
import { useContext } from 'react'

const ChatWindow = () => {

  let {prompt,setPrompt,reply,setReply,threadId} = useContext(MyContext);

  const handleRes = async ()=>{
    let options = {
      method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message : prompt,
      threadId : threadId
    })
    }

    try{
      console.log("content:",prompt,"threadId:",threadId)
      let res = await fetch("http://localhost:5000/api/chat",options);
      let data = await res.json();
      console.log(data.reply);
    }catch(err){
      console.log(err);
    }
  } 
  return (
    <div className="mainChatWindow">
      <div className="navbar">
        <span className="appName">Conversa AI <i className="fa-solid fa-angle-down"></i></span>
        <div className="userProfile">
          <i className="fa-solid fa-user userIcon"></i>
        </div>
      </div>
      <div className="chatArea">
      
      </div>
      <div className="inputArea">
      <div className="inputBox">
        <input type="text" value={prompt} onChange={(e)=> 
        { setPrompt(e.target.value)
          // console.log(prompt)
        }} placeholder="Ask anything..."/>
        <button onClick={handleRes} onKeyDown={e=>{e.key === "Enter" && ""}} className="sendBtn"><i className="fa-solid fa-paper-plane sendIcon"></i></button>
      </div>
      <div className="footer">
          <span>Conversa AI can make mistakes. Check important info. <a href="#">See Cookie Preferences.</a></span>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow