import React from "react";

const ProductCard = ({title, price = 100, discount = 0 , image}) => {
  return (
    <div className="w-[240px] h-[370px] bg-white border border-gray-200 rounded-lg shadow-md p-4 m-2 overflow-hidden">
      {/* Discount Badge */}
      {/* { (discount>0) && <div className="relative top-2 left-2 bg-blue-500 w-10 text-white text-xs font-bold px-2 py-1 rounded">
        {discount} % Off
      </div>} */}

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-contain mb-4"
      />

      {/* Delivery Time
      <p className="text-sm text-gray-500 flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        23 MINS
      </p> */}

      {/* Product Name */}
      <div className="text-sm text-center font-semibold text-gray-800 mb-3 truncate">
        {title}
      </div>

      <div className="min-h-[70px] max-w-[95%] flex justify-center px-5 text-sm text-center font text-gray-800 mb-3">
        {title}
      </div>

      {/* Product Weight */}
      {/* <p className="text-sm text-gray-500 mb-3">28.3 g</p> */}

      {/* Price Section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800">
            ₹ {(price - (discount * price) / 100).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through ml-2">
            ₹ {price}
          </span>
        </div>
        <button className="bg-gray-100 font-semibold text-green-800 text-xs px-5 py-2 rounded-md border border-green-800">
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
