import React from 'react'
import robot from '../assets/robot.gif'
const WelcomePage = ({ currentUser }) => {
    return (
        <div className='flex justify-center items-center flex-col text-white font-bold h-full '>

            <img className='h-80' src={robot} alt="Robot" />

            <h1 className='text-4xl'>
                Welcome , <span className='text-[#0075C4]'>{currentUser.username}</span>
            </h1>

            <h3>Please select a contact to start Messaging</h3>

        </div>
    )
}

export default WelcomePage
