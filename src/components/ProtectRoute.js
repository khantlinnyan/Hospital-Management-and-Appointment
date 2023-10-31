"use client";
import { useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
export default function ProtectRoute() {
    const pathName = usePathname();
    const router = useRouter();
    const params = useParams();
    const token = Cookies.get("token");
    // const [userInfo, setUserInfo] = useState(null);

    const getStartingRoute = (pathname) => {
        const parts = pathname.split("/");
        return `/${parts[1]}`;
    };
    const encodedUserInfo = Cookies.get("user_info");

    // Use useEffect to perform navigation after rendering
    useEffect(() => {
        // Use useEffect to perform navigation after rendering
        if (!token) {
            if (pathName === "/auth/register") {
                // Allow registration page when no token is present
                return;
            } else {
                // Redirect to login page when no token is present
                router.push("/auth/login");
            }
        } else if (token) {
            // if (getStartingRoute(pathName) == "/user") {
            //     return;
            // }
            // router.push("/user");

        }
    }, [token, router]);
    return null;
}
