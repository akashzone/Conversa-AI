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
    if (!reply) {
      setLatestReply("");
      return;
    }

    if (!prevChat?.length) return;

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
  }, [reply]);

  return (
    <div className="chatBox">
      {prevChat?.length === 0 && <h1 className="new">Start a new Chat</h1>
      }
      <div className="chats">
        {/* Previous chats (excluding latest) */}
        {
          prevChat?.slice(0, -1).map((chat, idx) => (
            <div
              className={chat.role === "user" ? "userDiv" : "replyDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="user">{chat.content}</p>
              ) : (
                <div className="markdown">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {chat.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}

        {/* Latest AI reply (typing effect) */}
        {/* Latest AI reply */}
        {prevChat?.length > 0 && (
          <>
            {latestReply ? (
              // typing effect
              <div className="replyDiv" key={"typing"}>
                <div className="markdown">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {latestReply}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              // normal render (no typing)
              <div className="replyDiv" key={"non-typing"}>
                <div className="markdown">
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {prevChat[prevChat.length - 1]?.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;