"use client"
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import Layout from "../Layout";
import useLang from "@/hooks/use-lang";

const ContactusPage = () => {
    const { langVar } = useLang()
    return (
        <Layout>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-md">
                    <h1 className="text-center text-3xl font-bold text-green-500 mb-6">
                        {langVar?.page.contact.title}
                    </h1>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:outline-none focus:ring focus:border-indigo-300"
                                placeholder={langVar?.page.contact.name_input}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:outline-none focus:ring focus:border-indigo-300"
                                placeholder={langVar?.page.contact.email_input}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="w-full rounded-lg border border-gray-300 p-4 text-sm focus:outline-none focus:ring focus:border-indigo-300"
                                placeholder={langVar?.page.contact.message_input}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-green-500 text-white py-3 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>


        </Layout>
    );
};

export default ContactusPage;
