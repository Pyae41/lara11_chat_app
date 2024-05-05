import { Link, usePage } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";
import GroupAvatar from "./GroupAvatar";

const ChatHeader = ({ selectedConversation }) => {
    return (
        <>
            {selectedConversation && (
                <div className="p-3 flex items-center border-b border-b-gray-400 ">
                    <div className="flex items-center gap-3 text-black pr-3">
                        <Link
                            href={route("dashboard")}
                            className="inline-block sm:hidden"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                        </Link>
                    </div>
                    {selectedConversation.is_user && (
                        <Avatar user={selectedConversation} />
                    )}

                    {selectedConversation.is_group && <GroupAvatar />}

                    <div className="pl-3">
                        <h3 className="text-black">{selectedConversation.name}</h3>
                        {selectedConversation.is_group && (
                            <p className="text-xs">
                                {selectedConversation.users.length} members
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatHeader;
