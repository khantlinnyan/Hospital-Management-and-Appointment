'use client'
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useToast } from "../ErrorHandlingToast/useToaster";


const Sidebar = ({ langVar, langType }) => {
    let userInfo
    if ((Cookies.get('user_info'))) {
     userInfo = JSON.parse(Cookies.get("user_info"));
    }
    const token = Cookies.get("token");
    const [hospitalId, setHospitalId] = useState(null);
    const { toastError } = useToast()
    //Fetch Hostpital Data if role is hospitalAdmin
    const fetchData = async () => {
        try {
            if (userInfo?.role === "hospitalAdmin") {
                const res = await axios.get("/fetch-hospital", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHospitalId(res.data.hospitalId);
            }
        } catch (error) {
            toastError(error)
        }
    }

    useEffect(() => {
        fetchData();
    })
    return (
        <div className="flex min-h-full flex-col justify-between bg-white">
            <div className="px-4 py-6">

                <ul className="mt-6 space-y-1">
                    <li>
                        <Link
                            href={`/${langType}/user/profile`}
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            {langVar?.page.profile.appoint_list}
                        </Link>
                    </li>

                    {
                        userInfo?.role === "doctor" && (
                            <li>
                                <Link
                                    href={`/${langType}/doctor`}
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    {langVar?.page.profile.dashboard}
                                </Link>
                            </li>
                        )
                    }
                    {
                        userInfo?.role === "superAdmin" && (
                            <li>
                                <Link
                                    href={`/${langType}/superadmin`}
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    {langVar?.page.profile.dashboard}
                                </Link>
                            </li>
                        )
                    }

                    {
                        userInfo?.role === "hospitalAdmin" && (
                            <li>
                                <Link
                                    href={`/${langType}/dashboard/hospital/${hospitalId}`}
                                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    {langVar?.page.profile.dashboard}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div >
    )

}

export default Sidebar;