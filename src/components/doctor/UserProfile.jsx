"use client";
import React from 'react'
import Cookies from 'js-cookie'
import Image from 'next/image';

const UserProfile = () => {
    const { name, email } = JSON.parse(Cookies.get("user_info"))

    return (
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a
                href="#"
                className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
            >
                <Image
                    width={0}
                    height={0}
                    alt="Man"
                    className="h-10 w-10 rounded-full object-cover"
                />

                <div>
                    <p className="text-xs">
                        <strong className="block font-medium">
                            {name}
                        </strong>

                        <span> {email} </span>
                    </p>
                </div>
            </a>
        </div>
    )
}

export default UserProfile