import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Server } from '../Constants';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../store/context/LoginContextProvider';
import Loader from '../components/Loader';

function Chatpage() {
    const [loading, setLoading] = useState(false)
    const [chats, setChats] = useState([])
    const [lastMessages , setLastMessages] = useState([])
    const options = {
        timeZone: 'Asia/Kolkata',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    };

    const loginCtx = useLogin()
    const Navigate = useNavigate()

    const fetchChats = async()=>{
        setLoading(true)
        try {
            const res = await axios.get(`${Server}/users/currentuser-chats`,
                {
                    headers:
                    {
                        Authorization:"Bearer "+localStorage.getItem("Token")
                    }
                }
            )
            if (res.data.statusCode === 200){
                setChats(res.data.data.data)
                setLastMessages(res.data.data.lastMessages)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);  
            setLoading(false)      
        }
    }

    useEffect(() => {
        if(!localStorage.getItem("Token")){
            return Navigate("/")
        }
        window.scrollTo(0,0)
        fetchChats()
    },[loginCtx.user?._id])


    return (
        <div className="container lg:px-5 mt-16 mx-auto text-gray-700 ">
            <div className="flex flex-col items-center justify-center px-3 mx-auto w-11/12 md:w-5/6 lg:w-1/2">
               {(!loading &&(chats.length !== 0)) && <div className="flex flex-col text-center w-full pt-4">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 font-[Montserrat]">
                        Messages
                    </h1>            
                </div>}
               {((!loading) && (chats.length > 0)) && <div className="flex flex-col w-full min-h-[80vh] overflow-y-auto">
                    {chats?.map((chat, index) => (
                        <div key={chat._id} onClick={()=>{Navigate(`/chats/${loginCtx.user?._id}/${chat._id}`)}} className="cursor-pointer w-full">
                        <div className="h-full flex items-center border-gray-600 border-t p-2 ">
                            
                            <div className="flex-grow">
                                <h2 className="text-gray-700  text-md lg:text-xl font-semibold font-[Montserrat]">
                                    {chat.fullName}
                                </h2>
                                <div className= {`flex justify-between items-center ${String(lastMessages[index][0].receiver) === chat._id ? "text-gray-500" : "text-black "}`}>
                                    <p><span className='font-semibold'> {String(lastMessages[index][0].receiver) === chat._id ? "You" : chat.fullName.split(" ")[0]}{" : "}</span>{String(lastMessages[index][0].content).substring(0,13)}{String(lastMessages[index][0].content).length > 13 ? " ..." : ""}</p>
                                    <p className='text-xs min-w-1/3'>{new Date(lastMessages[index][0].timeStamp).toLocaleString('en-IN', options)}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}              
                </div>}
                {(loading) && <div className="flex w-full min-h-[80vh] justify-center items-center p-6">
                       { <Loader/>}
                        {(!loading &&(chats.length === 0)) && "No Messages !"}
                </div>}
                { (!loading && (chats.length===0)) && <div className="flex w-full min-h-[80vh] justify-center items-center p-6 text-gray-700 ">
                        No Messages !
                </div>}
            </div>
        </div>
    );
}

export default Chatpage
