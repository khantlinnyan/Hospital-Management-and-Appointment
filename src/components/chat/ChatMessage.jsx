const ChatMessage = ({ messages, auth_id }) => {
    // console.log(auth_id)
    const formatHumanTime = (timestamp) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(timestamp).toLocaleString(undefined, options);
    };
    const isReceiveMessage = (message) => {
        return message.receiver_id === auth_id
    }

    return (
        <div className="w-full h-full overflow-y-auto">
            {(messages || []).map((message, index) => (
                <div key={index} className={`flex justify-${isReceiveMessage(message) ? 'start' : 'end'} mb-4`}>
                    <div
                        className={`${isReceiveMessage(message) ? 'justify-start bg-red-500' : 'justify-end bg-blue-400'
                            } text-white font-medium px-5 py-3 text-sm max-w-[80%] rounded-lg shadow-md`}
                    >
                        <p className="mb-1">{message.message}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-700">{formatHumanTime(message.created_at)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>




    )
}

export default ChatMessage