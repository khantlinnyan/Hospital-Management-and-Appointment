import Sidebar from "@/components/admin/Sidebar";

export default function Layout({ children }) {
    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-auto overflow-y-auto">{children}</div>
        </div>
    );
}
