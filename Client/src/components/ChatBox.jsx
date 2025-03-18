import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server, ServerBase } from "../Constants";
import io from "socket.io-client";
import { useLogin } from "../store/context/LoginContextProvider";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { FaPhone } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import Loader from "./Loader";
import { IoSend } from "react-icons/io5";

const socket = io.connect(ServerBase);

function ChatBox() {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("");
    const [chatUser, setChatUser] = useState({})
    const [messages, setMessages] = useState([]);
    const {user1, user2} = useParams()
    const options = {
        timeZone: 'Asia/Kolkata',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    };

    const loginCtx = useLogin();
    const Navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("Token")){
            Navigate("/chats")
        }
        setLoading(true)

        try {
            
            socket.emit("joinRoom", { user1, user2 });
    
            setTimeout(()=>{fetchMessages()},100);
    
            socket.on(`receiveMessage`, (message) => {
                setMessages((prev) => [ message,...prev]);
            });
    
            return () => {
                socket.off(`receiveMessage`);
            };
        
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }, [user1, user2, loginCtx.user?._id]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(
                `${Server}/messages/getmessages/${user1}/${user2}`,
                { headers : {
                    Authorization : "Bearer "+localStorage.getItem("Token")
                } }
            );
            if (res.data.statusCode === 200) setMessages(res.data.data);
                
            const res2 = await axios.get(`${Server}/users/getuserbyId/${loginCtx.user?._id === user1 ? user2 : user1}`)
            // console.log(res2.data.data);
            if (res2.data.statusCode === 200) setChatUser(res2.data.data);
            setLoading(false)
        } catch (error) {
            console.log("Failed to fetch messages", error);
            setLoading(false)
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (content){
        const message = {
            sender: loginCtx.user?._id,
            receiver: loginCtx.user?._id === user1 ? user2 : user1,
            content: content,
            timeStamp : Date.now()
        };
        socket.emit("sendMessage", message);
        setContent("");
        }
    };

    return (
        <div className="flex mt-16 flex-col w-11/12 sm:w-5/6 lg:w-7/12 xl:w-1/2 2xl:w-1/3 mx-auto p-2 lg:p-3 bg-white shadow-lg rounded-lg my-2 ">
            {(!loading)&&<div>
                {chatUser && (
                    <div
                        key={chatUser._id}
                        className="w-full flex justify-between px-2"
                    >
                        <div
                            onClick={() => {
                                Navigate(`/users/${chatUser._id}`);
                            }}
                            className="cursor-pointer h-full flex items-center pb-2"
                        >
                            
                            <div className="flex-grow">
                                <h2 className="text-gray-700 text-center text-lg lg:text-xl font-medium">
                                    {chatUser.fullName}
                                </h2>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col-reverse overflow-y-auto p-2 mb-4 bg-gray-100  max-h-[70vh] min-h-[70vh] ">
                    {(messages.length === 0) && <div className="flex w-full min-h-[65vh] justify-center items-center  text-gray-700 ">No Messages yet</div>}
                    {messages.length > 0 &&
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex w-full ${
                                    message.sender === loginCtx.user?._id
                                        ? "justify-end "
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`flex flex-col mb-2 max-w-[80%] md:max-w-[66%] p-2 rounded-xl ${
                                        message.sender === loginCtx.user?._id
                                            ? "bg-cyan-500  text-white rounded-tr-none pr-4"
                                            : "bg-gray-200   text-left rounded-tl-none pr-4"
                                    }`}
                                >
                                    <div className="flex items-center justify-center">
                                        <div>
                                        <span className="font-bold">{ (message.sender === loginCtx.user?._id) ? "You " : chatUser?.fullName?.split(" ")[0] }{" :  " } </span>
                                        {message.content}
                                        </div>
                                    </div>

                                    <div className="text-right ms-2 text-[8px]">
                                        {new Date(message.timeStamp).toLocaleString(
                                            "en-IN",
                                            options
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="flex w-full">
                    <form action="" onSubmit={sendMessage} className="flex w-full">
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type a message"
                            className="flex w-[82%] p-2 md:w-[88%]  border-gray-300   focus:border-gray-300  rounded-l-full focus:ring-0 focus:border-2  ps-4"
                        />
                        <button
                            type="submit"
                            className="w-[18%] md:w-[12%] bg-cyan-500 0  text-white items-center justify-center flex text-xl font-bold rounded-r-full hover:bg-cyan-600 "
                        >
                            <IoSend/>
                        </button>
                    </form>
                </div>
            </div>}
            {loading && <div className="flex w-full min-h-[90vh] justify-center items-center p-6">
                       { <Loader/>}
                </div>}

            
        </div>
    );
}

export default ChatBox;
