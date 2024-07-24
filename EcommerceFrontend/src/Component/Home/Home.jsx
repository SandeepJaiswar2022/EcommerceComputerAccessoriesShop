import React, { useEffect } from 'react'
import Carousel from '../Carousel/Carousel';
import ProductSlider from '../ProductSlider/ProductSlider';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Home() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <Carousel />
      <ProductSlider rem={1} title={`TOP PRODUCTS`} />
      <ProductSlider rem={0} title={`BEST DEALS`} />
      <div className='flex items-center justify-center gap-7' >
        <Link to={`/address`} className='text-white font-bold text-xl hover:text-red-500' >Add Address</Link>
        <Link to={`/orderPlaced`} className='text-white font-bold text-xl hover:text-red-500' >Order Placed</Link>
        <Link to={`/myOrders`} className='text-white font-bold text-xl hover:text-red-500' >My Orders</Link>
        {/* User Profile Drop Down List(1.My Profile 2.My Orders 3.LogOut) */}
      </div>
    </div>
  )
}

export default Home
