import React from 'react'
import "./Chat.css"
import { useContext } from 'react'
import { MyContext } from './MyContext'

import ReactMarkdown from 'react-markdown'   
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"

const Chat = () => {
  let { newChat, prevChat } = useContext(MyContext);

  return (
    <div className="chatBox">
      {newChat && <h1 className='new'>Start a new Chat</h1>}

      <div className="chats">
        {prevChat?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "replyDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="user">{chat.message}</p>
            ) : (
              <div className="markdown">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.message}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat