"use client";
import Layout from "@/components/doctor/Layout";
import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import EditForm from "@/components/doctor/EditForm";
import useLang from "@/hooks/use-lang";

const ProfilePage = () => {
    const [isShowForm, setIsShowForm] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState(null)
    const user = JSON.parse(Cookies.get("user_info"));
    const { langVar, langType } = useLang()

    const updateUserInfo = (user) => {
        setUpdatedInfo(user)
    }

    const showFormChangeHandler = () => {
        setIsShowForm((prev) => !prev);
    };

    return (
        <Layout title={langVar?.doctor.profile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="shadow p-3 rounded">
                    <div className="mb-5">
                        <Image
                            className="rounded-full border-[#fff] border-2 mx-auto"
                            alt="Doctor Profile"
                            width={250}
                            height={250}
                            src="/doctor.webp"
                        />
                    </div>
                    <div className="flex flex-col items-center text-center mb-3">
                        <div className="mb-2">{updatedInfo ? updatedInfo.name : user.name}</div>
                        <div className="mb-2">{updatedInfo ? updatedInfo.phone : user.phone}</div>
                        <div className="mb-2">{updatedInfo ? updatedInfo.email : user.email}</div>
                    </div>
                    <div className="text-center">
                        {!isShowForm && (
                            <button
                                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                type="submit"
                                onClick={showFormChangeHandler}
                            >
                                {langVar?.doctor.edit_profile}
                            </button>
                        )}
                    </div>
                </div>
                {isShowForm && <EditForm langVar={langVar} user={user} onUpdateUserInfo={updateUserInfo} onShowFormChangeHandler={showFormChangeHandler} />}
            </div>
        </Layout>
    );
};

export default ProfilePage;
