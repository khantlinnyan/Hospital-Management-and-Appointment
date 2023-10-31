import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react"
import toast from "react-hot-toast";

const ConfirmPopup = ({ onopen, onclose, bookingId }) => {
    const router = useRouter();
    const confirmPopup = async () => {
        const res = await axios.post(`/leave-chat/${bookingId}`, null, {
            headers: {
                Accept: "application/json",
                ContentType: "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        if (res.status === 200) {
            toast.success("You have left the chat");
            onclose();
            router.push("/user");
        }

    }

    const closePopup = () => {
        onclose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="rounded-lg bg-white p-8 shadow-2xl">
                {/* Popup Content */}
                <h2 className="text-lg font-bold">Are you sure you want to do that?</h2>
                <p className="mt-2 text-sm text-gray-500">
                    Doing that could have caused some issues elsewhere, are you 100% sure it's OK?
                </p>
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={confirmPopup}
                        type="button"
                        className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                    >
                        Yes, I'm sure
                    </button>
                    <button
                        onClick={closePopup}
                        type="button"
                        className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                    >
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
