'use client';
import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const AppointmentPage = () => {
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [departments, setDepartments] = useState();
    const token = Cookies.get("token");

    function getStatusColorClass(status) {
        switch (status) {
            case "pending":
                return "bg-blue-100 text-gray-700"; // Change this to the desired color className for Active status.
            case "rejected":
                return "bg-red-100 text-red-700"; // Change this to the desired color className for Pending status.
            case "completed":
                return "bg-green-100 text-green-700"; // Change this to the desired color className for Inactive status.
            default:
                return "bg-yellow-100 text-yellow-700"; // Default color className for other statuses.
        }
    }

    function getTypeColorClass(type) {
        switch (type) {
            case "offline":
                return "bg-purple-100 text-purple-700"; // Change this to the desired color className for Active status.
            case "online":
                return "bg-green-100 text-green-700"; // Change this to the desired color className for Pending status.
            default:
                return "bg-yellow-100 text-yellow-700"; // Default color className for other statuses.
        }
    }

    const fetchData = async () => {
        try {
            const [fetchAppointments, departments] = await Promise.all([
                axios.get(`/appointments?page=${currentPage}&perPage=${itemsPerPage}`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }),
                axios.get('/departments', {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
            ]);
            //   console.log(fetchAppointments.data);
            setCurrentPage(fetchAppointments.data.meta.currentPage);
            setItemsPerPage(7);
            setTotalPages(fetchAppointments.data.meta.totalPages);
            setData(fetchAppointments.data.data);
            setDepartments(departments.data.data);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);


    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen py-5">
                <div className="flex flex-col sm:flex-row justify-start sm:justify-start p-3">
                    <div className="mr-4 mb-2 sm:mb-0">
                        <select
                            name="Status"
                            id="Status"
                            className="p-1 mt-1.5 rounded-lg border border-gray-500 text-gray-700 sm:text-sm"
                        >
                            <option value="">Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <select
                            name="Departments"
                            id="Departments"
                            className="p-1 mt-1.5 rounded-lg border border-gray-500 text-gray-700 sm:text-sm"
                        >
                            <option value="">Departments</option>
                            <option value="JM">John Mayer</option>
                            <option value="SRV">Stevie Ray Vaughn</option>
                            <option value="JH">Jimi Hendrix</option>
                            <option value="BBK">B.B King</option>
                            <option value="AK">Albert King</option>
                            <option value="BG">Buddy Guy</option>
                            <option value="EC">Eric Clapton</option>
                        </select>
                    </div>
                </div>
                <div className="w-full md:w-4/5 xl:w-3/4">
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border rounded-lg divide-y divide-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <caption className="py-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                                List of Appointments
                            </caption>
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Doctor Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Department
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                                        type
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {item?.doctorName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            {item?.department}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            {item?.appointmentDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                            <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 ${getStatusColorClass(item?.status)}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="-ms-1 me-1.5 h-4 w-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="whitespace-nowrap text-sm">{item?.status}</p>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a className="text-blue-500 hover:text-blue-700" href="#">
                                                <span
                                                    className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${getTypeColorClass(item?.type)}`}
                                                >
                                                    {item?.type}
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-center gap-3 p-6">
                        <a
                            href="#"
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>

                        <p className="text-xs text-gray-900">
                            {currentPage}
                            <span className="mx-0.25">/</span>
                            {totalPages}
                        </p>

                        <a
                            href="#"
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            );
        </Layout>
    );
}

export default AppointmentPage;