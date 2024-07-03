import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {

            axios.post(registerRoute, {
                username, email, password
            }).then((response) => {
                
                localStorage.setItem('chat-app-user', JSON.stringify(response.data.user))
                
                navigate('/setAvatar')


            }).catch((error) => {
                console.error("Registration error:", error);
                if (error.response) {
                   
                    console.log("Response data:", error.response.data);
                    console.log("Response status:", error.response.status);
                    console.log("Response headers:", error.response.headers);

                   
                    const errorMessage = error.response.data.error;
                    toast.error(errorMessage, toastOptions);
                   
                } else if (error.request) {
                   
                    console.log("Request made but no response received:", error.request);
                } else {
                   
                    console.error("Error setting up the request:", error.message);
                }
            });






        }



    }

    const toastOptions = {

        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",



    }

    const handleValidation = () => {

        if (username.trim().length === 0) {
            toast.error("Username should not be empty or contain only whitespaces.", toastOptions);
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address.", toastOptions);
            return false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.", toastOptions);
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password should be the same.", toastOptions);
            return false;
        }

        if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        }

        if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters.", toastOptions);
            return false;
        }

        if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }

        if (username === "") {
            toast.error("Username is required.", toastOptions);
            return false;
        }

        if (password === "") {
            toast.error("Password is required.", toastOptions);
            return false;
        }

        if (confirmPassword === "") {
            toast.error("Confirm Password is required.", toastOptions);
            return false;
        }

        return true;



    }

    useEffect(()=>{

        if(localStorage.getItem('chat-app-user')) navigate('/')
    },[])


    return (
        <>
            <ToastContainer />
            <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center bg-[#a3b0f3]' >

                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-8 bg-[#17142b] rounded-[32px] px-16 py-12'>

                    <div className="flex justify-center items-center gap-3  ">

                        <img src={logo} alt="" className='h-20' />
                        <h1 className='text-white font-bold text-[25px] uppercase'>ConnectSphere</h1>
                    </div>

                    <input type="text" value={username} name="username" id="username" placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='formInput' />
                    <input type="email" value={email} name="email" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='formInput' />
                    <input type="password" value={password} name="password" id="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='formInput' />
                    <input type="password" value={confirmPassword} name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} className='formInput' />

                    <button type="submit" className='bg-[#531cb3] text-white px-8 py-4 border-none font-bold cursor-pointer rounded-md uppercase hover:bg-[#bfacfb] transition duration-500 ease-out'>Create Account</button>

                    <span className='text-white uppercase text-[12px] text-center'>Already have an account ? <Link to='/login' className='text-[#af99ff] hover:text-[#722e9a] font-bold'>Login</Link></span>

                </form>




            </div> </>
    )
}

export default Register