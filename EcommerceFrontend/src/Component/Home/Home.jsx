import React, { useEffect } from 'react'
import Carousel from '../Carousel/Carousel';
import ProductSlider from '../ProductSlider/ProductSlider';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../State/CartItem/CartItemSlice';

function Home() {

  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  useEffect(() => {
    if (jwtToken) {
      dispatch(getCartItems(jwtToken));
    }
  }, [dispatch, jwtToken]);
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
    </div>
  )
}

export default Home
