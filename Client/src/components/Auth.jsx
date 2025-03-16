import React, { useState } from 'react'
import logo from "../assets/logo.png" 

function Auth() {
    const [step , setStep] = useState(1);

    return (
        <div>
                <div className="flex flex-col items-center justify-center min-h-48 p-4 bg-gray-100">
                {/* Logo */}
                <img
                    src={logo}// Replace with actual logo URL
                    alt="Blinkit Logo"
                    className="w-40  mb-4"
                />

                {/* Title */}
                <h1 className="text-lg font-bold mb-2">Get Everything at your doorstep</h1>

                {(step==1) && <div className='w-full'>
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
                    <button className="w-full max-w-sm bg-gray-400 text-white py-2 rounded-md font-medium hover:bg-gray-500">
                        Continue
                    </button>

                   
                    </div>}
                
                
                </div>
           
        </div>
    )
}

export default Auth
