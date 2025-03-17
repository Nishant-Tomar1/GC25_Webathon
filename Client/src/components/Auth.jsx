import React, { useState } from 'react'
import logo from "../assets/logo.png" 
import { useDialog } from '../store/context/DialogContextProvider';

function Auth() {
    const [step , setStep] = useState(1);
    const dialogCtx = useDialog();

    return (
        <div>
                <div className="flex flex-col items-center justify-center min-h-48 max-h-140 py-4">
                {/* Logo */}
               {!(step===3)&&<> <img
                    src={logo}// Replace with actual logo URL
                    alt="Blinkit Logo"
                    className="w-40  mb-4"
                />

                {/* Title */}
                <h1 className="text-lg font-bold mb-2">Get Everything at your doorstep</h1>
                </>}

                {(step===1) && 
                    <div className='w-full'>
                    <p className="text-gray-600 text-center mb-6">Log in or Sign up</p>

                    {/* Input Field */}
                    <div className="flex items-center border border-gray-300 rounded-md w-full max-w-sm px-3 py-2 mb-4 bg-white shadow-sm">
                        
                        <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-grow outline-none text-gray-600"
                        />
                    </div>

                    {/* Continue Button */}
                    <button onClick={()=>{setStep(2)}} className="w-full max-w-sm bg-gray-500 text-white py-2 rounded-md font-medium hover:bg-gray-600">
                        Continue
                    </button>

                   
                    </div>}

                {(step===2) && 
                    <div className='w-full'>
                    <p className="text-gray-600 text-center mb-6">Log in or Sign up</p>

                    {/* Input Field */}
                    <div className="flex items-center border border-gray-300 rounded-md w-full max-w-sm px-3 py-2 mb-4 bg-white shadow-sm">
                        
                        <input
                        type="text"
                        placeholder="Enter OTP"
                        className="flex-grow outline-none text-gray-600"
                        />
                    </div>

                    {/* Continue Button */}
                    <button onClick={()=>{setStep(3)}} className="w-full max-w-sm bg-gray-500 text-white py-2 rounded-md font-medium hover:bg-gray-600">
                        Verify 
                    </button>
                        <p className='text-xs p-1  text-gray-400'>An OTP has been sent successfully to your email. Enter the OTP to continue.</p>
                   
                    </div>}

                {(step === 3) && 
                    <div className="w-full max-w-md bg-white p-2 rounded-lg ">
                        {/* Title */}
                        <h1 className="text-2xl font-bold text-center mb-4">Complete Your Profile</h1>
                
                        {/* Name Field */}
                        <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        </div>
                
                        {/* Contact Number Field */}
                        <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Contact Number</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <span className="text-gray-500 pr-2">+91</span>
                            <input
                            type="text"
                            placeholder="Enter your contact number"
                            className="flex-grow text-sm outline-none text-gray-600"
                            />
                        </div>
                        </div>
                
                        {/* Address Field */}
                        <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            placeholder="Enter your address"
                            rows={3}
                            maxLength={300}
                            className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
                        ></textarea>
                        </div>
                
                        {/* Profile Picture Upload */}
                        <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-100 file:text-gray-600 cursor-pointer"
                        />
                        </div>
                
                        {/* Type Dropdown */}
                        <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                        <select
                            className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            <option value="" disabled selected>
                            Select type
                            </option>
                            <option value="customer">Customer</option>
                            <option value="seller">Seller</option>
                        </select>
                        </div>
                
                        {/* Submit Button */}
                        <button
                        onClick={()=>{dialogCtx.setDialog(false)}}
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition-all duration-200"
                        >
                        Submit
                        </button>
                    </div>}       
                
                </div>
           
        </div>
    )
}

export default Auth
