"use client";
import Login from "@/components/Login";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CiAlarmOn } from 'react-icons/ci'
import toast from "react-hot-toast";
const Page = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('accessToken');

    const fetchUserInformation = async () => {
        toast('Please wait a second', {
            icon: <CiAlarmOn />,
            position: "top-center"
        });
        const res = await axios.get("/auth-user", {
            headers: {
                Authorization: `Bearer ${token}`,
            }

        });

        const { id, name, role, email } = res.data;
        console.log(res.data);
        const userData = {
            id,
            name,
            role,
            email,
            // ...other user data properties
        };
        // Set user info and token cookies
        Cookies.set('user_info', JSON.stringify(userData));
        Cookies.set('token', token);
        toast.success("Successfully Sign in", { position: "top-center" });
        router.push("/user");
    }

    useEffect(() => {
        if (searchParams.get('accessToken')) {

            fetchUserInformation();
        }
    }, []);
    return (
        <div className="overflow-hidden">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="min-w-full h-screen relative bg-gradient-to-br from-teal-300 to-blue-500 p-5">
                    <div className="flex h-screen flex-col sm:flex-row items-center justify-center sm:pl-6 md:pl-24">
                        <div className="w-full sm:w-96 flex flex-col rounded-lg shadow-lg p-6 sm:p-10 bg-[#C1F8FC]">
                            <h1 className="font-medium text-2xl text-opacity-35 text-zinc-800 text-center">
                                Sign in
                            </h1>
                            <div className="flex justify-center items-center mt-4 space-x-3">
                                {/* GitHub Icon */}
                                <a href={process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/github"}>

                                    <div className="flex items-center border border-blue-500 rounded-full p-3 mr-3">
                                        <svg
                                            className="w-4 h-4 text-[#327CEC] dark:text-gray-400"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 496 512"
                                        >
                                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                        </svg>
                                    </div>
                                </a>

                                {/* Gmail Icon */}
                                <a href={process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google"}>

                                    <div className="flex items-center border border-blue-500 rounded-full p-3 ml-3">
                                        <svg
                                            className="w-4 h-4 text-[#327CEC] dark:text-gray-400"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="1em"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                            <div className="text-center text-black text-opacity-40 font-bold text-sm tracking-wide pt-5 gap-5">
                                or use your email for login
                            </div>
                            <Login />
                            <Link
                                href={"/auth/register"}
                                className="text-base mt-5 text-zinc-800 "
                            >
                                Don't have an account?
                                <span className="text-green-600 ml-2">
                                    Sign Up
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
