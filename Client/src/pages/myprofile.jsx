import { useState } from 'react';
import { FaBars, FaAddressBook, FaShoppingBag, FaGift, FaUserLock, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('My Addresses');

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
        <div className="text-lg font-bold mb-6 text-gray-700">+918791852055</div>
        <nav className="space-y-4">
          <NavItem icon={<FaAddressBook />} label="My Addresses" active={selectedTab === 'My Addresses'} onClick={() => setSelectedTab('My Addresses')} />
          <NavItem icon={<FaShoppingBag />} label="My Orders" active={selectedTab === 'My Orders'} onClick={() => setSelectedTab('My Orders')} />
          <NavItem icon={<FaGift />} label="Your Coupons" active={selectedTab === 'E-Gift Cards'} onClick={() => setSelectedTab('E-Gift Cards')} />
          {/* <NavItem icon={<FaUserLock />} label="Account privacy" active={selectedTab === 'Account privacy'} onClick={() => setSelectedTab('Account privacy')} /> */}
          <NavItem icon={<FaSignOutAlt />} label="Logout" onClick={() => alert('Logged out')} />
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
      <div className="flex-1 p-8">
        {selectedTab === 'My Addresses' && <MyAddresses />}
        {selectedTab === 'My Orders' && <MyOrders />}
        {selectedTab === 'E-Gift Cards' && <EGiftCards />}
        {selectedTab === 'Account privacy' && <AccountPrivacy />}
      </div>
    </div>
  );
};

// Sidebar Item Component
const NavItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer ${
      active ? 'bg-gray-200 text-gray-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </div>
);

// Address Component
const MyAddresses = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">My addresses</h2>
    <button className="text-green-600 font-semibold mb-4">+ Add new address</button>
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="font-semibold">Home</h3>
        <p className="text-gray-600">Manish, vchvjc, Delhi cantt railway Junction Kirby Place, Delhi Cantonment, New Delhi, Delhi, India</p>
      </div>
      <div className="text-gray-400 cursor-pointer">•••</div>
    </div>
  </div>
);

// Orders Component
const MyOrders = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">My Orders</h2>
    <p className="text-gray-600">You have no orders yet!</p>
  </div>
);

// E-Gift Cards Component
const EGiftCards = () => (
  <div className="flex flex-col items-center justify-center mt-20">
    <img
      src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
      alt="No gift cards"
      className="w-40 h-40 mb-4"
    />
    <p className="text-gray-600 font-semibold">No e-gift cards to show here!</p>
  </div>
);

// Account Privacy Component
const AccountPrivacy = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Account Privacy</h2>
    <p className="text-gray-600">Manage your account privacy settings here.</p>
  </div>
);

export default Dashboard;
