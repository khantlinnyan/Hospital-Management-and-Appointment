import React from "react";
import Image from "next/image";
import profileImg from "../../../public/images/doctor.png";
import { IdentificationCard, MapPin } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Link from "next/link";

const AppointmentCard = ({
    id,
    appointmentDate,
    appointmentTime,
    doctorName,
    doctorLocation,
    bookingId,
    status,
    appointmentType,
    fetchData,
    is_visible,
    doctorId,
    patientId,
}) => {
    console.log(patientId)
    const [isUpdating, setIsUpdating] = useState(false);
    const [cancelActionTriggered, setCancelActionTriggered] = useState(false);
    const currentTime = new Date();
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    const formatDateTime = (dateString, timeString) => {
        const appointmentDate = new Date(dateString);
        const optionsDate = { month: "short", day: "numeric", year: "numeric" };
        const formattedDate = appointmentDate.toLocaleDateString(
            "en-US",
            optionsDate,
        );

        const [hours, minutes] = timeString.split(":");
        const formattedTime = `${Number(hours) % 12 || 12}:${minutes} ${hours >= 12 ? "PM" : "AM"
            }`;

        return `${formattedDate} - ${formattedTime}`;
    };

    const checkAppointmentTime = (appointmentTime) => {
        const [hours, minutes] = appointmentTime.split(':').map(Number);
        const targetTime = new Date();
        targetTime.setHours(hours, minutes, 0, 0);
        const currentTime = new Date();
        const currentTimePlus30Minutes = new Date(currentTime);
        currentTimePlus30Minutes.setMinutes(currentTime.getMinutes() + 30);

        // console.log(currentTime + ' targetTime : ' + appointmentTime + ' currentTimePlus30Minutes : ' + currentTimePlus30Minutes);
        return currentTime >= targetTime && currentTime <= currentTimePlus30Minutes;
    };

    const handleCancelAppointment = async () => {
        setIsUpdating(true);

        try {


            await axios.delete(`/appointments/${id}`, {
                headers,
            });
            setCancelActionTriggered(true);
            setIsUpdating(false);
        } catch (error) {
            setIsUpdating(false);
        }
    };

    const handleVideoChat = async () => {
        await axios.get(`/enter-video-chat/${bookingId}`, {
            headers,
        });

    }

    useEffect(() => {
        fetchData();
    }, [cancelActionTriggered]);
    const isButtonDisabled = checkAppointmentTime(appointmentTime);

    return (
        <div className="shadow bg-white border rounded-xl p-4 mt-5">
            <h2 className="text-lg mb-2 font-semibold text-zinc-700">
                {formatDateTime(appointmentDate, appointmentTime)}
            </h2>
            <hr className="my-2" />
            <div className="flex items-center py-3 gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                        alt="doctor image"
                        width={100}
                        height={100}
                        src={profileImg}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold text-zinc-800">{doctorName}</h1>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                        <MapPin size={20} color="#006400" />
                        <p>{doctorLocation.join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                        <IdentificationCard size={20} color="#006400" />
                        <p>
                            Booking ID: <span className="text-green-600">#{bookingId}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                {is_visible === 0 ? null : (
                    <div className="">
                        <button
                            onClick={handleCancelAppointment}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Cancelling..." : "Cancel"}
                        </button>
                    </div>
                )}
                {
                    (appointmentType === "chat" && status === 'upcoming' && is_visible === 1) ? (
                        <div className="flex shrink-0">
                            {isButtonDisabled ? (
                                <Link href={`/en/user/realtime/chat/${doctorId}/${patientId}?bookId=${bookingId}`}>
                                    <button
                                        className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${isButtonDisabled ? '' : 'cursor-not-allowed'}`}
                                    >
                                        Enter Room Now
                                    </button>
                                </Link>
                            ) : (
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed" disabled>
                                    Enter Room Now
                                </button>
                            )}
                        </div>
                    ) : (appointmentType === "video" && status === 'upcoming' && is_visible === 1) ? (
                        <div className="flex shrink-0">
                            <a href={`http://127.0.0.1:8000/api/video-chat/${bookingId}`} target="_blank">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${isButtonDisabled ? '' : 'cursor-not-allowed'}`}
                                >
                                    Enter Video Room Now
                                </button>
                            </a>
                        </div>
                    ) : (
                        <div className="flex shrink-0">
                            <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                                Empty Room
                            </button>
                        </div>
                    )
                }

            </div>
        </div>

    );
};

export default AppointmentCard;
