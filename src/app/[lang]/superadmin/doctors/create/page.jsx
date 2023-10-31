"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../Layout";
import useLang from "@/hooks/use-lang";

const Page = () => {
    const router = useRouter();
    const token = Cookies.get("token");
    const [isLoading, setIsLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [hospitalLists, setHospitalLists] = useState([]);
    const [departmentLists, setDepartmentLists] = useState([]);
    const { langVar } = useLang()

    const [selectUser, setSelectUser] = useState("");
    const [selectHospital, setSelectHospital] = useState("");
    const [department, setDepartment] = useState("");
    const [experience, setExperience] = useState("");
    const [license, setLicense] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [bio, setBio] = useState("");

    const getUserLists = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/normal-users`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response)
                setUserLists(response.data.data);
            });
    };
    const getHospitalLists = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/hospitals?perPage=10`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response)

                setHospitalLists(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDepartmentLists = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/departments?perPage=100`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response)

                setDepartmentLists(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getUserLists();
        getHospitalLists();
        getDepartmentLists();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/doctors",
                {
                    user_id: selectUser,
                    hospital_id: selectHospital,
                    department_id: department,
                    experience,
                    duty_start_time: startTime,
                    duty_end_time: endTime,
                    license,
                    bio,
                },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
                console.log(selectUser),
            );
            router.push("/superadmin/doctors");
            toast.success("The hospital is created successfully.");
            setIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                toast.error(error.response.data.errors);
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <Layout>
            <div className="bg-gray-100 h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <h3 className="text-lg font-semibold tracking-wider my-3 text-center">
                                {langVar?.admin.create_doctor}
                            </h3>
                            <form
                                action=""
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <select
                                        name="HeadlineAct"
                                        id="HeadlineAct"
                                        required
                                        value={selectUser}
                                        onChange={(e) =>
                                            setSelectUser(e.target.value)
                                        }
                                        className="mt-1.5 w-full rounded-lg border py-2 ps-2 border-gray-400 text-gray-700 sm:text-sm"
                                    >
                                        <option>{langVar?.admin.please_choose_user}</option>
                                        {userLists?.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <select
                                        name="HeadlineAct"
                                        id="HeadlineAct"
                                        required
                                        value={selectHospital}
                                        onChange={(e) =>
                                            setSelectHospital(e.target.value)
                                        }
                                        className="mt-1.5 w-full rounded-lg border py-2 ps-2 border-gray-400 text-gray-700 sm:text-sm"
                                    >
                                        <option>{langVar?.admin.please_choose_hospital}</option>
                                        {hospitalLists?.map((hospital) => (
                                            <option
                                                key={hospital.id}
                                                value={hospital.id}
                                            >
                                                {hospital?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        name="HeadlineAct"
                                        id="HeadlineAct"
                                        required
                                        value={selectUser}
                                        onChange={(e) =>
                                            setDepartment(e.target.value)
                                        }
                                        className="mt-1.5 w-full rounded-lg border py-2 ps-2 border-gray-400 text-gray-700 sm:text-sm"
                                    >
                                        <option>
                                            {langVar?.admin.please_choose_department}
                                        </option>
                                        {departmentLists?.map((department) => (
                                            <option
                                                key={department.id}
                                                value={department.id}
                                            >
                                                {department?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-x-2">
                                    <input
                                        className="w-full flex-1 rounded-lg border border-gray-400 p-3 text-sm"
                                        placeholder="Enter your duty starting time"
                                        type="time"
                                        required
                                        step="3600"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                    />
                                    <input
                                        className="w-full flex-1 rounded-lg border border-gray-400 p-3 text-sm"
                                        placeholder="Enter your duty end time"
                                        type="time"
                                        required
                                        step="3600"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="name">
                                        Experience
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-400 p-3 text-sm"
                                        placeholder={langVar?.admin.enter_experience}
                                        type="number"
                                        required
                                        value={experience}
                                        onChange={(e) =>
                                            setExperience(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="name">
                                        License
                                    </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-400 p-3 text-sm"
                                        placeholder={langVar?.admin.enter_license}
                                        type="text"
                                        required
                                        value={license}
                                        onChange={(e) =>
                                            setLicense(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className="sr-only"
                                        htmlFor="message"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        className="w-full rounded-lg border border-gray-400 p-3 text-sm"
                                        placeholder={langVar?.admin.enter_doctor_desc}
                                        rows="8"
                                        value={bio}
                                        required
                                        onChange={(e) => setBio(e.target.value)}
                                        id="message"
                                    ></textarea>
                                </div>

                                <div className="mt-4 flex gap-x-3">
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="inline-block w-full rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out hvoer:border bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        {langVar?.admin.create}
                                    </button>
                                    <button
                                        onClick={() => router.back()}
                                        className="inline-block w-full rounded-lg  px-5 py-3 font-medium hover:text-yellow-700 text-yellow-500 sm:w-auto"
                                    >
                                        {langVar?.admin.cancel}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
