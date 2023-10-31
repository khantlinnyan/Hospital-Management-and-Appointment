"use client"
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineMenu } from 'react-icons/ai'
import Sidebar from "./Sidebar";
import Switcher from "../switcher";

const Layout = (props) => {
    const [sidebar, setSidebar] = useState(false)
    const sidebarChangeHandler = () => {
        console.log('hit')
        setSidebar(prev => !prev)
    }
    return (
        <div className="flex">
            <div
                className={`${sidebar ? ' translate-x-0 ' : ' translate-x-[-100%] '} lg:translate-x-0 lg:w-1/5 duration-300 fixed z-30 p-3 shadow-lg bg-white text-[#333] !h-[100vh] overflow-hidden lg:sticky top-0 bottom-0`}
            >
                <Sidebar />
            </div>
            <div className="w-full lg:w-4/5 p-6 bg-[#F8F9FB]">
                <div className="mb-6 shadow-lg bg-[#fff] rounded p-3 flex justify-between items-center sticky top-0 z-20">
                    <h1 className="text-[22px]">{props.title}</h1>
                    <div className="flex items-center">
                        <Switcher />
                        <AiOutlineMenu className="lg:hidden cursor-pointer ms-4" onClick={sidebarChangeHandler} size={25} />
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;
