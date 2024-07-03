import React, { useState, useEffect,useRef } from 'react'
import Contacts from './Contacts'
import WelcomePage from './WelcomePage'
import ChatContainer from './ChatContainer'
import { io } from "socket.io-client"
import { host } from '../../utils/routes'
const Chat = () => {

  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)

  const socket = useRef(null)

  useEffect(() => {
    const checkAndSetUser = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    };

    checkAndSetUser();
  }, []);


  useEffect(() => {

    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user", currentUser._id)

    }

  }, [currentUser])



  return (
    currentUser && (
      <div className='h-[100vh] w-[100vw] flex flex-col justify-center gap-4 items-center bg-[#a3b0f3]  '>

        <div className="h-[85vh] w-[85vw] rounded-md bg-[#54457f] grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-1 md:col-span-3 h-[85vh]  ">

            <Contacts setCurrentChat={setCurrentChat} currentUser={currentUser} />

          </div>
          <div className="col-span-3 md:col-span-9 h-[85vh] ">

            {!currentChat ? <WelcomePage currentUser={currentUser} /> : <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />}

          </div>
        </div>




      </div>
    )
  )
}

export default Chat
