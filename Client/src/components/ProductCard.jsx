import React from "react";

const ProductCard = ({title, price = 100, discount = 0 , image}) => {
  return (
    <div className="w-[240px] h-[370px] bg-white border border-gray-200 rounded-lg shadow-md p-4 m-2 overflow-hidden">

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-contain mb-4"
      />
      {/* Product Name */}
      <div className="text-sm text-center font-semibold text-gray-800 mb-3 truncate">
        {title}
      </div>

      <div className="min-h-[70px] max-w-[95%] flex justify-center px-5 text-sm text-center font text-gray-800 mb-3">
        {title}
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800">
            ₹ {(price - (discount * price) / 100).toFixed(2)}
          </span>
          {discount>0 && <span className="text-sm text-gray-500 line-through ml-2">
            ₹ {price}
          </span>}
        </div>
        <button className="bg-gray-100 font-semibold text-green-800 text-xs px-5 py-2 rounded-md border border-green-800">
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
