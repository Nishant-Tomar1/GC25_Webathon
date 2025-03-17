import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDialog } from "../store/context/DialogContextProvider";
import { FaSearch } from "react-icons/fa";
import Auth from "./Auth";
import DialogBox from "./DialogBox";
import { useLogin } from "../store/context/LoginContextProvider";
import { LuBell } from "react-icons/lu";
import { LuBellDot } from "react-icons/lu";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Server } from "../Constants";
import axios from "axios";


export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dialogCtx = useDialog();
  const loginCtx = useLogin()


  const logoutHandler = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${Server}/users/logout`, {},
        {
          headers : {
        Authorization : "Bearer "+localStorage.getItem("Token")
      }}
    )
      if (res.data.statusCode === 200){
        setMenu(false)
        loginCtx.logout();
      }
      toast.success("Logged Out Successfully")
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Somthing went wrong! Try again")
    }
  }

  return (
    <div className="bg-white">

      <header className="fixed top-0 z-50 w-full bg-white">

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200 ">
            <div className="flex h-16 items-center">

              {/* Logo */}
              <div className="md:flex mr-2 hidden">
                <Link to="/">
                  <img alt="logo" src={logo} className="w-24 " />
                </Link>
              </div>
              
              <div className="flex w-full justify-between">

                {/* Mobile
                {loginCtx.isLoggedIn && 
                <div className="hidden mr-3">
                <button onClick={()=>{setMenu(!menu)}}>
                  {loginCtx.user?.profilePicture ? (
                                                  <img
                                                      className="w-6 h-6 rounded-full object-cover object-center"
                                                      src={`${loginCtx.user?.profilePicture}`}
                                                      alt="avatar"
                                                  />
                                              ) : (
                                                 <span className="text-2xl"> <FaUserCircle /> </span>
                                              )}
                </button>
                {menu && (
                        <div className="absolute top-full left-2 2xl:right-36 w-[150px] max-h-40 overflow-y-auto z-30 bg-white border border-gray-300 rounded-md shadow-lg">
                          <div className="p-4">
                            <ul className="text-sm text-gray-600 space-y-2 flex flex-col  pb-4 border-b-2">
                            <li> <Link to={`/profile/${loginCtx.user?._id}`} >My Profile.</Link>  </li>
                            { (loginCtx.user?.role === "buyer") && <li> <Link to={`/orders/${loginCtx.user?._id}`} >My Orders.</Link>  </li>}
                              <li> <Link to={`/chats/${loginCtx.user?._id}`}>My Chats.</Link>  </li>
                            </ul>
                            <button onClick={logoutHandler} className="text-red-600 cursor-pointer mt-1 text-md font-semibold">{loading ? "loading..." : "Logout"}</button>
                          </div>
                        </div>
                    )
                }

              </div>
              } */}

              <div className="w-full flex items-center justify-end lg:gap-2 ps-8">
                  <div className="flex rounded-md lg:ml-6 border-2 mr-3 border-black-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                    <input
                      placeholder="Find Something..."
                      className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
                    />
                    <button
                      type="button"
                      className="flex items-center justify-center bg-[#fff] px-5"
                    >
                      <FaSearch />
                    </button>
                  </div>

                   {/* Desktop */}
                {loginCtx.isLoggedIn && 
                <div className="flex mr-3 ">
                <button onClick={()=>{setMenu(!menu)}}>
                  {loginCtx.user?.profilePicture ? (
                                                  <img
                                                      className="w-6 h-6 rounded-full object-cover object-center"
                                                      src={`${loginCtx.user?.profilePicture}`}
                                                      alt="avatar"
                                                  />
                                              ) : (
                                                 <span className="text-2xl"> <FaUserCircle /> </span>
                                              )}
                </button>
                {menu && (
                        <div className="absolute top-full right-10 2xl:right-36 w-[200px] max-h-40 overflow-y-auto z-30 bg-white border border-gray-300 rounded-md shadow-lg">
                          <div className="p-4">
                            <ul className="text-sm text-gray-600 space-y-2 flex flex-col pb-1">
                              <li> <Link to={`/profile/${loginCtx.user?._id}`} onClick={()=>{setMenu(false)}} >My Profile</Link>  </li>
                              { (loginCtx.user?.role === "buyer") && <li> <Link to={`/orders/${loginCtx.user?._id}`} onClick={()=>{setMenu(false)}} >My Orders</Link>  </li>}
                              <li> <Link to={`/chats/${loginCtx.user?._id}`} onClick={()=>{setMenu(false)}}>My Chats</Link>  </li>
                            </ul>
                            <button onClick={logoutHandler} className="text-red-600 cursor-pointer text-md font-semibold">{loading ? "loading.." : "Logout"}</button>
                          </div>
                        </div>
                    )
                }

              </div>
              }
                  

                  <div className="flex">
                    
                    {/* Login */}
                    {!loginCtx.isLoggedIn && <div className="flex lg:flex-1 pr-2 justify-center lg:items-center lg:justify-end ">
                      <Link
                        to="/"
                        onClick={() => {
                          dialogCtx.toggleDialog();
                        }}
                        className="text-lg font-semibold text-gray-700 hover:text-gray-800"
                      >
                        Login
                      </Link>
                    </div>}

                  

                    {loginCtx.isLoggedIn && <div onClick={()=>{setShowNotifications(!showNotifications)}} className="text-2xl flex cursor-pointer text-black">
                        
                        {loginCtx.notifications > 0 ? <span className="text-red-600 lg:mr-2"> <LuBellDot/> </span> : <LuBell/>}
                        {showNotifications && (
                            <div className="absolute top-full right-2 2xl:right-36 w-[250px] max-h-40 overflow-y-auto z-20 bg-white border border-gray-300 rounded-md shadow-lg">
                              <div className="p-4">
                                <h2 className="text-sm font-bold text-green-700 mb-2">New Notifications</h2>
                                {/* Example Notifications */}
                                <ul className="text-xs text-gray-600 space-y-2">
                                  <li>New order received.</li>
                                  <li>Your profile has been updated.</li>
                                  <li>Delivery scheduled for today.</li>
                                  <li>New order received.</li>
                                  <li>Your profile has been updated.</li>
                                  <li>Delivery scheduled for today.</li>
                                </ul>
                                <Link to={`/notifications/${loginCtx.user?._id}`} className="text-sm underline text-blue-600"> See all Notifications</Link>
                              </div>
                            </div>
                        )}
                    </div>}

                  

                    {/* Cart */}
                    {(loginCtx.isLoggedIn) && (loginCtx.user?.role === "buyer") && <div className="ml-4 flow-root lg:ml-2">
                      <a href={`/cart/${loginCtx.user?._id}`} className="group -m-2 flex items-center p-2">
                        <span className="text-2xl "><RiShoppingCartLine/></span>
                        <span className="ml-2 text-sm font-medium text-black group-hover:text-gray-800 hidden lg:block">
                          0
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>}

                  </div>
              
                </div>


              </div>
            </div>
          </div>
        </nav>
      </header>

      <DialogBox>
        <Auth/>
      </DialogBox>
    </div>
  );
}
