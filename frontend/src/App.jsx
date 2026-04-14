
import './App.css'
import ChatWindow from './components/ChatWindow'
import Sidebar from './components/Sidebar'
import { MyContext } from './components/MyContext'
import { useState } from 'react'
import {v1 as uuid} from 'uuid';

function App() {
  const [prompt,setPrompt] = useState("");
  const [reply,setReply] = useState();
  const [threadId,setThreadId] = useState(uuid());
  const Provider ={
    prompt,setPrompt,
    reply,setReply,
    threadId,setThreadId
  }
  return (
    <div className="app">
      <MyContext.Provider value={Provider}>
        <Sidebar />
      <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App
