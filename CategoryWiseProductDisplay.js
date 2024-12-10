import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 overflow-x-auto scrollbar-none transition-all">
        {loading
          ? loadingList.map((_, index) => (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow-lg"
                key={index}
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg bg-slate-200 animate-pulse h-6 rounded"></h2>
                  <p className="capitalize text-slate-500 bg-slate-200 animate-pulse h-6 rounded"></p>
                  <div className="flex gap-3">
                    <p className="text-blue-600 font-medium bg-slate-200 animate-pulse h-6 w-full rounded"></p>
                    <p className="text-slate-500 line-through bg-slate-200 animate-pulse h-6 w-full rounded"></p>
                  </div>
                  <button className="text-sm text-white bg-slate-200 animate-pulse h-10 rounded"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                to={`/product/${product?._id}`}
                className="w-full min-w-[280px] md:min-w-[320px] bg-white rounded-sm shadow-lg transition-transform hover:scale-105"
                key={product?._id}
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-contain h-full hover:scale-110 transition-transform mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-black line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3 items-center">
                    <p className="text-blue-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="relative inline-flex items-center justify-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-75 rounded-full blur-sm"></span>
                    <span className="relative">Add to Cart</span>
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategroyWiseProductDisplay;
