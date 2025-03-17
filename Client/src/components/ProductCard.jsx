import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {Server} from "../Constants"
import {toast} from 'react-toastify'
import { useLogin } from "../store/context/LoginContextProvider";

const ProductCard = ({id, title, price = 100, discount = 0 , image}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const loginCtx = useLogin()

  const createCartEntity = async (productId) => {
    setLoading(true)
    try {
      const res = await axios.post(`${Server}/cart/add-item-to-cart/${productId}`, {quantity : 1}, {headers : {
        Authorization : "Bearer "+localStorage.getItem("Token")
      }})
      console.log(res);
      if (res.data.statusCode === 200){
          toast.success("Product added to Cart !!")
          navigate(`/cart/${loginCtx.user?._id}`)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error("Couldn't Add to Cart! Try Again")
      setLoading(false)
    }
  }

  return (
    <div className="w-[280px] h-[375px] bg-white border border-gray-200 rounded-lg shadow-md p-4 m-2 overflow-hidden">

      {/* Product Image */}
    
      <img
      onClick={()=>{navigate(`/product/${id}`)}} 
        src={image}
        alt={title}
        className="w-full h-40 object-contain mb-4 cursor-pointer"
      />
      {/* Product Name */}
      <div onClick={()=>{navigate(`/product/${id}`)}}  className="cursor-pointer text-md text-center font-semibold text-gray-800 mb-5 truncate">
        {title}
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between mb-2 ">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800">
            ₹ {(price - (discount * price) / 100).toFixed(2)}
          </span>
          {discount>0 && <span className="text-sm text-gray-500 line-through ml-2">
            ₹ {price}
          </span>}
        </div>
        <button onClick={()=>{createCartEntity(id)}} className="bg-gray-100 font-semibold text-green-800 text-xs px-5 py-2 cursor-pointer rounded-md border border-green-800 hover:bg-gray-200">
          {loading ? "Adding.." : "ADD"  }
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
