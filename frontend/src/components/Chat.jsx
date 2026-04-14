import React from 'react'
import "./Chat.css"
import { useContext } from 'react'
import { MyContext } from './MyContext'


const Chat = () => {
  let { newChat, prevChat } = useContext(MyContext);
  return (
    <>
          <div className="chatBox">
        {newChat && <h1 className='new'>Start a new Chat</h1>}
        <div className="chats">

          {prevChat?.map((chat,idx) => {
            return (
              <div className={chat.role === "user" ? "userDiv" : "replyDiv"} key={idx}>
                {
                  chat.role === "user" ? <p className="user">
                    {chat.message}
                  </p> : <p className="reply">
                    {chat.message}
                  </p>
                }
              </div>
            )
          }
          )}
        </div>
      </div>
    </>
  )
}

export default Chat