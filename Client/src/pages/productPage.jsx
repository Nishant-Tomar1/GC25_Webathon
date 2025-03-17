import { use, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function ProductCard() {
    const [product, setProduct] = useState({
        title: "Amul Taaza Toned Fresh Milk",
        description:
          "Amul Taaza Toned Milk is a low-fat milk with a fat content of 3%. This toned milk is ideal for those who are health conscious but do not like the taste of double toned milk.",
        price: 25,
        stock: 100,
        seller: "Radhika Store",
        discounts: 5,
        ratings: [2.5, 2, 5, 5, 5],
        reviews: ["very Nice, I like it", "Good Product", "Best Milk"],
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJmpUkdlPD8aRdktQql6s2-sXkVi2ZeK3u-Q&s",
        brand: "Amul",
        category: "Groceries",
      });

    // useEffect(()=>{
    //     const fetchUser = async () => {
    //         try {
    //           const res = await fetch(`/api/product/getProduct/${identifier}`);
    //           const data = await res.json();
    //           // console.log(data);
    //           if(data) setProfile(data);
    //         } catch (error) {
    //           console.log("error!!");
    //         }
    //       };
    //       fetchUser();
    //       },[]);

//   const handleAdd = async() => {
//     try {
//         const res = await fetch(`http://localhost:8080/api/v1/cart/${}`, { 
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 seller: product.seller,
//                 buyer: "Radhika",
//                 product: product.title,
//                 price: product.price,
//                 status: "Ordered",
//                 delivery: "Pending",
//             }),
//         });


//     } catch (error) {
//         console.error("Error Adding to Cart", error);
//     }
//   };


  const value =
    product.ratings.reduce((sum, rating) => sum + rating, 0) /
    product.ratings.length;

  return (
    <div className="bg-white flex flex-col justify-evenly p-4   mx-auto md:flex-row ">
      {/* Image Section */}
      <div className="  ">
        <img
          src={product.image || "https://via.placeholder.com/300"} // Fallback image
          alt={product.name}
          className="w-full h-[60%] md:h-[600px] object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
        {/* <p className="text-gray-500 text-sm">Home / Milk / {product.name}</p> */}
        <h2 className="text-xl md:text-4xl font-bold mt-2 p-3">
          {product.title}
        </h2>
        <h4 className="md:text-xl p-2 cursor-pointer hover:underline text-green-500 ">
          {" "}
          View all {product.category} items
        </h4>
        <div className="flex md:gap-5">
          <span className="inline-block md:text-xl bg-gray-100 text-gray-700 px-2 py-1 mt-2 rounded-md">
            🛡️ {product.brand}
          </span>
          <span className="inline-block md:text-xl bg-gray-100 text-gray-700 px-2 py-1 mt-2 rounded-md">
            🛒 {product.seller}
          </span>
        </div>
        <p className="text-gray-600 mt-2 p-2 md:text-lg">
          {product.description}
        </p>
        <button
          className={`px-4 py-2 font-bold border rounded-md bg-green-100 border-green-500`}
        >
          ₹{product.price - product.discounts} <span className="f">MRP</span>{" "}
          <span className="line-through">₹{product.price}</span>{" "}
          <span>(Inclusive of all taxes)</span>
        </button>
        <div className="mt-2">
          {/* <span>⭐ </span> */}
          <div className="flex items-center">
            <span className="text-black font-bold text-lg mr-1">
              {value.toFixed(1)}
            </span>
            {[...Array(5)].map((_, index) => {
              const isHalfStar = value - index > 0 && value - index < 1;
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
              ) : value > index ? (
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
            <button  className="bg-green-500 text-white w-full py-2 mt-4 rounded-md text-xl md:text-2xl hover:bg-green-600">
             ADD TO CART
            </button>

            {/* Reviews */}
            <div className=" p-3 bg-gradient-to-br mt-3 from-green-200 to-white rounded-xl ">
              <h3 className="text-black font-semibold mb-2">Top Reviews:</h3>
              {product.reviews.slice(0, 2).map((review, index) => (
                <div key={index} className="flex items-start space-x-2 mb-2 mt-5">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white font-bold rounded-full">
                    {review[0]}
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm">{review}</p>
                  </div>
                </div>
              ))}
              <div className="text-sm mt-4 cursor-pointer hover:underline">Click to see More</div>
            </div>
          </div>
        </div>
        {/* Unit Selection */}
        {/* <div className="mt-4">
          <h3 className="font-semibold">Select Unit</h3>
          <div className="flex gap-2 mt-2">
            {product.units.map((unit) => (
              <button
                key={unit.size}
                className={`px-4 py-2 border rounded-md ${
                  selectedUnit === unit.size ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'
                }`}
                onClick={() => handleUnitSelect(unit.size)}
              >
                {unit.size} - ₹{unit.price}
              </button>
            ))}
          </div>
        </div> */}

        {/* Add Button */}

        {/* Info Section */}
        <div className="mt-6"></div>
      </div>
    </div>
  );
}

export default ProductCard;
