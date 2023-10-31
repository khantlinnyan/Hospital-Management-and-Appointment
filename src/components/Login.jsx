"use client";
import { useState } from "react";
import { useToast } from "./ErrorHandlingToast/useToaster";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { CiAlarmOn } from 'react-icons/ci'
import Link from "next/link";
import { toast } from "react-hot-toast";
export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { toastSuccess, toastError } = useToast()

    let data = JSON.stringify(formData);

    const handleLogin = async (e) => {
        e.preventDefault();
        toast('Please wait a second', {
            icon: <CiAlarmOn />,
            position: "top-center"
        });

        try {
            const response = await axios.post("/login", data);
            console.log("Login successfully: ", response.data);
            let resData = response.data;
            let user = resData.data.user;
            let token = resData.data.token;
            Cookies.set("user_info", JSON.stringify(user));
            Cookies.set("token", token);
            toastSuccess(response.data.message);

            router.push('/user')
        } catch (error) {
            toastError(error.response.data.message)
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form method="POST" onSubmit={handleLogin}>
            <div className="relative mt-5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                    >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="email-icon"
                    name="email"
                    className="my-2 p-3 bg-gray-50 border rounded-full border-[#EE86D7] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="relative mt-5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        height="1em"
                        viewBox="0 0 448 512"
                    >
                        <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                    </svg>
                </div>
                <input
                    type="password"
                    id="password-icon"
                    name="password"
                    className="my-2 p-3 bg-gray-50 border rounded-full border-[#EE86D7] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <Link href='/auth/forgot-password' className="text-blue-500 font-normal text-sm">Forgot Password</Link>
            <button className="w-full h-12 mt-4 px-6 rounded-full text-white bg-[#1EC1A4] focus:shadow-outline hover:bg-indigo-800">
                Sign In
            </button>
        </form>
    );
}
