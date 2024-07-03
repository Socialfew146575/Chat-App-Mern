import React, { useState, useEffect } from 'react'
import loader from '../assets/loader.gif'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { setAvatarRoute } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import { Buffer } from "buffer"

const SetAvatar = () => {

    const api = 'https://api.multiavatar.com/81714975';

    const navigate = useNavigate()

    const [avatars, setAvatars] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)



    const toastOptions = {

        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",



    }

    const setProfilePicture = async () => {



        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions)
            return;
        }


        const user = await JSON.parse(localStorage.getItem('chat-app-user'))
        axios.patch(`${setAvatarRoute}/${user._id}`, {
            avatarImage: avatars[selectedAvatar]
        }).then(() => {

            user.isAvatarImageSet = true,
                user.avatarImage = avatars[selectedAvatar]

            localStorage.setItem('chat-app-user', JSON.stringify(user))
            navigate('/')

        }).catch((err) => {
            console.log(err)
            toast.error("Error Setting Avatar . Please try again.", toastOptions)
        })












    }


    useEffect(() => {




        const getAvatars = async () => {
            setLoading(true)
            const data = []

            for (let i = 0; i < 4; i++) {

                const image = await axios.get(`${api}/${Math.round(Math.random() * 10000)}`)

                const buffer = new Buffer.from(image.data)
                data.push(buffer.toString("base64"))

            }



            setAvatars(data)
            setLoading(false);

        }

        getAvatars();


    }, [])


    useEffect(() => {

        if (!localStorage.getItem('chat-app-user')) navigate('/login')
    }, [])




    return (



        <>
            {loading ? <div className='flex flex-col justify-center items-center gap-12 bg-[#6e75a8] h-[100vh] w-[100vw]'>

                <img src={loader} alt="" />


            </div> : < div >
                <div className='flex flex-col justify-center items-center gap-12 bg-[#6e75a8] h-[100vh] w-[100vw]'>

                    <div className=''>

                        <h1 className='text-white text-4xl font-bold'>Pick an avatar for your Profile</h1>

                    </div>

                    <div className='flex  gap-8'>

                        {avatars.map((avatar, index) => {

                            return (
                                <div className='' key={index}>

                                    <div className={`border-[8px] p-[8px] border-solid border-transparent  rounded-[5rem] flex items-center justify-center  transition duration-500 ease-in-out  ${selectedAvatar === index ? 'selectedAvatar' : ""}`}>

                                        <img className='h-24' src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                                    </div>


                                </div>

                            )


                        })}



                    </div>
                    <button className='bg-[#531cb3] text-white px-8 py-4 border-none font-bold cursor-pointer rounded-md uppercase hover:bg-[#bfacfb] transition duration-300 ease-out' onClick={setProfilePicture}>Set as Profile Picture</button>
                    <ToastContainer />
                </div></div >

            }


        </>

    )
}

export default SetAvatar
