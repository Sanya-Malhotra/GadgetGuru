import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()


    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className="container mx-auto px-8 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-8 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block hover:bg-gray-200 focus:outline-none"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        <button
          className="bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block hover:bg-gray-200 focus:outline-none"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-gray-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-800 bg-gray-300 animate-pulse p-1 rounded-full"></h2>
                  <p className="capitalize text-gray-600 bg-gray-300 animate-pulse p-1 rounded-full"></p>
                  <div className="flex gap-3 w-full">
                    <p className="text-red-600 font-medium bg-gray-300 animate-pulse p-1 rounded-full"></p>
                    <p className="text-gray-500 line-through bg-gray-300 animate-pulse p-1 rounded-full"></p>
                  </div>
                  <button className="text-sm text-white px-3 py-1 rounded-full w-full bg-gray-300 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                key={product._id}
                to={"product/" + product?._id}
                className="w-full min-w-[2w-full min-w-[480px] md:min-w-[420px] max-w-[480px] md:max-w-[420px] h-40 bg-white rounded-lg shadow-md flex hover:shadow-lg transition-shadow"
              >
                <div className="bg-gray-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className="font-semibold text-lg md:text-xl text-gray-800 mb-2">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-gray-600">
                    {product?.category}
                  </p>
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-sm text-gray-500 line-through bg-gray-100 px-2 py-1 rounded-full">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 my-2 rounded-3xl shadow-md transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default HorizontalCardProduct