import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { getAllMessageRoute } from '../../utils/routes';

const MessageList = ({ currentChat, currentUser, messages }) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='flex-1 overflow-y-scroll p-4 messageList flex flex-col gap-2'>
            {messages.map((message, index) => (
                <div
                key={index} // Use a unique key for each message
                className={`flex  ${message.fromSelf ? 'justify-end' : 'justify-start'} items-center w-full`}
                >
                    
                    <div
                        ref={index === messages.length - 1 ? scrollRef : null} // Attach the ref to the last message
                        className={`p-2 rounded-lg ${message.fromSelf ? 'bg-[#D473D4] rounded-br-none text-white' : 'bg-[#E6E6FA] rounded-bl-none text-black'
                            }`}
                    >
                        {message.message}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
