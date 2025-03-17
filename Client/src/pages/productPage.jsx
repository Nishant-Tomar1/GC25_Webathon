import axios from "axios";
import { use, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { Server } from "../Constants";
import { useLogin } from "../store/context/LoginContextProvider";
import { toast } from "react-toastify";

function ProductCard() {
    const location = useLocation()
    const productId = location.pathname.split("/")[2];
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([])
    const [product, setProduct] = useState({})
    const [seller, setSeller] = useState("");
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

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${Server}/product/getproducts?id=${productId}`)
        // console.log(res);
        
        if (res.data.statusCode === 200){
          setProduct(res.data.data.product);
          console.log(
            res.data.data.product
          );
          fetchRating()
          fetchReviews()
          
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSeller = async () => {
      try { 
        const res = await axios.get(`${Server}/users/getuserbyId/${product?.seller}`)
        if(res.data.statusCode === 200){
          setSeller(res.data.data.fullName);
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }

    const fetchRating = async () => {
      try {
        const res = await axios.get(`${Server}/rating/get-prod-rating/${productId}`)
        // console.log(res);
        
        if (res.data.statusCode === 200){
          setRating(res.data.data.averageRating);
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${Server}/review/get-prod-review/${productId}`)
        
        if (res.data.statusCode === 200){
          setReviews(res.data.data.review);
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchProduct()
      if (product?.seller){
        fetchSeller();
      }
    },[product.seller])


  return (
    <div className="bg-white flex flex-col justify-evenly p-4 lg:p-6 mt-20  mx-auto md:flex-row ">
      {/* Image Section */}
      <div className="  ">
        <img
          src={product?.images?.[0]}
          alt={product?.title}
          className="w-full h-[60%] md:h-[600px] object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
        {/* <p className="text-gray-500 text-sm">Home / Milk / {product.name}</p> */}
        <h2 className="text-xl md:text-4xl font-bold mt-2 ">
          {product?.title}
        </h2>
        <h4 className="md:text-xl p-2 cursor-pointer hover:underline text-green-500 ">
          {" "}
          View all {product?.category} items
        </h4>
        <div className="flex md:gap-5">
          <span className="inline-block md:text-xl bg-gray-100 text-gray-700 px-2 py-1 mt-2 rounded-md">
            🛡️ {product?.brand}
          </span>
          <span className="inline-block md:text-xl bg-gray-100 text-gray-700 px-2 py-1 mt-2 rounded-md">
            🛒 {seller}
          </span>
        </div>
        <p className="text-gray-600 mt-2 p-2 md:text-lg">
          {product?.description}
        </p>
        <button
          className={`px-4 py-2 font-bold border rounded-md bg-green-100 border-green-500`}
        >
          ₹{(product?.price - product?.discount*product?.price/100).toFixed(2)} <span className="f"></span>{" "}
          <span className="line-through">₹{product.price}</span>{" "}
          <span>(Inclusive of all taxes)</span>
        </button>
        <div className="mt-2">
          {/* <span>⭐ </span> */}
          <div className="flex items-center">
            <span className="text-black font-bold text-lg mr-2">
              {rating > 0 ? rating : "No ratings yet "}
            </span>
            {[...Array(5)].map((_, index) => {
              const isHalfStar = rating - index > 0 && rating - index < 1;
              return isHalfStar ? (
                <div key={index} className="relative w-5 h-5">
                  {/* Outline Star (for boundary) */}
                  <AiOutlineStar className="w-5 h-5 text-orange-400" />
                  {/* Filled Star with Clipping */}
                  <AiFillStar
                    className="w-5 h-5 text-orange-400 absolute top-0 left-0"
                    style={{
                      clipPath: `inset(0 ${100 - (value - index) * 100}% 0 0)`,
                    }}
                  />
                </div>
              ) : rating > index ? (
                <AiFillStar key={index} className="w-5 h-5 text-orange-400" />
              ) : (
                <AiOutlineStar
                  key={index}
                  className="w-5 h-5 text-orange-400"
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex flex-col space-y-2 mt-2">
            <button onClick={()=>{createCartEntity(productId)}}  className="bg-green-500 cursor-pointer text-white w-full py-2 mt-4 rounded-md text-xl md:text-2xl hover:bg-green-600">
             {loading ? "Adding..." :"ADD TO CART"}
            </button>

            {/* Reviews */}
            <div className=" p-3 bg-gradient-to-br text-center mt-3 from-green-200 to-white rounded-xl ">
              <h3 className="text-black font-semibold mb-2">Top Reviews:</h3>
              {!reviews && <span>No reviews yet</span>}
              {reviews?.length>0 && reviews?.map((review, index) => (
                <div key={index} className="flex items-start space-x-2 mb-2 mt-5">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white font-bold rounded-full">
                    {review.comment}
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                </div>
              ))}
              {/* <div className="text-sm mt-4 cursor-pointer hover:underline">Click to see More</div> */}
            </div>
          </div>
        </div>
        {/* Unit Selection */}
        
      </div>
    </div>
  );
}

export default ProductCard;
