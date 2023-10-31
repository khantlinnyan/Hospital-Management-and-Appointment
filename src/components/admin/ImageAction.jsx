import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { BsFillPersonFill } from "react-icons/bs";

const ImageAction = ({ image, model }) => {
    const url = image.row?.image?.url;
    const token = Cookies.get("token");

    const handleImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", image.row?.id);
        formData.append("image", e.target.files[0]);

        try {
            if (image.row?.image) {
                console.log("Image shi tal");
                try {
                    await axios.delete(
                        `http://127.0.0.1:8000/api/image-upload/${image.row?.image?.id}`,
                        {
                            headers: {
                                Accept: "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );
                } catch (error) {
                    if (error.response && error.response.status === 422) {
                        toast.error(error.response.data.errors);
                    } else {
                        toast.error(error.message);
                    }
                }
            }
            await axios
                .post(
                    `http://127.0.0.1:8000/api/image-upload?model=${model}`,
                    formData,
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((response) => {
                    toast.success("Image is uploaded successfully.");
                });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                toast.error(error.response.data.errors);
            } else {
                console.log("line 52");
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="">
            <label
                htmlFor={`profile${image.row.id}`}
                className="cursor-pointer bg-transparent"
            >
                {image.row?.image ? (
                    <Image
                        src={`http://127.0.0.1:8000${url}`}
                        className="w-10 h-10 rounded-full object-cover"
                        alt="Profile Image"
                    />
                ) : (
                    <BsFillPersonFill className="w-12 h-12" />
                )}
            </label>
            <input
                type="file"
                name=""
                id={`profile${image.row.id}`}
                className="sr-only"
                onChange={handleImage}
            />
        </div>
    );
};

export default ImageAction;
