import React, { use } from 'react'
import logo from "../assets/logo3.png";
import "./Sidebar.css";

import { MyContext } from './MyContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import {v1 as uuid} from 'uuid';

const Sidebar = () => {

    const { allThreads, setAllThreads, currThreadId, 
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChat,
        setNewChat,
         setLatestReply,
        } = useContext(MyContext);
    const getThreads = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/threads");
            const data = await response.json();
            const filteredThreads = data.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            // console.log("Fetched threads:", filteredThreads);

            setAllThreads(filteredThreads);
        } catch (err) {
            console.error("Error fetching threads:", err);
        }
    };
    useEffect(() => {

        getThreads();
    }, [currThreadId]);
    const createNewChat = () => {
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuid());
        setPrevChat([]);
        setLatestReply("");
        setNewChat(true);
    };

    const displayChats = async (threadId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/threads/${threadId}`);
            const data = await response.json();
            console.log("Fetched thread data:", data.messages);
            setPrevChat(data.messages);
            setCurrThreadId(threadId);
            setNewChat(false);
        } catch (err) {
            console.error("Error fetching chat history:", err);
        }
    };

    const handleDelete = async (threadId) =>{
        if (!window.confirm("Are you sure you want to delete this thread?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/threads/${threadId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setAllThreads(allThreads.filter(thread => thread.threadId !== threadId));
                if (currThreadId === threadId) {
                    createNewChat();
                }
            } else {
                console.error("Error deleting thread:", response.statusText);
            }
        } catch (err) {
            console.error("Error deleting thread:", err);
        }
    };
    return (
        <section className="sidebar">
            <button className="newChatBtn" onClick={ createNewChat }>
                <img src={logo} alt="logo" className="logo" />
                <i className="fa-solid fa-file-pen newChatIcon"></i>
            </button>
            {
                allThreads.length > 0 &&
                <span className="recentSpan">Recents<i className="fa-solid fa-angle-down"></i></span>

            }
            <ul className="historyList">
                {allThreads.map((thread) =>
                    <li onClick={() => {
                        displayChats(thread.threadId);
                    }} key={thread.threadId} className={ currThreadId === thread.threadId ? "highlighted" : ""}>
                        {thread.title}
                        <i className="fa-solid fa-trash deleteIcon" onClick={() => {handleDelete(thread.threadId)}}></i>
                    </li>
                )}

            </ul>

            <div className="sidebarFooter">
                Made with <i className="fa-solid fa-heart heartIcon"></i> by Akash Nadar
            </div>
        </section>
    )
}

export default Sidebar