"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import Layout from "./Layout";
import { usePathname } from "next/navigation";
import { getDictionary } from '../../../../getDictionary';
import useLang from '@/hooks/use-lang';

const ServiceCard = ({ title, description }) => {
    return (
        <div className="flex items-start gap-4 p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-200 hover:border-gray-300">
            <span className="shrink-0 rounded-lg inline-flex items-center justify-center bg-gray-200 p-3">
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    ></path>
                </svg>
            </span>
            <div>
                <h2 className="text-base font-semibold text-gray-800 mb-1">
                    {title}
                </h2>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default function Page() {
    const { langVar } = useLang()

    const services = [
        {
            title: langVar?.page.home.general_title,
            description: langVar?.page.home.general_desc,
        },
        {
            title: langVar?.page.home.surgical_title,
            description: langVar?.page.home.surgical_desc
        },
        {
            title: langVar?.page.home.specialized_title,
            description: langVar?.page.home.specialized_desc
        },
        {
            title: langVar?.page.home.emergency_title,
            description: langVar?.page.home.emergency_desc
        },
        {
            title: langVar?.page.home.maternity_title,
            description: langVar?.page.home.maternity_desc
        },
        {
            title: langVar?.page.home.covid_title,
            description: langVar?.page.home.covid_desc
        },
    ];

    return (
        <Layout>
            <section className="max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="max-w-xl">
                    <h2 className="text-3xl mb-4 text-zinc-800 font-bold md:text-6xl">
                        {/* Find Your Best{" "} 
                        <span className="text-red-500">HEALER</span> */}
                        {langVar?.page.home.title}
                    </h2>
                    <p className="mt-4 text-zinc-600 ">
                        {langVar?.page.home.description}
                    </p>
                    {/* Call to action button */}
                    <Link
                        href="/user/hospital"
                        className="mt-8 inline-block rounded bg-green-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                    >
                        {langVar?.page.home.get_start}
                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </section>
        </Layout>
    );
}
