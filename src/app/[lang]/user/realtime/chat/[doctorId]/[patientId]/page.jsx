"use client";

import { useState, useEffect } from "react";
import Layout from "../../../../Layout";
import ConfirmPopup from "@/components/AppointmentPopUp/ConfirmPopup";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Pusher from "pusher-js";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const ChatApp = ({ params }) => {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookId");

    const [showPopup, setShowPopup] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user_info"))
    const [formData, setFormData] = useState({
        doctorId: params.doctorId,
        patientId: params.patientId,
        bookingId: bookingId,
    });

    const pusherJob = () => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        });


        const channel = pusher.subscribe('message.' + bookingId);
        channel.bind('fresher', function (data) {
            setMessages(prevMessages => [...prevMessages, data.message]);
        });

        return () => {
            channel.unbind('fresher');
            pusher.unsubscribe('message.' + bookingId);
        };
    }

    const formatHumanTime = (timestamp) => {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(timestamp).toLocaleString(undefined, options);
    };

    const getAllMessages = async () => {
        try {
            const res = await axios
                .get(`/message/${params.doctorId}`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            setMessages(res.data.message.messages);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePopup = () => {
        setShowPopup(!showPopup);
    };

    const sendMessage = async () => {
        await axios.post(
            `/message/${params.doctorId}?booking_id=${bookingId}`,
            { message: newMessage },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        setNewMessage("");
    };

    useEffect(() => {
        getAllMessages();
        pusherJob();
    }, []);

    return (
        <Layout>
            <div>
                <div className="flex flex-col justify-center w-full mt-4">
                    <div className="uppercase flex gap-x-2 text-xs text-start mb-4 md:text-base">
                        <nav aria-label="Breadcrumb">
                            <ol className="flex items-center gap-1 text-sm text-gray-600">
                                <li>
                                    <a
                                        href="#"
                                        className="block transition hover:text-gray-700"
                                    >
                                        <span className="sr-only"> Home </span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                    </a>
                                </li>

                                <li className="rtl:rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="block transition hover:text-gray-700"
                                    >
                                        {" "}
                                        appointment{" "}
                                    </a>
                                </li>
                                <li className="rtl:rotate-180">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="block transition hover:text-gray-700"
                                    >
                                        {" "}
                                        chatting{" "}
                                    </a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <h3 className="text-3xl font-medium justify-start md:text-5xl">
                            <span className="text-zinc-800">Live </span>
                            <span className=" text-green-500">Chatting</span>
                        </h3>
                    </div>
                </div>
                <div className="max-w-screen mx-auto bg-white rounded-lg shadow-lg mt-10 overflow-hidden">
                    <div className="border-t-4 border-blue-500 p-6">
                        <div className="h-96 overflow-y-auto mb-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}

                                    className={`mb-4 ${message.sender_id === user?.id
                                        ? "text-right text-blue-600"
                                        : "text-left text-gray-700"
                                        }`}
                                >
                                    <div
                                        className={`p-4 rounded-lg inline-block border ${message.sender === user?.id
                                            ? "border-blue-300 bg-blue-200"
                                            : "border-gray-300 bg-gray-200"
                                            }`}
                                    >
                                        <div className="mb-2 text-xs text-gray-500">
                                            {formatHumanTime(
                                                message.created_at,
                                            )}
                                        </div>
                                        {message.message}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="flex items-center p-4 border-t border-gray-300">
                        <input
                            type="text"
                            className="flex-1 mr-2 p-2 border rounded transition duration-300 ease-in-out focus:border-transparent hover:border-blue-500"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
                <div className="pt-5 flex justify-start">
                    <button
                        onClick={handlePopup}
                        className="border rounded font-normal p-4 shadow-lg bg-red-400 hover:bg-red-500 text-white"
                    >
                        Leave
                    </button>
                </div>
                {showPopup ? (
                    <ConfirmPopup onopen={showPopup} onclose={setShowPopup} bookingId={bookingId} />
                ) : null}
            </div>
        </Layout>
    );
};

export default ChatApp;
