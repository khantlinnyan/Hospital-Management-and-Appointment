'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import useLang from "@/hooks/use-lang";

const Sidebar = () => {
    const params = useParams();
    const hospitalId = params.hospitalId;
    const token = Cookies.get("token");
    const [hospitalName, setHospitalName] = useState("");
    const [hospitalEmail, setHospitalEmail] = useState("");
    const { langVar, langType } = useLang()

    const fetchData = async () => {
        try {
            const res = await axios.get(`/hospitals/${hospitalId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const { name, email } = res.data.data;
            setHospitalName(name);
            setHospitalEmail(email);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData()
    })
    return (
        <div>
            <div className="flex h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                    <span
                        className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
                    >
                        Logo
                    </span>

                    <ul className="mt-6 space-y-1">
                        <li>
                            <Link
                                href={`/${langType}/dashboard/hospital/${hospitalId}`}
                                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                            >
                                {langVar?.hospital.dashboard}
                            </Link>
                        </li>

                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="text-sm font-medium"> {langVar?.hospital.doctor_section} </span>

                                    <span
                                        className="shrink-0 transition duration-300 group-open:-rotate-180"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <Link href={`/${langType}/dashboard/hospital/${hospitalId}/doctors`}
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            {langVar?.hospital.doctor_list}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href={`/${langType}/dashboard/hospital/${hospitalId}/doctors/create`}
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            {langVar?.hospital.register_doctor}
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <Link
                                href={`/${langType}/user/hospital`}
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700"
                            >
                                {langVar?.hospital.home}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                        <Image
                            alt="Man"
                            width={0}
                            height={0}
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">{hospitalName}</strong>

                                <span>{hospitalEmail}</span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar