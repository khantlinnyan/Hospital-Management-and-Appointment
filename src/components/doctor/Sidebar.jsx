import React from "react";
import UserProfile from "./UserProfile";
import Link from "next/link";
import useLang from "@/hooks/use-lang";

const Sidebar = () => {
    const { langVar, langType } = useLang()
    return (
        <div className="flex h-screen overflow-hidden sticky flex-col justify-between border-e bg-white">
            <div className="px-4 py-6">
                <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                    Logo
                </span>

                <ul className="mt-6 space-y-1">
                    <li>
                        <Link
                            href={`/${langType}/doctor`}
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            {langVar?.doctor.dashboard}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={`/${langType}/doctor/profile`}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            {langVar?.doctor.profile}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={`/${langType}/doctor/hospital`}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            {langVar?.doctor.connected_hospitals}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={`/${langType}/doctor/patient`}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            {langVar?.doctor.patients}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={`/${langType}/doctor/appointment`}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            {langVar?.doctor.appointments}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={`/${langType}/user/hospital`}
                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            {langVar?.doctor.home}
                        </Link>
                    </li>
                </ul>
            </div>
            <UserProfile />
        </div>
    );
};

export default Sidebar;
