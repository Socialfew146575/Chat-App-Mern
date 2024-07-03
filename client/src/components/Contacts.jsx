import React, { useEffect, useState } from 'react';
import { allUsersRoute } from '../../utils/routes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import logo from '../assets/logo.png';
import { IoIosLogOut } from "react-icons/io";

const Contacts = ({ setCurrentChat, currentUser }) => {
    const [contacts, setContacts] = useState([]);

    const [currentSelectedContact, setCurrentSelectedContact] = useState(undefined);

    const navigate = useNavigate();

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    const logout = () => {
        localStorage.removeItem("chat-app-user");
        navigate('/login');
    };



    useEffect(() => {
        const getAllUsers = async () => {
            const user = JSON.parse(localStorage.getItem('chat-app-user'));
            axios
                .get(`${allUsersRoute}/${user._id}`)
                .then((response) => {
                    setContacts(response.data.users);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Error while fetching contacts. Refresh and Try again', toastOptions);
                });
        };

        if (currentUser) {

            if (currentUser.isAvatarSet === false) {
                navigate('/setAvatar')

            }
            getAllUsers();
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        // Implement the logic for changing the current chat

        setCurrentChat(contact)
        setCurrentSelectedContact(index);

    };

    return (

        <div className='flex flex-col overflow-hidden bg-[#957fef] rounded-md rounded-br-none rounded-tr-none' style={{ height: '100%' }}>

            <div className='flex items-center justify-center gap-4 border-b-2 border-b-[#B7B5E4] rounded-sm' style={{ flex: '1 0 9%' }}>
                <img src={logo} alt="" className='h-8 object-contain' />
                <h3 className='text-white uppercase'>ConnectSphere</h3>
            </div>

            <div className='flex flex-col items-center overflow-auto gap-1 mt-2 border-b-2 border-b-[#B7B5E4] rounded-sm scrollBar flex-2' style={{ flex: '1 0 76%' }}>
                {contacts.map((contact, index) => (
                    <div
                        key={contact._id}
                        className={`bg-[#7D70BA] min-h-20 cursor-pointer w-[95%] rounded-md p-2 flex gap-4 items-center transition duration-500 ease-in-out ${index === currentSelectedContact ? 'bg-[#ffffff34] ml-3' : ''}`}
                        onClick={() => changeCurrentChat(index, contact)}
                    >
                        <div className="avatar">
                            <img
                                className='h-12'
                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                alt=""
                            />
                        </div>
                        <div className="text-white">
                            <h3>{contact.username}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#7D70BA] flex items-center justify-between px-4 gap-8" style={{ flex: '1 0 15%' }}>
                <div className='flex items-center justify-center gap-3'>
                    <div className="">
                        <img
                            src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                            alt="avatar"
                            className='h-12 max-w-full'
                        />
                    </div>
                    <div className="text-white">
                        <h2>{currentUser.username}</h2>
                    </div>
                </div>
                <div onClick={logout} className='cursor-pointer hover:bg-[#957fef] p-2 rounded-md'>
                    <IoIosLogOut className='text-[24px] text-white' />
                </div>
            </div>

        </div>


    );
};

export default Contacts;
