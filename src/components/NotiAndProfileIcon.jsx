"use client";
import { BellSimple, UserCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Switcher from "./switcher";
export default function NotiAndProfileIcon({ className }) {
    const pathname = usePathname();
    const [, langType] = pathname.split('/')
    let notiPath = `/${langType}/user/notification`;
    let profilePath = `/${langType}/user/profile`;
    let colorCode = "#27272a";
    return (
        <div
            className={`flex gap-3 md:gap-5 justify-center items-center ${className}`}
        >
            <Switcher />
            <Link href={profilePath}>
                <UserCircle
                    size={32}
                    weight={`${pathname === profilePath ? "fill" : "regular"}`}
                    color={colorCode}
                />
            </Link>
        </div>
    );
}
