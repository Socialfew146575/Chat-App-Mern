import React, { useState, useRef, useEffect } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from 'emoji-picker-react';

const SendMessageForm = ({ handleSendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');
    const emojiPickerRef = useRef(null);

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emojiData, event) => {
        let msg = message + emojiData.emoji;
        setMessage(msg);
    };

    const sendChat = (e) => {
        e.preventDefault()

        if (message.length > 0) {
            handleSendMessage(message);
            setMessage('')
        }


    }
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="relative">
            <div className="flex gap-5 items-center bg-[#9C95DC] p-2 pb-2 rounded-br-md ">
                <div className="text-white hover:bg-[#7D70BA] p-2 rounded-md" ref={emojiPickerRef}>
                    <BsEmojiSmile className="text-xl bg-transparent font-bold" onClick={handleEmojiPickerHideShow} />

                    {showEmojiPicker && (
                        <div style={{ position: 'absolute ' }} className='bottom-full mt-2'>
                            <Picker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>

                <form style={{ flex: '1 0 95%' }} className="flex md:gap-8 sm:gap:2   text-white" onSubmit={sendChat}>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        className="rounded-lg border-2 px-2 py-2 text-xl bg-transparent h-[80%] w-[90%] placeholder:text-white outline:none focus:outline-none"
                        placeholder="Type your message . . ."
                    />
                    <button type="submit" className="flex items-center justify-center hover:bg-[#7D70BA] p-2 rounded-md">
                        <IoMdSend className="text-2xl" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMessageForm;
