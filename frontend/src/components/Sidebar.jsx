import React from 'react'
import logo from "../assets/logo3.png";
import "./Sidebar.css";
const Sidebar = () => {
    return (
        <section className="sidebar">
            <button className="newChatBtn">
                <img src={logo} alt="logo" className="logo" />
                <i className="fa-solid fa-file-pen newChatIcon"></i>
            </button>
            <span className="recentSpan">Recents<i className="fa-solid fa-angle-down"></i></span>
            <ul className="historyList">
                <li>Getting Started with React<i className="fa-solid fa-ellipsis editIcon"></i></li>
                <li>Understanding JavaScript Closures<i className="fa-solid fa-ellipsis editIcon"></i></li>
                <li>Building a Chat App UI<i className="fa-solid fa-ellipsis editIcon"></i></li>
                <li>Deploying MERN App<i className="fa-solid fa-ellipsis editIcon"></i></li>
            </ul>

            <div className="sidebarFooter">
                Made with <i className="fa-solid fa-heart heartIcon"></i> by Akash Nadar
            </div>
        </section>
    )
}

export default Sidebar