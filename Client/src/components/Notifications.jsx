import React, { useEffect, useState } from 'react'
import { useLogin } from '../store/context/LoginContextProvider'
import axios from 'axios';
import { Server } from '../Constants';


const NotificationComponent = ({ notification }) => {
    return (
        <div
        className="flex items-center p-4 mb-2 rounded-lg bg-gray-200 shadow-sm"
        role="alert"
      >
        <svg
          className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div>
          <span className="font-medium">{notification.title}</span>
          <p className="text-gray-600 text-sm">{notification.message}</p>
        </div>
      </div>
      
    );
  };

function Notifications() {
    const loginCtx = useLogin();
    const [notifications, setNotifications] = useState([
        {'id': 1, 'title': 'New Message', 'message': 'Your system will restart tonight.'},
        {'id': 2, 'title': 'System Update', 'message': 'You have a new message from John.'},
        {'id': 3, 'title': 'Alert', 'message': 'You have a new message from John.'},
        {'id': 4, 'title': 'New Message', 'message': 'Unusual login detected.'},
        {'id': 5, 'title': 'Alert', 'message': "Don't forget your meeting at 3 PM."},
        {'id': 6, 'title': 'Reminder', 'message': 'Your system will restart tonight.'},
        {'id': 7, 'title': 'System Update', 'message': 'Get 20% off on your next purchase!'},
        {'id': 8, 'title': 'Alert', 'message': 'Your system will restart tonight.'},
        {'id': 9, 'title': 'New Message', 'message': 'Get 20% off on your next purchase!'},
        {'id': 10, 'title': 'New Message', 'message': 'Your system will restart tonight.'}
    ]
    )

    const fetchNotifications = async () => {
        try {
            const res = axios.get(`${Server}/notifications/get?user=${loginCtx.user?._id}`);
            if (res.status ==200){
                setNotifications(res?.data?.data)
            }
        } catch (error) {
            
        }

    }


    useEffect(()=>{
        fetchNotifications();
    },[])



  return (
    <div className="flex flex-col gap-2 max-w-md mx-auto md:max-w-lg lg:max-w-2xl">
        <h1 className='text-center text-3xl font-semibold my-4'>All Notifications </h1>
  {notifications.map((notification) => (
    <NotificationComponent key={notification.id} notification={notification} />
  ))}
</div>

  )
}

export default Notifications
