import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import axios from 'axios'
import { sendMessageRoute } from '../../utils/routes';
import { getAllMessageRoute } from '../../utils/routes';
const ChatContainer = ({ currentChat, currentUser, socket }) => {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    

    useEffect(() => {
        const getAllMessages = async () => {
            const response = await axios.get(`${getAllMessageRoute}/${currentUser._id}/${currentChat._id}`);
            setMessages(response.data.projectMessages);
        };

        getAllMessages();
    }, [currentChat]);


    const handleSendMessage = async (message) => {



        try {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message
            })


            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                message
            })

            setMessages([...messages, { fromSelf: true, message }]);
        } catch (error) {
            console.log(error)
        }




    }

    useEffect(() => {

        if (socket.current) {

            socket.current.on("msg-receive", (message) => {

                setArrivalMessage({ fromSelf: false, message })


            })

        }

    }, [])

    useEffect(() => {

        arrivalMessage && setMessages([...messages, arrivalMessage]);

    }, [arrivalMessage])

    

    return (
        <div className='flex flex-col h-full'>
            <ChatHeader contactName={currentChat.username} contactAvatar={currentChat.avatarImage} />
            <MessageList currentChat={currentChat} currentUser={currentUser} messages={messages}  />
            <SendMessageForm handleSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatContainer;
