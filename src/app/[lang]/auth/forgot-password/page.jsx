'use client';
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/password/email`, {
                email
            }).then((response) => {
                console.log(response)
                toast.success(response.message)
                router.push('/auth/forgot-password/reset-password')
            })
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                toast.error("Validation errors:", validationErrors);
            } else {
                toast.error("error:", error.message);
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-300 to-blue-500 ">
            <div className="flex flex-col sm:flex-row items-center justify-center p-5 sm:p-10 bg-[#C1F8FC] rounded-lg shadow-lg">
                <div className="w-full sm:w-96 p-8">
                    <form
                        className="flex flex-col max-w-sm mx-auto"
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-600 mb-6 text-center">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 mb-4"
                            placeholder="Email Address"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline"
                        >
                            Send
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <Link href="/auth/forgot-password/reset-password" className="text-sky-500 hover:underline">
                            Enter code
                        </Link>
                    </div>
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
