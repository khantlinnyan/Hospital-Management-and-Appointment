'use client';
import axios from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {

    const router = useRouter();
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/password/reset`, {
                code, password, password_confirmation
            }).then((response) => {
                console.log(response)
                toast.success(response.message)
                router.push("/auth/login")
            })
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                toast.error("Validation errors:", validationErrors);
            } else {
                toast.error("Registration error:", error.message);
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-300 to-blue-500">
            <div className="flex flex-col sm:flex-row items-center justify-center p-5 sm:p-10 bg-[#C1F8FC] rounded-lg shadow-lg">
                <div className="w-full sm:w-96 p-8">
                    <form
                        className="flex flex-col max-w-sm mx-auto"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
                            Reset Password
                        </h1>
                        <p className="text-gray-600 mb-6 text-center">
                            Enter the reset password code that we sent to your email, along with your new password.
                        </p>
                        <input
                            type="number"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 mb-4"
                            placeholder="Reset Code"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 mb-4"
                            placeholder="Enter new password"
                            required
                        />
                        <input
                            type="password"
                            value={password_confirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 mb-4"
                            placeholder="Reenter your password"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>

                <div className="flex items-center p-3 mt-4 md:ml-8">
                    <Image
                        className="hidden md:block"
                        src="/login.svg"
                        alt="Register Logo"
                        width={400}
                        height={400}
                        priority
                    />
                </div>
            </div>
        </div>

    );
};

export default page;
