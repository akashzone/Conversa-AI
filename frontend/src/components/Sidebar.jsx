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
            console.log("Fetched threads:", filteredThreads);

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
                <li>Getting Started with React<i className="fa-solid fa-ellipsis editIcon"></i></li>
                {allThreads.map((thread) =>
                    <li key={thread.threadId}>
                        {thread.title}
                        <i className="fa-solid fa-ellipsis editIcon"></i>
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