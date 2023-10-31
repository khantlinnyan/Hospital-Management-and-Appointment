export default function ToggleBtn({ toggleMenu, open }) {
    return (
        <div className="md:hidden">
            <button
                className={`w-9 h-9 relative 0 rounded outline-none `}
                onClick={toggleMenu}
            >
                <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span
                        aria-hidden="true"
                        className={`block bg-black absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                            open ? "rotate-45" : "-translate-y-1.5"
                        }`}
                    ></span>
                    <span
                        aria-hidden="true"
                        className={`block bg-black absolute ${
                            open ? "opacity-0" : "opacity-100"
                        } h-0.5 w-5 transform transition duration-500 ease-in-out`}
                    ></span>
                    <span
                        aria-hidden="true"
                        className={`block bg-black absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                            open ? "-rotate-45 " : "translate-y-1.5"
                        }`}
                    ></span>
                </div>
            </button>
        </div>
    );
}
