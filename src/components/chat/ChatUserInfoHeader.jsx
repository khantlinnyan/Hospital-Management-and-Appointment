import Image from 'next/image'
import { FaUserCircle } from 'react-icons/fa'
export default function ChatUserInfoHeader({ receiver }) {
    return (

        <div className="user-info-header bg-white p-4 border-b border-gray-200 flex items-center">
            <div className="avatar mr-3">
                {receiver.avatar ? (
                    <Image src={receiver.avatar} alt="User Avatar"
                        width={0}
                        height={0}
                        className="w-12 h-12 rounded-full" />
                ) : (
                    <FaUserCircle className="w-12 h-12 text-gray-400" />
                )}
            </div>
            <div className="user-details">
                <h2 className="text-xl font-semibold">{receiver.name}</h2>
                {/* Additional user info if needed */}
            </div>
        </div>

    )
}