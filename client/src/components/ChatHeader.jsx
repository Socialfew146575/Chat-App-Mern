import React from 'react'
import { IoIosCall } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { IoMdMore } from "react-icons/io";

const ChatHeader = ({ contactName, contactAvatar }) => {
     return (
          <div className='flex  p-3 justify-between border-b-2 border-bottom-[#E9F1F7]'>

               <div className='flex items-center justify-center gap-2 text-white'  >

                    <img
                         src={`data:image/svg+xml;base64,${contactAvatar}`}
                         alt="avatar"
                         className='h-8 max-w-full'
                    />

                    <h1>{contactName}</h1>

               </div>

               <div className='flex gap-3 text-2xl items-center text-white'>

                    <div className='hover:bg-[#7D70BA] p-2 rounded-md'>

                         <IoIosCall />
                    </div>

                    <div className='hover:bg-[#7D70BA] p-2 rounded-md'>

                         <IoIosVideocam />
                    </div>

                    <div className='hover:bg-[#7D70BA] p-2 rounded-md'>

                         <IoMdMore />
                    </div>


               </div>


          </div>
     )
}

export default ChatHeader;
