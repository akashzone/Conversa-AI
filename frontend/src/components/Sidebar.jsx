import React from 'react'
import logo from "../assets/logo3.png";
import "./Sidebar.css";
const Sidebar = () => {
    return (
        <section className="sidebar">
            <button className="newChatBtn">
                <img src={logo} alt="logo" className="logo" />
                <i class="fa-solid fa-file-pen newChatIcon"></i>
            </button>
            <ul className="historyList">
                <li>Getting Started with React<i class="fa-solid fa-ellipsis editIcon"></i></li>
                <li>Understanding JavaScript Closures<i class="fa-solid fa-ellipsis editIcon"></i></li>
                <li>Building a Chat App UI<i class="fa-solid fa-ellipsis editIcon"></i></li>
                <li>Deploying MERN App<i class="fa-solid fa-ellipsis editIcon"></i></li>
            </ul>

            <div className="sidebarFooter">
                Made with <i class="fa-solid fa-heart heartIcon"></i> by Akash Nadar
            </div>
        </section>
    )
}

export default Sidebar