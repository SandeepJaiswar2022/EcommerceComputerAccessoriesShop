import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCartItems } from '../../State/CartItem/CartItemSlice';
import { FaRupeeSign } from 'react-icons/fa'
import { createOrder } from '../../State/OrderDetails/OrderDetailsSlice';
import { toast } from 'react-toastify';
import { createPayment } from '../../State/Payment/PaymentSlice';


function OrderSummaryPrePayment() {
    const dispatch = useDispatch();
    const cartItemObj = useSelector(store => store.cartItem?.cartItems); //Obj
    const cartItems = cartItemObj?.cartItems; //Array
    const jwtToken = useSelector((state) => state.auth.jwtToken);
    const navigateTo = useNavigate();
    const orderDetails = useSelector(state => state.orderDetails);
    const orderId = orderDetails?.order?.id;
    const shippingAddress = orderDetails.shippingAddress;

    useEffect(() => {
        const currentStep = localStorage.getItem('currentStep');
        if (currentStep !== '2') {
            navigateTo('/cart');
        }
    }, [navigateTo]);


    const goToOrderPlaced = () => {
        // dispatch(createOrder(shippingAddress));
        console.log("In PreOrder Summary : ", localStorage.getItem(`currentStep`));
        localStorage.setItem('currentStep', '3');
        dispatch(createPayment(orderId));
        // navigateTo(`/postordersummary/${orderId}`);
    }

    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-indigo-500 mb-8">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-white">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold text-blue-300">First Name</p>
                        <p className="text-yellow-200">{shippingAddress?.firstname}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold text-blue-300">Last Name</p>
                        <p className="text-yellow-200">{shippingAddress?.lastname}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold text-blue-300">Street</p>
                        <p className="text-yellow-200">{shippingAddress?.street}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold text-blue-300">City</p>
                        <p className="text-yellow-200">{shippingAddress?.city}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold text-blue-300">State</p>
                        <p className="text-yellow-200">{shippingAddress?.state}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold text-blue-300">Zip</p>
                        <p className="text-yellow-200">{shippingAddress?.zip}</p>
                    </div>
                    <div className="flex flex-col col-span-1 sm:col-span-3">
                        <p className="text-lg font-semibold text-blue-300">Mobile</p>
                        <p className="text-yellow-200">{shippingAddress?.mobile}</p>
                    </div>
                </div>
            </div>

            <section className="container mx-auto py-10 px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row gap-8">
                {/* <ToastContainer autoClose={700} /> */}
                {/* Product List  */}
                <div className="lg:w-2/3 overflow-y-auto custom-scrollbar h-screen pr-4">
                    <div className="space-y-4">
                        {cartItems?.map((cartItem) => (<div key={cartItem.product.id} className="custom-color p-4 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                            <div className="col-span-1 flex justify-center">
                                <img
                                    src={`/ProductImages/${cartItem.product?.imageUrl}`}
                                    alt="Product Image"
                                    className="w-25 h-20 object-cover rounded-md"
                                />
                            </div>
                            <div className="col-span-1 flex flex-col items-center sm:items-start">
                                <h2 className="text-lg font-bold text-blue-400">{cartItem.product.title}</h2>
                                <p className="text-green-300">Brand: {cartItem.product.brand}</p>
                            </div>
                            <div className="col-span-1 flex flex-col items-center sm:items-start">
                                <div className='text-gray-400 flex items-center'>
                                    <FaRupeeSign className='mt-1' />
                                    <p className="line-through ml-1">{cartItem.product.price}</p>
                                </div>
                                <div className='flex items-center'>
                                    <FaRupeeSign className='mt-1 text-yellow-500' />
                                    <p className="text-yellow-500 ml-1">{cartItem.product.discountPrice} <span className="text-green-500">{cartItem.product.discountPercentage}% off</span></p>
                                </div>
                                <div className="mt-2 flex flex-col items-center sm:items-start">
                                    <p className="text-gray-300">Total Quantity: {cartItem.quantity}</p>
                                    <div className='flex items-center'>
                                        <FaRupeeSign className='mt-1 text-yellow-500' />
                                        <p className="text-yellow-500 ml-1">Total Price: {cartItem.quantity * cartItem.product.discountPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}

                        {/* starts */}

                        {/* ends */}
                    </div>

                </div>

                {/* Pricing Details  */}
                <div className="lg:w-fit flex flex-col justify-center items-center bg-gray-800 h-fit p-8 rounded-lg sticky lg:top-16 md:static md:top-auto">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-4">Price Details</h2>
                    <table className="min-w-full divide-y divide-gray-200">

                        <tbody className="text-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="font-bold text-lg text-gray-300">Price ({cartItemObj?.cartTotalQuantity} items) :</span></td>
                                <td align='right' className="px-6 py-4 whitespace-nowrap"><div className="flex text-white justify-center items-center">
                                    <FaRupeeSign /><span className="font-bold text-lg">{cartItemObj?.cartTotalPrice}</span>
                                </div></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="text-lg font-bold text-gray-300">Discount :</span></td>
                                <td align='right' className="px-6 py-4 whitespace-nowrap"> <div className='flex text-green-500 justify-center items-center'>-<FaRupeeSign /><span className="font-bold text-lg">{cartItemObj?.cartTotalDiscount}</span></div></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="text-lg font-bold text-gray-300">Delivery Charges :</span></td>
                                <td align='center' className="px-6 py-4 whitespace-nowrap"><span className="font-bold text-lg text-yellow-500">FREE</span></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="text-2xl font-bold text-blue-400">Total Amount :</span></td>
                                <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center space-x-1 text-white items-center">
                                    <FaRupeeSign />
                                    <span className="text-lg font-bold ">{cartItemObj?.cartTotalPriceAfterDiscount}</span>
                                </div></td>
                            </tr>
                        </tbody>
                    </table>
                    <Link onClick={goToOrderPlaced}
                        className="btn-bg-color text-center btn-bg-color-hover text-white font-bold py-3 px-6 rounded mt-6 w-full transition duration-300 ease-in-out">Proceed To Checkout</Link>
                </div>

            </section>
        </>
    )
}

export default OrderSummaryPrePayment
