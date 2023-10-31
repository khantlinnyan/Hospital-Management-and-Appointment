"use client"

import Layout from "@/components/doctor/Layout";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegHospital, FaLocationArrow } from 'react-icons/fa'
import { BsTelephone } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import Image from "next/image";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import axios from "@/lib/axios";
import { Home, Phone, Mail } from "react-feather";
import useLang from "@/hooks/use-lang";

const HospitalPage = (props) => {
    const [hospitalData, setHospitalData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [error, setError] = useState(null);
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user_info"));
    const { langVar } = useLang()
    const httpRequest = useCallback(async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/doctor/${user.id}/hospitals?page=${currentPage}&perPage=${itemsPerPage}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok) {
            setError('Something wrong.')
            return
        }
        const responseData = await response.json()
        setHospitalData(responseData.data)
    }, [currentPage, itemsPerPage, token, user.id])

    useEffect(() => {
        httpRequest()
    }, [currentPage, httpRequest])

    return (
        <Layout title={langVar?.doctor.hospitals}>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        !error && hospitalData && hospitalData.map(hospital => (
                            <a key={hospital.id}
                                href="#"
                                className="relative block overflow-hidden rounded shadow-lg border border-gray-100"
                            >
                                <span
                                    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                                ></span>
                                <Image className="rounded-t mb-3 w-full mx-auto" alt='Hospital' width={100} height={100} src={hospital.image ? hospital.image : '/hospital.jpg'} />
                                <div className="p-4">
                                    <p className="flex items-start mb-3">
                                        <Home className="mr-3" />
                                        {hospital.name}
                                    </p>
                                    <p className="flex items-start mb-3">
                                        <Phone className="mr-3" />
                                        {hospital.phone}
                                    </p>
                                    <p className="flex items-start mb-3">
                                        <Mail className="mr-3" />
                                        {hospital.email}
                                    </p>
                                </div>
                            </a>
                        ))
                    }
                </div>

                {/* <ReactPaginate
                    breakLabel="..."
                    nextLabe="next"
                    onPageChange={(page) => {
                        
                        setCurrentPage(page?.selected + 1)
                    }}
                    pageRangeDisplayed={3}
                    pageCount={hospitalData?.meta?.totalPages}
                    prevPageRel="prev"
                    renderOnZeroPageCount={null}
                    breakClassName="border border-white hover:bg-pink-200 transition-all duration-200 ease-in-out disabled:opacity-70 disabled:text-gray-100 mb-10 px-4 py-2 text-sm rounded-full text-lg"
                    activeClassName="bg-green-200 hover:bg-green-300 text-white transition-all duration-300 ease-in-out"
                    previousClassName="border border-white hover:bg-pink-200 transition-all duration-200 ease-in-out disabled:opacity-70 disabled:text-gray-100 mb-10 px-8 py-3 text-sm rounded-full tracking tracking-wider"
                    nextClassName="border border-white hover:bg-pink-200 transition-all duration-200 ease-in-out disabled:opacity-70 disabled:text-gray-100 mb-10 px-8 py-3 text-sm rounded-full tracking tracking-wider"
                    containerClassName="flex justify-center items-center w-full mt-8 gap-x-3"
                    pageClassName="border border-white hover:bg-pink-200 transition-all duration-200 ease-in-out disabled:opacity-70 disabled:text-gray-100 mb-10 px-4 py-3 text-sm rounded-full tracking tracking-wider"
                /> */}
            </div>
        </Layout>
    );
};

export default HospitalPage;
