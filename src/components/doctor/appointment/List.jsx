"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import AppointmentCard from "@/components/doctor/AppointmentCard";

const List = ({ langVar, langType }) => {
    const token = Cookies.get("token");
    const [appointmentLists, setAppointmentLists] = useState([]);
    const [error, setError] = useState(null);

    const getAllAppointmentForDoctor = useCallback(async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/today-appointment`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            setError("Something wrong.");
            return;
        }
        const responseData = await response.json();
        setAppointmentLists(responseData.data);
    }, [token]);

    useEffect(() => {
        getAllAppointmentForDoctor();
    }, [getAllAppointmentForDoctor]);

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

    return (
        <div className="p-6 bg-white shadow rounded-xl">
            <h1>{langVar?.doctor.appointments}</h1>

            <div className="grid grid-cols-1 mt-5">
                {/* {error && <div className="text-red-500">{error}</div>} */}
                {appointmentLists
                    ? appointmentLists?.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            id={appointment.id}
                            // fetchData={fetchData}
                            is_visible={appointment.is_visible}
                            status={appointment.status}
                            appointmentDate={appointment.appointmentDate}
                            appointmentTime={appointment.appointmentTime}
                            patientId={appointment.patientId}
                            doctorId={appointment.doctorId}
                            doctorName={appointment.patientName ?? "Unknown"}
                            doctorLocation={appointment.doctorLocation}
                            bookingId={appointment.bookingId}
                            appointmentType={appointment.appointmentType}
                        />
                        // <div>Shi tl</div>
                    ))
                    : null}

                <div className="p-3 text-center">
                    <Link href={`/${langType}/doctor/appointment`}>
                        <button className="bg-gray-500 text-white px-3 py-3 rounded-md">
                            {langVar?.doctor.see_more}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default List;
