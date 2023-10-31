"use client"

import React, { useCallback, useEffect, useState } from "react";
import { User, Users, Calendar, Home as HomeIcon } from "react-feather";
import Layout from "../../../components/doctor/Layout";
import List from "@/components/doctor/appointment/List";
import Cookies from "js-cookie";
import useLang from "@/hooks/use-lang";


const InfoCard = ({ title, count, icon: Icon, color }) => {
    return (
        <div
            className={`bg-${color}-200 p-6 rounded-lg shadow-md flex items-center transition duration-300 ease-in-out transform hover:scale-105`}
        >
            <Icon className={`text-${color}-500 text-3xl mr-4`} />
            <div>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-3xl font-bold">{count}</p>
            </div>
        </div>
    );
};

const Home = () => {
    const [countData, setCountData] = useState(null)
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user_info"));
    const [error, setError] = useState(null);
    const { langVar, langType } = useLang()

    const getCountDataHttp = useCallback(async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/doctor/${user.id}/counts`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!response.ok) {
            setError("Something wrong.");
            return;
        }
        const responseData = await response.json();
        setCountData(responseData);
    }, [token, user.id]);

    useEffect(() => {
        getCountDataHttp()
    }, [getCountDataHttp])

    return (
        <Layout title={langVar?.doctor.dashboard}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InfoCard
                    title={langVar?.doctor.hospitals}
                    count={countData ? countData.hospital : 0}
                    icon={HomeIcon}
                    color="white"
                />
                <InfoCard
                    title={langVar?.doctor.patients}
                    count={countData ? countData.patient : 0}
                    icon={Users}
                    color="white"
                />
                <InfoCard
                    title={langVar?.doctor.appointments}
                    count={countData ? countData.appointment : 0}
                    icon={Calendar}
                    color="white"
                />
            </div>
            {/* APPOINTMENTS */}
            <List langVar={langVar} langType={langType} />
        </Layout>
    );
};

export default Home;
