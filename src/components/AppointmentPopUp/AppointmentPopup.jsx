"use client";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AppointmentPopUp = ({ isOpen, onClose, doctorName, doctorId }) => {
    const [appointmentTime, setAppointmentTime] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: doctorId,
        appointmentType: "outpatient",
        appointmentDate: "",
        appointmentTime: "",
        description: "",
        patientId: JSON.parse(Cookies.get("user_info")).id,
    });

    const { name } = JSON.parse(Cookies.get("user_info"));

    const fetchData = async () => {
        const appointmentTime = await axios.get(`/${doctorId}/appointments`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        setAppointmentTime(appointmentTime.data.data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePopUpClick = () => {
        onClose();
    };

    const handleCheckButtonClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/check-appointment", formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (response.data.data === null) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                
            }
            
        } catch (error) {
            const errorMessage = JSON.stringify(error.response.data.message);
            toast.error(errorMessage);
        }

    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity ${isOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none transform scale-95"
                }`}
        >
            <div
                className={`bg-white rounded-lg border border-gray-300 shadow-xl p-6 animate__animated ${isOpen ? "animate__fadeInUp" : "animate__fadeOutDown"
                    } w-full sm:w-96 transition-transform duration-300 ease-in-out`}
            >
                <div>
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                        Appointment Registration
                    </h2>
                    <form onSubmit={handleCheckButtonClick}>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-row space-x-4">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="PatientName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Patient Name
                                    </label>
                                    <input
                                        type="text"
                                        id="PatientName"
                                        name="patientName"
                                        value={name}
                                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label
                                        htmlFor="DoctorName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Doctor Name
                                    </label>
                                    <input
                                        type="text"
                                        id="DoctorName"
                                        name="doctorName"
                                        value={doctorName}
                                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div className="w-1/2">
                                    <label
                                        htmlFor="AppointmentDate"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Appointment Date
                                    </label>
                                    <input
                                        type="date"
                                        id="AppointmentDate"
                                        name="appointmentDate"
                                        value={formData.appointmentDate}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label
                                        htmlFor="AppointmentTime"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Appointment Time
                                    </label>
                                    <select
                                        id="appointmentType"
                                        name="appointmentTime"
                                        value={formData.appointmentTime}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm"
                                        required
                                    >
                                        <option value="">Select Time</option>
                                        {appointmentTime.map((item, index) => (
                                            <option
                                                value={item.appointmentTime}
                                                key={index}
                                            >
                                                {item.appointmentTime}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="appointmentType"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Please Select Appointment Type
                                </label>
                                <select
                                    name="appointmentType"
                                    id="appointmentType"
                                    value={formData.appointmentType}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 shadow-sm"
                                    required
                                >
                                    <option value="outpatient">
                                        OutPatient
                                    </option>
                                    <option value="chat">Live Chat</option>
                                    <option value="video">Live Video</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="OrderNotes"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    How do you feel today?
                                </label>
                                <textarea
                                    name="description"
                                    id="OrderNotes"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 shadow-sm"
                                    rows="4"
                                    placeholder="Enter your current state of health here..."
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Check Appointment
                                </button>
                                <button
                                    onClick={handlePopUpClick}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring focus:border-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentPopUp;
