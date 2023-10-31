// components/PatientForm.js
'use client'
import Layout from "@/components/hospital/Layout";
import axios from "@/lib/axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';
import useLang from "@/hooks/use-lang";


const PatientForm = ({ params }) => {

    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const token = Cookies.get("token");
    const hospitalId = params.hospitalId;
    const [formData, setFormData] = useState({
        userId: "",
        hospitalId: hospitalId,
        departmentId: "",
        license: "",
        experience: "",
        dutyStartTime: "",
        dutyEndTime: "",
        bio: "",
    });
    const { langVar, langType } = useLang()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the Laravel backend using an API endpoint
            const response = await axios.post('/doctors', formData, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                toast.success('Successfully Created!')
            }

        } catch (error) {
            toast.error(error)
            console.error('Error sending form data:', error);
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const fetchData = async () => {
        const [fetchUsers, fetchDepartments] = await Promise.all([
            axios.get('/normal-users', {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
            axios.get('/all-departments', {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
        ]);
        setUsers(fetchUsers.data.data);
        setDepartments(fetchDepartments.data.data);
    }

    useEffect(() => {
        fetchData();
    }, [])
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
                                    {langVar?.hospital.dashboard}{" "}
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
                                    {langVar?.hospital.doctor}{" "}
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="flex flex-col gap-y-5">
                    <h3 className="text-3xl font-medium justify-start md:text-5xl">
                        <span className="text-zinc-800">{langVar?.hospital.doctor_register_1}</span>
                        <span className=" text-green-500">{langVar?.hospital.doctor_register_2}</span>
                    </h3>
                </div>
            </div>
            <div className="container mx-auto  p-8 bg-white shadow-lg rounded-lg">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="user" className="block text-sm font-medium text-gray-900">
                            {langVar?.hospital.doctor}
                        </label>

                        <select
                            name="userId"
                            id="userId"
                            onChange={handleInputChange}
                            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        >
                            <option value="">{langVar?.hospital.please_select}</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-900">
                            {langVar?.hospital.department}
                        </label>

                        <select
                            name="departmentId"
                            onChange={handleInputChange}
                            id="departmentId"
                            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                            required
                        >
                            <option value="">{langVar?.hospital.please_select}</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div>
                        <label htmlFor="License" className="block text-sm font-medium text-gray-600 mb-1">
                            {langVar?.hospital.license}
                        </label>

                        <input
                            type="text"
                            min={1}
                            name="license"
                            onChange={handleInputChange}
                            id="license"
                            placeholder="123ABC"
                            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="UserEmail" className="block text-sm font-medium text-gray-600 mb-1">
                            {langVar?.hospital.experience}
                        </label>

                        <input
                            type="number"
                            name="experience"
                            onChange={handleInputChange}
                            id="experience"
                            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">{langVar?.hospital.duty_start_time}</label>
                        <input
                            name="dutyStartTime"
                            onChange={handleInputChange}
                            type="time"
                            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1"> {langVar?.hospital.duty_end_time}</label>
                        <input
                            name="dutyEndTime"
                            onChange={handleInputChange}
                            type="time"
                            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            {langVar?.hospital.bio}
                        </label>

                        <textarea
                            id="Bio"
                            name="bio"
                            onChange={handleInputChange}
                            className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                            rows="4"
                            placeholder={langVar?.hospital.enter_bio}
                            required
                        ></textarea>
                    </div>


                    <div className="col-span-2">
                        <button
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                            type="submit"
                        >
                            {langVar?.hospital.create}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default PatientForm;
