import axios from "@/lib/axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ChatInput({ receiver, fetchRecentMessages, bookingId }) {
    const token = Cookies.get("token");
    const [message, setMessage] = useState('');


    const sendMessage = async (e) => {
        try {
            e.preventDefault();
        await axios.post(`/message/${receiver.id}?bookingId=${bookingId}`, { message }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        setMessage('');
        fetchRecentMessages();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    return (

        <div className="chat-input-container bg-gray-100 p-4 border-t border-gray-200">
            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-1 mr-2 p-2 border rounded focus:outline-none focus:border-blue-500"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none mr-2"
                    onClick={sendMessage}
                >
                    Send
                </button>
                <Link href='/user/hospital' className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                    Back
                </Link>

            </div>
        </div>

    )
}