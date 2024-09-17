import React from 'react'
import Carousel from '../Carousel/Carousel';
import ProductSlider from '../ProductSlider/ProductSlider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Home() {

  return (
    <div>
      <ToastContainer autoClose={1000} />
      <Carousel />
      <ProductSlider rem={1} title={`TOP PRODUCTS`} />
      <ProductSlider rem={0} title={`BEST DEALS`} />
    </div>
  )
}

export default Home
