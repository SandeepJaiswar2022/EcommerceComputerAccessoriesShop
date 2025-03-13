import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory, setFiltersOnOrderItems } from '../../State/OrderDetails/OrderDetailsSlice';
import { FaRupeeSign } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

function MyOrders() {
    const statusColor = {
        ALL: `null`,
        PENDING: `bg-yellow-500`,
        CONFIRMED: `bg-pink-600`,
        SHIPPED: `bg-purple-700`,
        DELIVERED: `bg-green-700`,
        CANCELLED: `bg-red-700`
    }
    const [defaultStatus, setDefaultStatus] = useState('ALL');
    const statusEntries = Object.keys(statusColor);



    const dispatch = useDispatch();
    const purchasedOrderedItems = useSelector(state => state.orderDetails.purchasedOrderedItems);
    const filteredOrderedItems = useSelector(state => state.orderDetails.filteredOrderedItems);
    const statusOfOrder = useSelector(state => state.orderDetails.orderStatus);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        localStorage.setItem('currentStep', '0');
        if (auth?.role) {
            dispatch(getUserOrderHistory(auth.role));
        }
        // console.log("Get User Order History Called ");
    }, [dispatch, auth.role]);

    const filterItems = (status) => {

        dispatch(setFiltersOnOrderItems(status))
    }

    if (purchasedOrderedItems?.length === 0) {
        return (
            <>
                <div className="flex space-y-5 flex-col items-center justify-center sm:flex">
                    <h1 className="text-center text-white font-extrabold text-2xl">Your Order Is Empty!</h1>
                    <div className="rounded-md shadow">
                        <Link
                            to={`/shop`}
                            className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md font-bold text-white btn-bg-color btn-bg-color-hover md:py-4 md:text-lg md:px-10"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
            {/* Filter Section */}
            {/* <ToastContainer autoClose={300} /> */}
            <div className="mb-8 ml-8 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <label className="text-white text-lg font-bold mb-2 block">Order Status:</label>
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        {/* By Default Check for all orderItems */}
                        {statusEntries.map((status, index) => (<label key={index} className="inline-flex cursor-pointer items-center text-gray-300">
                            <input type="radio" onChange={() => filterItems(status)} name="orderStatus" value={status} className="radio-tick cursor-pointer" />
                            <span className="ml-2">{status}</span>
                        </label>))}
                    </div>
                </div>
            </div>

            {/* Orders Section */}
            <div className="custom-scrollbar">
                <div className="grid grid-cols-1 gap-6">
                    {filteredOrderedItems && filteredOrderedItems.length > 0 ? (
                        // If there are filtered items, map through them
                        filteredOrderedItems.map((item) => (
                            <div
                                key={item?.id}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mx-2 sm:mx-4 md:mx-6 lg:mx-8"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    <img
                                        src={`/ProductImages/${item.product?.imageUrl}`}
                                        alt="Product"
                                        className="w-24 h-24 object-cover rounded-md border border-gray-700"
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            {item?.product?.title}
                                        </h3>
                                        <p className="text-gray-400">
                                            Quantity:{" "}
                                            <span className="bg-white text-black px-2 py-1 rounded-lg font-bold">
                                                {item?.quantity}
                                            </span>
                                        </p>
                                        <p className="text-gray-400 flex">
                                            <FaRupeeSign className="mt-1" />
                                            <span>{item?.discountPrice}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start md:items-end space-y-2">
                                    <p className="text-white">
                                        Booked On: {item?.orderDate + `, ` + item?.orderTime}
                                    </p>
                                    <span
                                        className={`text-sm font-semibold px-4 py-2 rounded-full text-white ${statusColor[item.orderStatus]}`}
                                    >
                                        {item.orderStatus}
                                    </span>
                                    <p className="text-white italic">Expected Delivery on Mar 30</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        // If there are no items, display a "No items found" message
                        <p className="text-white font-semibold text-lg text-center">No OrderItems is found {statusOfOrder}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyOrders
