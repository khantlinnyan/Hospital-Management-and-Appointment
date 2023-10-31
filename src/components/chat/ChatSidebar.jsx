
import React from 'react'
import Link from 'next/link'
import { FaUserCircle, FaSearch } from 'react-icons/fa'

const ChatSidebar = ({ recentMessages, getReceiverId }) => {
    console.log(recentMessages);
    return (
        <>
            <div className="sidebar-container w-72 p-4 bg-white border-r border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">Recent Chats</h2>
                <div className="user-list overflow-y-auto">
                    {recentMessages.map((user, index) => (
                        <div
                            key={index}
                            className="user-item flex items-center py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => getReceiverId(user.user_id)}
                        >
                            <div className="avatar mr-3">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                ) : (
                                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                                )}
                            </div>
                            <div className="user-details">
                                <h3 className="text-lg font-medium">{user.name}</h3>
                                <p className="text-sm text-gray-500">{user.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ChatSidebar