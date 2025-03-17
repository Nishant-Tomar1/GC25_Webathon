import {  useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import { useLogin } from "../store/context/LoginContextProvider";
import axios from "axios";


function Profile(){
  const {user} = useLogin();
 console.log(user);
 const firstLetter = user.fullName ? user.fullName.charAt(0).toUpperCase() : "?";
//  useEffect(() => {
//   // console.log("hi")

// },);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <div className="relative">
        
        <img
          src="https://media.istockphoto.com/id/1412353022/photo/empty-aisle-at-a-supermarket.jpg?s=612x612&w=0&k=20&c=lua6Ayl1iyoOndHTXEWoolyh1xV9HTROcl6we_o-HRc="
          alt="Background"
          className="w-full h-48 object-cover back blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-200 opacity-40"></div>
        <div className="absolute top-4 right-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center">
            <FaEdit className="mr-2" /> Edit profile
          </button>
        </div>
        <div className="absolute left-4 bottom-4 flex items-center">
          <div className="rounded-full bg-gray-300 border-4 border-white overflow-hidden">
            {user.profilePicture &&  <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            }
            {
              !user.profilePicture && <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
              {firstLetter}
            </div>
            }
            
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-white">{user.fullName}</h1>
            <div className="font-bold">Email : {user.email}</div>
          </div>
        </div>
        <div className="absolute right-4 bottom-4 text-white flex space-x-4">
          <div className="flex items-center bg-black text-[#FFD700] px-3 py-1 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-sm font-semibold">{user.loyality}</p>
            🏅
          </div>
        </div>
      </div>

      <div className=" w-full mx-auto bg-white   overflow-hidden border border-gray-200">
        {/* Header */}
        

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Addresses */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              📍 Address
            </h3>
            <p className="text-gray-600 mt-1">
              {user.address? user.address : "Manage your saved addresses for quick and easy access."}
            </p>
              
           
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              📞 Contact Information
            </h3>
            <p className="text-gray-600 mt-1">
            {user.contactNumber? user.contactNumber : "Manage your phone number."}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
