'use client';
import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import { usePathname } from 'next/navigation';
import { getDictionary } from '../../../getDictionary';
import useLang from '@/hooks/use-lang';

const Layout = ({ children }) => {
    let userInfo
    if ((Cookies.get('user_info'))) {
     userInfo = JSON.parse(Cookies.get("user_info"));
    }
    const { langVar, langType } = useLang()

    const Navtitle = [
        {
            id: 1,
            name: langVar?.navigation.home,
            to: `/${langType}/user`,
        },
        {
            id: 2,
            name: langVar?.navigation.hospitals,
            to: `/${langType}/user/hospital`,
        },
        {
            id: 3,
            name: langVar?.navigation.about,
            to: `/${langType}/user/about-us`,
        },
        {
            id: 4,
            name: langVar?.navigation.contact,
            to: `/${langType}/user/contact-us`,
        },
    ];
    return (
        <div>
            <Navbar NavbarTitle={Navtitle} />
            <div className="flex min-h-screen">
                {userInfo?.role !== "patient" && (
                    <div className="w-1/4 bg-gray-200">
                        <Sidebar langVar={langVar} langType={langType} />
                    </div>
                )}

                {/* Main Content */}
                <div className="w-3/4 ml-32 mr-32">
                    <main>{children}</main>
                </div>
            </div>

        </div>
    );
};

export default Layout;
