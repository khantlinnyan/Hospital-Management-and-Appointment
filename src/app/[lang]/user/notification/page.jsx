import Layout from "../Layout";
import { IoIosNotifications } from 'react-icons/io'
export default function page() {
    return (
        <Layout className={"max-w-2xl  lg:max-w-3xl"}>
            <h1 className="text-2xl  text-zinc-700 font-semibold">Notification</h1>
            <div className="gird grid-col-1 sm:grid-col-2 mt-5">
                <div className="shadow bg-zinc-50 border rounded-xl p-3 mt-5">
                    <div className="flex items-start">
                        <div className="mr-1 pl-0 p-1">
                            <IoIosNotifications size={22}/>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between">
                                <h1 className="text-[17px] text-gray-700 font-medium">Appointment</h1>
                                <div className="text-[14px] text-gray-500">Oct 25, 2023 - 10:00 AM</div>
                            </div>
                            <p className="pr-3 text-gray-600 mb-1 text-[15px]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <p>
                                <span className="me-2">Ref: </span>
                                <span>Ipsum dolor sit amet</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="shadow bg-zinc-50 border rounded-xl p-3 mt-5">
                    <div className="flex items-start">
                        <div className="mr-1 pl-0 p-1">
                            <IoIosNotifications size={22}/>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between">
                                <h1 className="text-[17px] text-gray-700 font-medium">Health Care</h1>
                                <div className="text-[14px] text-gray-500">Oct 25, 2023 - 10:00 AM</div>
                            </div>
                            <p className="pr-3 text-gray-600 mb-1 text-[15px]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <p>
                                <span className="me-2">Ref: </span>
                                <span>Ipsum dolor sit amet</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="shadow bg-zinc-50 border rounded-xl p-3 mt-5">
                    <div className="flex items-start">
                        <div className="mr-1 pl-0 p-1">
                            <IoIosNotifications size={22}/>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between">
                                <h1 className="text-[17px] text-gray-700 font-medium">Appointment</h1>
                                <div className="text-[14px] text-gray-500">Oct 25, 2023 - 10:00 AM</div>
                            </div>
                            <p className="pr-3 text-gray-600 mb-1 text-[15px]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <p>
                                <span className="me-2">Ref: </span>
                                <span>Ipsum dolor sit amet</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="shadow bg-zinc-50 border rounded-xl p-3 mt-5">
                    <div className="flex items-start">
                        <div className="mr-1 pl-0 p-1">
                            <IoIosNotifications size={22}/>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between">
                                <h1 className="text-[17px] text-gray-700 font-medium">Appointment</h1>
                                <div className="text-[14px] text-gray-500">Oct 25, 2023 - 10:00 AM</div>
                            </div>
                            <p className="pr-3 text-gray-600 mb-1 text-[15px]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <p>
                                <span className="me-2">Ref: </span>
                                <span>Ipsum dolor sit amet</span>
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </Layout>
    );
}
