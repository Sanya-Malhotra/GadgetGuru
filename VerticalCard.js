import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 justify-center md:justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gray-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              onClick={scrollTop}
            >
              <div className="bg-gray-100 h-48 p-4 flex justify-center items-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="object-contain h-full transition-transform transform hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 truncate">
                  {product?.productName}
                </h2>
                <p className="capitalize text-gray-600 mb-2">
                  {product?.category}
                </p>
                <div className="flex gap-2 items-center mb-2">
                  <p className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-gray-500 line-through bg-gray-100 px-2 py-1 rounded-full">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button
                  className="w-full text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;
