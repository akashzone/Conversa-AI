
import './App.css'
import ChatWindow from './components/ChatWindow'
import Sidebar from './components/Sidebar'
import { MyContext } from './components/MyContext'
import { useState } from 'react'
import {v1 as uuid} from 'uuid';

function App() {
  const [prompt,setPrompt] = useState("");
  const [reply,setReply] = useState(null);
  const [currThreadId,setCurrThreadId] = useState(uuid());
  const [newChat,setNewChat] = useState(true);
  const [prevChat,setPrevChat] = useState([]);
  const [latestReply,setLatestReply] = useState("");
  const [allThreads,setAllThreads] = useState([]);

  const Provider = {
    newChat,setNewChat,
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    prevChat,setPrevChat,
    latestReply,setLatestReply,
    allThreads,setAllThreads
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
