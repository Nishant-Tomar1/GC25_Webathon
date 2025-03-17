import { useState } from 'react';
import { FaBars, FaShoppingBag, FaUser, FaCartPlus, FaBell } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogin } from '../store/context/LoginContextProvider';
import { IoMdExit } from "react-icons/io";
import { MdContentPaste } from "react-icons/md";
import { toast } from 'react-toastify';
import { BiSolidOffer } from "react-icons/bi";
import axios from 'axios';
import { Server } from '../Constants';
import Profile from '../components/Profile';
import Notifications from "../components/Notifications"
import Orders from '../components/Orders';
import Cart from '../components/Cart';
import SellerOrders from '../components/SellerOrders';
import SellerProducts from '../components/SellerProducts';
import SellerCoupons from '../components/SellerCoupons';

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loginCtx = useLogin()
  const navigate = useNavigate()

  const path = location.pathname.split("/")[1];
  const userId = location.pathname.split("/")[2];
  
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
        loginCtx.logout();
      }
      toast.success("Logged Out Successfully")
      navigate("/")
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Something went wrong! Try again")
    }
  }

  return (
    <div className="flex h-screen fixed w-full z-60 mt-16 bg-gray-100 ">
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 md:hidden z-60 text-gray-600"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-60 w-64 bg-white shadow-md p-5 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
        <div className="text-lg font-bold mb-6 text-gray-700">Welcome </div>
        <nav className="space-y-2">

          <Link className={`flex items-center gap-5 w-full justify-between py-2 px-8 rounded-lg ${path==="profile" && "bg-gray-200"}`} to={`/profile/${loginCtx.user?._id}`}  > My Profile <FaUser/> </Link>

          {loginCtx.user.role === "buyer" && 
          <>  <Link className={`flex items-center gap-5 w-full justify-between py-2 px-8 rounded-lg ${path==="orders" && "bg-gray-200"}`} to={`/orders/${loginCtx.user?._id}`}  > My Orders <FaShoppingBag/> </Link>

          <Link className={`flex items-center gap-5 w-full justify-between py-2 px-8 rounded-lg ${path==="cart" && "bg-gray-200"}`} to={`/cart/${loginCtx.user?._id}`}  > My Cart <FaCartPlus/> </Link>

          <Link className={`flex items-center gap-5 w-full justify-between py-2 px-8 rounded-lg ${path==="notifications" && "bg-gray-200"}`} to={`/notifications/${loginCtx.user?._id}`}  > Notifications <FaBell/> </Link>
          </>}

          {
            loginCtx.user.role === "seller" && 
            <>
              <Link className={`flex items-center gap-5 w-full justify-between py-2 px-6 rounded-lg ${path==="manageorders" && "bg-gray-200"}`} to={`/manageorders/${loginCtx.user?._id}`}  > Manage Orders  <MdContentPaste/> </Link>

              <Link className={`flex items-center gap-5 w-full justify-between py-2 px-4 rounded-lg ${path==="manageproducts" && "bg-gray-200"}`} to={`/manageproducts/${loginCtx.user?._id}`}  > Manage Products  <FaShoppingBag/> </Link>

              <Link className={`flex items-center gap-5 w-full justify-between py-2 px-4 rounded-lg ${path==="managecoupons" && "bg-gray-200"}`} to={`/managecoupons/${loginCtx.user?._id}`}  > Manage Coupons  <BiSolidOffer/> </Link>

            </>

          }
          

          <button className='flex font-semibold text-lg gap-2 left-10 items-center absolute bottom-5 text-red-600' onClick={logoutHandler}>{loading ? "Loading.." : <> Sign Out <IoMdExit/> </> }</button>
        </nav>
      </div>

      {/* Overlay to close sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 pt-20 p-6 max-h-[100vh] overflow-auto">
        {path === 'profile' && <Profile userId={userId}/>}
        {path === 'orders' && <Orders userId={userId}/>}
        {path === 'cart' && <Cart userId={userId}/>}
        {path === 'notifications' && <Notifications userId={userId}/>}
        {path === 'manageorders' && <SellerOrders userId={userId}/>}
        {path === 'manageproducts' && <SellerProducts userId={userId}/>}
        {path === 'managecoupons' && <SellerCoupons userId={userId}/>}
      </div>
    </div>
  );
};


export default Dashboard;
