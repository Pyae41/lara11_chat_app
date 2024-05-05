import { usePage } from "@inertiajs/react";
import ReactMarkDown from "react-markdown";
import Avatar from "./Avatar";
import { formatMessageDate } from "@/helpers";

const Message = ({ message, attachmentClick }) => {
    const currentUser = usePage().props.auth.user;

    return (
        <div
            className={
                "chat " +
                (message.sender_id === currentUser.id
                    ? "chat-end"
                    : "chat-start")
            }
        >
            {<Avatar user={message.sender} />}

            <div className="chat-header text-black">
                {message.sender_id !== currentUser.id
                    ? message.sender.name
                    : ""}
                <time className="text-xs text-black ml-2">
                    {formatMessageDate(message.created_at)}
                </time>
            </div>

            <div
                className={
                    "chat-bubble relative " +
                    (message.sender_id === currentUser.id
                        ? "chat-bubble-info"
                        : "")
                }
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkDown>{message.message}</ReactMarkDown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
