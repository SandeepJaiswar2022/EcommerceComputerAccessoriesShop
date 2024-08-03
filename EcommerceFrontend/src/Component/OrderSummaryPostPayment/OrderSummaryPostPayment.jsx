import React, { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getOrderByOrderId } from '../../State/OrderDetails/OrderDetailsSlice';
import { updatePayment } from '../../State/Payment/PaymentSlice';

const OrderSummaryPostPayment = () => {
    const orderDetails = useSelector(state => state.orderDetails);
    const order = orderDetails?.order;
    const dispatch = useDispatch();
    const [paymentId, setPaymentId] = useState();
    const [referenceId, setReferenceId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const { orderId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const currentStep = localStorage.getItem('currentStep');
        console.log("In Post order summary: ", localStorage.getItem(`currentStep`));
        if (currentStep !== '3') {
            navigate('/cart');
        }

        const urlParam = new URLSearchParams(window.location.search);
        setPaymentId(urlParam.get("razorpay_payment_id"));
        setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
        toast.success("Order Booked Successfully post...");
    }, [navigate]);

    useEffect(() => {
        const data = { orderId, paymentId };
        dispatch(getOrderByOrderId(orderId));
        dispatch(updatePayment(data));
    }, [orderId,paymentId]);

    return (
        <div className="container mx-auto p-6 bg-gray-900 min-h-screen text-white">
            <ToastContainer autoClose={5000} />
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-500">Order Summary</h1>

            {/* Shipping Address */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-teal-400">Shipping Address</h2>
                <div className="space-y-2">
                    <p className="text-lg">Name: <span className="font-medium text-gray-400">{order?.shippingAddress?.firstname}{order?.shippingAddress?.lastname}</span></p>
                    <p className="text-lg">Street: <span className="font-medium text-gray-400">{order?.shippingAddress?.street}</span></p>
                    <p className="text-lg">City: <span className="font-medium text-gray-400">{order?.shippingAddress?.city}</span></p>
                    <p className="text-lg">State: <span className="font-medium text-gray-400">{order?.shippingAddress?.state}</span></p>
                    <p className="text-lg">ZIP Code: <span className="font-medium text-gray-400">{order?.shippingAddress?.zip}</span></p>
                    <p className="text-lg">Contact Number: <span className="font-medium text-gray-400">{order?.shippingAddress?.mobile}</span></p>
                </div>
            </div>

            {/* Order Status */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-teal-400">Order Status</h2>
                <p className="text-lg text-white">Status: <span className="font-medium text-yellow-300">{order?.orderStatus}</span></p>
                <p className="text-lg text-white">Order Date and Time :  <span className="font-medium text-green-400">{order?.orderDate}, {order?.orderTime}</span></p>
                <p className="text-lg text-white">Expected Delivery: <span className="font-medium text-green-400">August 15, 2024 (Wednesday)</span></p>
            </div>

            {/* Order Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {order?.orderItems?.map((item, index) => (
                    <div key={index} className="bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
                        <img src={`/ProductImages/${item?.product?.imageUrl}`} alt={item?.product?.title} className="w-32 h-32 object-cover rounded-lg mb-4" />
                        <div className="text-center">
                            <h2 className="text-lg font-semibold mb-2 text-teal-400">{item?.product?.title}</h2>
                            <p className="text-base mb-2">Quantity: <span className="font-medium">{item?.quantity}</span></p>
                            <p className="text-base flex mb-4">Price:<FaRupeeSign className='mt-1' /> <span className="font-medium">{item?.discountPrice}</span></p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Go To My Orders Button */}
            <div className="mt-8 flex justify-center">
                <button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => navigate('/myorders')}
                >
                    Go To My Orders
                </button>
            </div>
        </div >
    );
};

export default OrderSummaryPostPayment;