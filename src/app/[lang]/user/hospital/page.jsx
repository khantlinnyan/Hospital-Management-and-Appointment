"use client";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useToast } from "@/components/ErrorHandlingToast/useToaster";
import useLang from "@/hooks/use-lang";
import RegImg from "../../../../../public/images/health_care.png"

function Page() {
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(6);
    const [hospitalLists, setHospitalLists] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state
    const token = Cookies.get("token");
    const { toastError } = useToast()

    const { langVar, langType } = useLang()

    const getHospitalList = async () => {
        try {
            const { data } = await axios.get(
                `hospitals?keyword=${search}&page=${page}&perPage=${perPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (data) {
                setHospitalLists(data.data);
                setMeta(data.meta);
                setLoading(false);
            }

        } catch (err) {
            console.log(err);
            // setLoading(false);
            console.log(err)
        }
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        getHospitalList();
    }, [page, search]);

    return (
        <Layout>
            <section className="flex flex-col gap-y-3 min-w-full max-w-7xl relative">
                {/* partners hospital title section */}
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
                                        {langVar?.navigation.partners}{" "}
                                    </a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <h3 className="text-3xl font-medium justify-start md:text-5xl">
                            {/* <span className="text-zinc-800">Partners</span> */}
                            {/* <span className=" text-green-500">Hospital</span> */}
                            {langVar?.page.hospital.title}
                        </h3>
                    </div>
                </div>

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
                            placeholder={langVar?.page.hospital.search_input}
                        />
                    </div>
                </div>
                {/* ... (existing code) */}
                <div className="flex flex-wrap">
                    {
                        loading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4 animate-pulse"
                                >
                                    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-sm">
                                        <div className="animate-pulse h-20 bg-gray-200"></div>
                                        <div className="mt-4 space-y-4">
                                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                            <div className="h-4 bg-gray-200 rounded"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : hospitalLists.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4"
                                >
                                    <Link
                                        href={`/${langType}/user/hospital/${item.id}/doctors`}
                                        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-sm transition hover:shadow-lg"
                                    >
                                        <div>
                                            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                                            <div className="sm:flex sm:justify-between sm:gap-4">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                        {item?.name}
                                                    </h3>
                                                </div>

                                                <div className="hidden sm:block sm:shrink-0">
                                                    <Image
                                                        src="/login.svg"
                                                        alt="Doctor Avatar"
                                                        width="0"
                                                        height="0"
                                                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <p className="max-w-[40ch] text-sm text-gray-500 line-clamp-2">
                                                    {item?.bio}
                                                </p>
                                            </div>

                                            <div className="mt-6 flex gap-4 sm:gap-6">
                                                <div className="flex flex-col-reverse">
                                                    <div className="text-xs text-gray-500">
                                                        {" "}
                                                        {item?.createdAt}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-600">
                                                        Published
                                                    </div>
                                                </div>

                                                <div className="flex flex-col-reverse">
                                                    <div className="text-xs text-gray-500">
                                                        <div>
                                                            {item.department
                                                                ?.length >
                                                                0 ? (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {item.department.map(
                                                                        (
                                                                            dep,
                                                                            index,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    dep.id
                                                                                }
                                                                                className={`${index >=
                                                                                    3
                                                                                    ? "mt-2"
                                                                                    : ""
                                                                                    }`}
                                                                            >
                                                                                <span className="whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-600">
                                                                                    {
                                                                                        dep
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span className="text-gray-500">
                                                                    No
                                                                    departments
                                                                    available
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-600">
                                                        Treatment
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )) // Render hospital cards when data is available
                    }
                </div>

                {hospitalLists?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600 text-lg pt-5">
                        <p className="mb-2">No data available</p>
                        <p className="text-sm">
                            Please check back later or refine your search
                            criteria.
                        </p>
                    </div>
                ) : (
                    <Pagination
                        meta={meta}
                        onPageChange={handlePageChange}
                        perPage={perPage}
                    />
                )}
            </section>
        </Layout>
    );
}

export default Page;
