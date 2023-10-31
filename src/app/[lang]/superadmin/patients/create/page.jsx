'use client'
import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import Cookies from "js-cookie";
import axios from "axios";
import { useToast } from "@/components/ErrorHandlingToast/useToaster";
import useLang from "@/hooks/use-lang";

const Page = () => {

    const token = Cookies.get("token");
    const [isLoading, setIsLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [hospitalLists, setHospitalLists] = useState([]);
    const { toastError } = useToast()
    const { langVar } = useLang()

    const [selectUser, setSelectUser] = useState("");
    const [selectHospital, setSelectHospital] = useState("");

    const getUserLists = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/users?perPage=100`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUserLists(response.data.data);
            });
    };
    const getHospitalLists = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/hospitals?perPage=100`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setHospitalLists(response.data.data.data);
            })
            .catch((error) => {
                toastError(error.message)
            });
    };

    useEffect(() => {
        getUserLists();
        getHospitalLists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <Layout>
            <div className="bg-gray-100 h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <h3 className="text-lg font-semibold tracking-wider my-3 text-center">
                                {langVar?.admin.create_patient}
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
                                            <option value={user.id}>
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
                                            <option value={hospital.id}>
                                                {hospital?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-4 flex gap-x-3">
                                    <button
                                        disabled={isLoading}
                                        type="submit"
                                        className="inline-block w-full rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out hvoer:border bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        {langVar?.admin.cancel}
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
            </div >
        </Layout >
    );
};

export default Page;
