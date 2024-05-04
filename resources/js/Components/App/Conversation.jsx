import { Link, usePage } from "@inertiajs/react";
import UserOptionsDropdown from "./UserOptionsDropdown";
import GroupAvatar from "./GroupAvatar";
import Avatar from "./Avatar";
import { useState } from "react";

const Conversation = ({
    conversation,
    seletecedConversation = null,
    online = null,
}) => {
    const page = usePage();
    const currentUser = page.props.auth.user;
    const [classes, setClasses] = useState("border-transparent");

    if (seletecedConversation) {
        if (
            !seletecedConversation.is_group &&
            !conversation.is_group &&
            seletecedConversation.id == conversation.id
        ) {
            setClasses("border-blue-500 bg-black/20");
        }

        if (
            seletecedConversation.is_group &&
            conversation.is_group &&
            seletecedConversation.id == conversation.id
        ) {
            setClasses("border-blue-500 bg-black/20");
        }
    }

    return (
        <Link
            href={
                conversation.is_group
                    ? route("chat.group", conversation)
                    : route("chat.user", conversation)
            }
            preserveState
            className={`conversation flex item-center gap-2 p-2 text-black transition-all
                cursor-pointer border-l-4 hover:bg-gray-200 ${
                    conversation.is_user && currentUser.is_admin
                        ? "pr-2"
                        : "pr-4"
                }`}
        >
            {conversation.is_user && (
                <Avatar user={conversation} online={online} />
            )}

            {conversation.is_group && <GroupAvatar />}

            <div
                className={`flex-1 text-xs max-w-full overflow-hidden ${
                    conversation.is_user && conversation.blocked_at
                        ? "opacity-50"
                        : ""
                }`}
            >
                <div className="flex gap-1 justify-between items-center">
                    <h3 className="text-sm font-semibold overflow-hidden text-nowrap text-ellipsis">
                        {conversation.name}
                    </h3>
                    {conversation.last_message_date && (
                        <span className="text-nowrap">
                            {conversation.last_message_date}
                        </span>
                    )}
                </div>

                {conversation.last_message && (
                    <p className="text-xs text-nowrap overflow-hidden text-ellipsis">
                        {conversation.last_message}
                    </p>
                )}
            </div>
            {currentUser.is_admin && conversation.is_user && (
                <UserOptionsDropdown conversation={conversation} />
            )}
        </Link>
    );
};

export default Conversation;
