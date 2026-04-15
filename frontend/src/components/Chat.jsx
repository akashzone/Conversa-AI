import React, { useContext, useEffect } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Chat = () => {
  const {
    newChat,
    prevChat,
    reply,
    latestReply,
    setLatestReply,
  } = useContext(MyContext);

  useEffect(() => {
    if (!prevChat?.length || !reply) return;

    // reset before typing starts
    setLatestReply("");

    const words = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, idx + 1).join(" "));
      idx++;

      if (idx >= words.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [prevChat, reply, setLatestReply]);

  return (
    <div className="chatBox">
      {newChat && <h1 className="new">Start a new Chat</h1>}

      <div className="chats">
        {/* Previous chats (excluding latest) */}
        {prevChat?.slice(0, -1).map((chat, idx) => (
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

        {/* Latest AI reply (typing effect) */}
        {prevChat?.length > 0 && latestReply !== null && (
          <div className="replyDiv">
            <div className="markdown">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {latestReply}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;