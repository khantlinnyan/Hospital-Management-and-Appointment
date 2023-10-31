"use client"
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from 'react'
import { usePathname } from "next/navigation";
import { getDictionary } from "../../../../getDictionary";
import useLang from "@/hooks/use-lang";
export default function Layout({ children, className }) {
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
        <>
            <Navbar NavbarTitle={Navtitle} />
            <div
                className={`px-5 mb-8 max-w-lg sm:max-w-6xl md:px-8 mx-auto ${className}`}
            >
                {children}
            </div>
        </>
    );
}
