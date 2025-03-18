import React, { useState } from 'react'
import logo from "../assets/logo.png" 
import { useDialog } from '../store/context/DialogContextProvider';
import { useLogin} from "../store/context/LoginContextProvider"
import {validate} from 'email-validator'
import {toast} from 'react-toastify'
import {Server} from "../Constants"
import axios from 'axios'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({
        fullName : "",
        contactNumber : "",
        address :"",
        role : ""
    })
    const [otp, setotp] = useState("");
    const [loading, setLoading] = useState(false);
    const [step , setStep] = useState(1);
    const dialogCtx = useDialog();
    const loginCtx = useLogin();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        
        if (validate(email)){
            sendOTP(email);
        }
        else toast.error("Please enter a valid email");
        return;
    }

    const sendOTP = async (email) => {   
        setLoading(true)
        try {
            const res = await axios.post(`${Server}/users/generate-OPT-loginUser`,{email});
            console.log(res);
            if (res.data.statusCode == 200){
                toast.success("Otp sent Successfully!!")
                setStep(2)
            }
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Try Again")
            setLoading(false);     
        }
    }

    const LoginUser = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${Server}/users/verifyOTP`, {email : email, otp : Number.parseInt(otp) });
            console.log(res);
            if (res.data?.statusCode === 200){
                console.log(res.data.data);
                loginCtx.login(res.data.data.user);
                localStorage.setItem("Token",res.data.data.Token);
                setEmail(res.data?.data?.loggedInUser?.email)
                toast.success(`Welcome ${res.data?.data?.user?.fullName}`);
                dialogCtx.setDialog(false);
            }
            console.log(res.data.data.user.role);
            if (res.data.data.user.role === "seller") {
              navigate(`/profile/${res.data.data.user._id}`);
            }
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const verifyOTP = async (otp)=>{
        setLoading(true);
        try {
            const res = await axios.post(`${Server}/users/verifyOTP`, {email : email, otp : Number.parseInt(otp) });
            console.log(res);
            if (res.data?.statusCode === 400){
                setEmail(res.data?.data?.email)
                toast.success("Verified Successfully!")
                setStep(3);
            }
            if (res.data?.statusCode === 200){
                console.log(res.data.data);
                loginCtx.login(res.data.data.user);
                localStorage.setItem("Token",res.data.data.Token);
                setEmail(res.data?.data?.loggedInUser?.email)
                toast.success(`Welcome back, ${res.data?.data?.user?.fullName}`);
                dialogCtx.setDialog(false);
                console.log(res.data.data.user.role);
                if (res.data.data.user.role === "seller") {
                  navigate(`/profile/${res.data.data.user._id}`);
                }
            }
            
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            toast.error("Incorrect OTP !!")
            setLoading(false);
            
        }
    }

    const handleNewUserChange = (e)=>{
        const {name, value} = e.target
        setUser(prev=>({...prev,
            [name] :value
        }))
    }

    const handleNewUser = async(e)=>{
        e.preventDefault();
        console.log(email);
        console.log(user);
        setLoading(true)
        try {
            const res = await axios.post(`${Server}/users/register`,{
                fullName : user.fullName,
                email : email,
                contactNumber : user.contactNumber,
                role : user.role,
                address : user?.address
            });
            console.log(res);
            if (res.data.statusCode == 200){
                toast.success("Profile created Successfully")
                dialogCtx.setDialog(false);
                LoginUser();
            }
            if (res.data.data.user.role == "seller") {
              navigate(`/profile/${res.data.data.user._id}`);
            }
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! Try Again")
            setLoading(false);     
        }
    }

    return (
        <div>
                <div className="flex flex-col items-center justify-center min-h-48 max-h-140 py-4">
                {/* Logo */}
               {!(step===3)&&<> <img
                    src={logo}
                    alt="Logo"
                    className="w-40  mb-4"
                />

                {/* Title */}
                <h1 className="text-lg font-bold mb-2">Get Everything at your doorstep</h1>
                </>}

                {(step===1) && 
                    <div className='w-full'>
                    <p className="text-gray-600 text-center mb-6">Log in or Sign up</p>

                    {/* Input Field */}
                    <form action="" onSubmit={(e)=>{e.preventDefault();validateEmail(email)}}>
                        <div className="flex items-center border border-gray-300 rounded-md w-full max-w-sm px-3 py-2 mb-4 bg-white shadow-sm">
                            
                            <input
                            value={email}
                            required
                            onChange={(e)=>{setEmail(e.target.value)}}
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow outline-none text-gray-600"
                            />
                        </div>

                        {/* Continue Button */}
                        <button type='submit' className="w-full max-w-sm bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600">
                            {loading ? <Loader/> : "Continue"}
                        </button>
                    </form>

                   
                    </div>}

                {(step===2) && 
                    <div className='w-full'>
                        <form action="" onSubmit={(e)=>{e.preventDefault();verifyOTP(otp)}} >
                    <p className="text-gray-600 text-center mb-6">Log in or Sign up</p>

                    {/* Input Field */}
                    <div className="flex items-center border border-gray-300 rounded-md w-full max-w-sm px-3 py-2 mb-4 bg-white shadow-sm">
                        
                        <input
                        value={otp}
                        required
                        onChange={(e)=>{setotp(e.target.value)}}
                        type="text"
                        placeholder="Enter OTP"
                        className="flex-grow outline-none text-gray-600"
                        />
                    </div>

                    {/* Continue Button */}
                    <button type='submit' className="w-full max-w-sm bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600">
                       {loading ? <Loader/> :  "Verify" }
                    </button>
                        </form>
                    </div>
                    }

                {(step === 3) && 
                    <div className="w-full max-w-md bg-white p-2 rounded-lg ">
                        {/* Title */}
                        <h1 className="text-2xl font-bold text-center mb-4">Complete Your Profile</h1>
                
                        {/* Name Field */}
                        <form action="" onSubmit={handleNewUser}>
                        <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                        required
                            name = "fullName"
                            value={user.fullName}
                            onChange={handleNewUserChange}
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
                            required
                            name='contactNumber'
                            value={user.contactNumber}
                            onChange={handleNewUserChange}
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
                            required
                            name='address'
                            value={user.address}
                            onChange={handleNewUserChange}
                            placeholder="Enter your address"
                            rows={3}
                            maxLength={300}
                            className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
                        ></textarea>
                        </div>
                
                        {/* Profile Picture Upload */}
                        {/* <div className="mb-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:bg-gray-100 file:text-gray-600 cursor-pointer"
                        />
                        </div> */}
                
                        {/* Type Dropdown */}
                        <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                        <select
                            required
                            name='role'
                            value={user.role}
                            onChange={handleNewUserChange}
                            className="w-full border text-sm border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            <option value="" disabled>
                            Select type
                            </option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        </div>
                
                        {/* Submit Button */}
                        <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition-all duration-200"
                        >
                        Submit
                        </button>
                        </form>
                    </div>}       
                
                </div>
           
        </div>
    )
}

export default Auth
