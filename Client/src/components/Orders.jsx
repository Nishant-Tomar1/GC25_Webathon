import { useLogin } from "../store/context/LoginContextProvider";
import React, { useEffect, useState  } from "react";
import axios from "axios";
import { Server } from "../Constants.jsx";
import { Link, useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { loginContext } from "../store/context/LoginContextProvider.jsx";
// const orders = [
//   {
//     seller: "John Doe",
//     buyer: "Jane Smith",
//     product: "65f3a4b1234abcde56789f03",
//     price: 150.75,
//     status: "Ordered",
//     delivery: "2025-03-25T10:00:00.000Z",
//   },
//   {
//     seller: "Alice Johnson",
//     buyer: "Bob Williams",
//     product: "65f3a4b1234abcde56789f06",
//     price: 299.99,
//     status: "Packed",
//     delivery: "2025-03-26T12:00:00.000Z",
//   },
//   {
//     seller: "Charlie Brown",
//     buyer: "David Miller",
//     product: "65f3a4b1234abcde56789f09",
//     price: 99.5,
//     status: "Out for Delivery",
//     delivery: "2025-03-27T15:00:00.000Z",
//   },
//   {
//     seller: "Emma Wilson",
//     buyer: "Frank Harris",
//     product: "65f3a4b1234abcde56789f12",
//     price: 450.0,
//     status: "Delivered",
//     delivery: "2025-03-20T09:00:00.000Z",
//   },
//   {
//     seller: "Grace Martinez",
//     buyer: "Henry Clark",
//     product: "65f3a4b1234abcde56789f15",
//     price: 175.25,
//     status: "Cancelled",
//     delivery: null,
//   },
// ];

function Orders() {

  const [order , setorder] = useState([
  ]);
  const loginCtx=useLogin();
  const usertype = loginCtx.user.role;
  const fetchData = async () => {
    if(usertype=="seller"){
      const res = await axios.get(`${Server}/order/get-seller-order`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });
      console.log(res.data.data);
      setorder(res.data.data)
    }
    else{
      const res = await axios.get(`${Server}/order/get-buyer-order`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });
      console.log(res.data.data.userorder);
      setorder(res.data.data.userorder)
    }
    // setFinalprice(price - discount);
    // setOriginalprice(price);
    // setDiscountprice(discount);
  };

  useEffect(()=>{
    fetchData();
  },[])


  return (
    <>
      <div className="py-10 relative">
        <div className="w-full max-w-7xl mx-auto md:px-4">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
            Order History
          </h2>
          

          {order.map((order,index) => (
            <div className="mt-7 border border-gray-300 pt-9">
              <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                  <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                    Order Id : {order._id}
                  </p>
                  <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                   
                  </p>
                </div>
              </div>
              <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                <div className="grid grid-cols-4 w-full">
                  <div className="col-span-4 sm:col-span-1">
                    <img
                      src={order.product.images[0]}
                      alt=""
                      className="max-sm:mx-auto object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                  <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                      {order.status}
                    </p>
                    <p className="font-semibold text-lg leading-8 text-red-500 text-left whitespace-nowrap">
                      
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-start max-sm:items-center">
                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                      Delivery Expected by
                    </p>
                    <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                      {23+index}rd March 2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                <div className="flex max-sm:flex-col-reverse items-center">
                  <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
                    X cancel order
                  </button>
                  <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
                    Payment Is Successfull
                  </p>
                </div>
                <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
                  {" "}
                  <span className="text-gray-500">Total Price: </span>{" "}
                  &nbsp;Rs {order.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
