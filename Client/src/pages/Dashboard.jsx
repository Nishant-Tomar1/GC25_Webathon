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
    <div className="flex h-screen bg-gray-100">
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 md:hidden z-50 text-gray-600"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md p-5 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
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

              <Link className={`flex items-center gap-5 w-full justify-between py-2 px-4 rounded-lg ${path==="manageproduct" && "bg-gray-200"}`} to={`/manageproducts/${loginCtx.user?._id}`}  > Manage Products  <FaShoppingBag/> </Link>

              <Link className={`flex items-center gap-5 w-full justify-between py-2 px-4 rounded-lg ${path==="managecoupons" && "bg-gray-200"}`} to={`/mamagecoupons/${loginCtx.user?._id}`}  > Manage Coupons  <BiSolidOffer/> </Link>

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
        {path === 'profile' && <Profile/>}
        {path === 'orders' && <Orders/>}
        {path === 'cart' && <Cart/>}
        {path === 'notifications' && <Notifications/>}
        {path === 'manageorders' && <SellerOrders/>}
        {path === 'manageproducts' && <SellerProducts/>}
        {path === 'managecoupons' && <SellerCoupons/>}
      </div>
    </div>
  );
};

// // Sidebar Item Component
// const NavItem = ({ icon, label, active, onClick }) => (
//   <div
//     onClick={onClick}
//     className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer ${
//       active ? 'bg-gray-200 text-gray-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
//     }`}
//   >
//     <span className="text-lg">{icon}</span>
//     <span>{label}</span>
//   </div>
// );

// // Address Component
// const MyAddresses = () => (
//   <div>
//     <h2 className="text-2xl font-bold mb-4">My addresses</h2>
//     <button className="text-green-600 font-semibold mb-4">+ Add new address</button>
//     <div className="border rounded-lg p-4 flex items-center justify-between">
//       <div>
//         <h3 className="font-semibold">Home</h3>
//         <p className="text-gray-600">Manish, vchvjc, Delhi cantt railway Junction Kirby Place, Delhi Cantonment, New Delhi, Delhi, India</p>
//       </div>
//       <div className="text-gray-400 cursor-pointer">•••</div>
//     </div>
//   </div>
// );

// // Orders Component
// const MyOrders = () => (
//   <div>
//     <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//     <p className="text-gray-600">You have no orders yet!</p>
//   </div>
// );

// // E-Gift Cards Component
// const EGiftCards = () => (
//   <div className="flex flex-col items-center justify-center mt-20">
//     <img
//       src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
//       alt="No gift cards"
//       className="w-40 h-40 mb-4"
//     />
//     <p className="text-gray-600 font-semibold">No e-gift cards to show here!</p>
//   </div>
// );

// // Account Privacy Component
// const AccountPrivacy = () => (
//   <div>
//     <h2 className="text-2xl font-bold mb-4">Account Privacy</h2>
//     <p className="text-gray-600">Manage your account privacy settings here.</p>
//   </div>
// );

export default Dashboard;
