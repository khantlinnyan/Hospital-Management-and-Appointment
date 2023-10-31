import Image from "next/image";
export default function hospitalLists({ item, index }) {
    return (
        <div key={index}>
            <Image
                src="/sample.svg"
                className="w-[365px] h-[262px] object-cover rounded-lg mb-3"
                alt=""
            />
            <h3 className="text-[20px] text-[#327CEC] tracking-wide">
                {item?.name}
            </h3>
            <ul className="my-2 text-black flex flex-wrap gap-x-2">
                {item.department?.map((dep) => (
                    <li>#{dep}</li>
                ))}
            </ul>
            <button className="text-white fond-sm flex gap-x-3 items-center">
                {/* See Details <img src="/rightArrow.svg" alt="" />{" "} */}
                See Detail
            </button>
        </div>
    );
}
