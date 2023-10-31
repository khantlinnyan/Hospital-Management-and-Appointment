import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/6 bg-gray-200">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="w-5/6 p-8">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
