'use client';

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import AppointmentPopup from "@/components/AppointmentPopUp/AppointmentPopup";
import Layout from "@/components/hospital/Layout";

const Page = ({ params }) => {
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [search, setSearch] = useState("");
    const token = Cookies.get("token");
    const hospitalId = params.hospitalId;

    const fetchData = async () => {
        const { data } = await axios.get(
            `/dashboard/hospital/${hospitalId}/doctors?keyword=${search}&page=${page}&perPage=${perPage}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        setData(data.data);
        setMeta(data.meta);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        fetchData();
    }, [page, search]);

    return (
        <Layout>
            <div className="flex flex-col justify-center w-full mt-4">
                <div className="uppercase flex gap-x-2 text-xs text-start mb-4 md:text-base">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex items-center gap-1 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="block transition hover:text-gray-700"
                                >
                                    <span className="sr-only"> Home </span>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li className="rtl:rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block transition hover:text-gray-700"
                                >
                                    {" "}
                                    Dashboard{" "}
                                </a>
                            </li>
                            <li className="rtl:rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block transition hover:text-gray-700"
                                >
                                    {" "}
                                    Doctors{" "}
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="flex flex-col gap-y-5">
                    <h3 className="text-3xl font-medium justify-start md:text-5xl">
                        <span className="text-zinc-800">Hospital</span>
                        <span className=" text-green-500">Doctors</span>
                    </h3>
                </div>
            </div>
            <div>
                <div className="flex w-full">
                    <div className="relative w-full mx-2 md:mt-5">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                            >
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="name-icon"
                            name="name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="my-2 p-3 bg-gray-50 border rounded-full text-gray-400 text-sm block w-full pl-10 bg-transparent placeholder:text-gray-800 border-black focus:border-[#327CEC] focus:ring-blue-600"
                            placeholder="Search Doctor Name"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
                {data?.map((item, index) => (
                    <div
                        key={index}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3  xl:w-1/3 p-4"
                    >
                        <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6">
                            <div className="flex items-center">
                                <div className=" rounded-lg p-3">
                                    <Image
                                        src="/login.svg"
                                        alt="Doctor Avatar"
                                        width="0"
                                        height="0"
                                        className="w-32 h-auto"
                                    />
                                </div>

                                <div className="ml-1 ">
                                    <a href="#">
                                        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                            {item.doctorInfo.name}
                                        </h3>
                                    </a>
                                    <p className="text-sm text-gray-500">
                                        Department: {item.department}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Experience: {item.experience} years
                                    </p>
                                </div>
                            </div>

                            <p className="mt-5 text-sm/relaxed text-gray-500 line-clamp-2">
                                {item.bio}
                            </p>

                            <Link
                                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                                href={"/auth/register"}
                            >
                                Detail
                                <span
                                    aria-hidden="true"
                                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                                >
                                    &rarr;
                                </span>
                            </Link>
                        </article>
                    </div>
                ))}
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600 text-lg pt-5">
                    <p className="mb-2">No data available</p>
                    <p className="text-sm">
                        Please check back later or refine your search criteria.
                    </p>
                </div>
            ) : (
                <Pagination
                    meta={meta}
                    onPageChange={handlePageChange}
                    perPage={perPage}
                />
            )}
        </Layout>
    );
};

export default Page;
