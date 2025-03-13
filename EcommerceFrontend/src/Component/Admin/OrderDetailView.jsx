import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changeOrderStatus, getOrderByOrderId } from '../../State/OrderDetails/OrderDetailsSlice';
import { BiEdit } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';

const OrderDetailView = () => {
  // Demo data
  const { orderId } = useParams();
  const order = useSelector(state => state.orderDetails.order);
  const statusColor = {
    PENDING: `bg-yellow-500`,
    CONFIRMED: `bg-pink-600`,
    SHIPPED: `bg-purple-700`,
    DELIVERED: `bg-green-500`,
    CANCELLED: `bg-red-700`
  }

  const navigateTo = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentStatus, setCurrentSatus] = useState(null);
  const [data, setData] = useState({
    orderStatus: null,
    orderId: null,
    role: null
  });
  const role = useSelector(state => state.auth.user.role);

  const goToAllOrder = () => {
    navigateTo("/admin/orderhistory")
  }


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByOrderId(orderId));
  }, [orderId]);

  const openModal = ({ cstatus, orderID }) => {
    setShowModal(true);
    setCurrentSatus(cstatus);
    setData({
      orderStatus: cstatus,
      orderId: orderID,
      role: role
    });

  }
  const updateStatus = (e) => {
    const newStatus = e.target.value.toLowerCase();
    dispatch(changeOrderStatus({ ...data, orderStatus: newStatus }));
    setShowModal(false);
  }

  return (
    <>
      <ToastContainer autoClose={1000} />
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl text-white font-semibold">Update Status</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black text-center justify-center items-center flex h-8 w-8 hover:bg-white text-xl font-bold bg-gray-500 rounded-full">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-auto max-h-80">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <select name="status" onChange={updateStatus} value={currentStatus} className="border bg-black text-white w-full rounded p-2">
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="PENDING">PENDING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </select>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="min-h-screen p-6 text-gray-100 relative">
        {/* Back button in top-left corner */}
        <button onClick={goToAllOrder} className="absolute top-4 left-6 bg-purple-600 text-white p-2 rounded-full shadow-md hover:bg-purple-500 transition">
          <FaArrowLeft />
        </button>

        {/* Grid layout */}
        <div className="grid grid-rows-auto gap-6 mt-12">

          {/* Row 1: Order Items */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-center mb-5 font-bold text-yellow-200">Order Items</h2>


            <div className="relative overflow-x-auto">
              <table className="w-full text-left font-semibold rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="uppercase font-bold text-indigo-200 border-t">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivery Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((item, index) => (
                    <tr key={index} className="border-t text-white">
                      <td className="px-6 py-4">
                        <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                          <img
                            src={`/ProductImages/${item?.product?.imageUrl}`}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                        {item?.id}
                      </th>
                      <td className="px-6 py-4">
                        {item?.product?.category}
                      </td>
                      <td className="px-6 py-4">
                        {item?.quantity}
                      </td>
                      <td className="px-6 py-4">
                        {item?.discountPrice}
                      </td>
                      <td className="px-6 py-4">
                        {order?.orderDate}
                        <span className='italic'>{`${`, ` + order?.orderTime}`}</span>
                      </td>
                      <td className="px-6 flex pt-8 items-center space-x-2">
                        <span className={`${statusColor[item?.orderStatus]} rounded-3xl  font-bold p-2`} >{item?.orderStatus}</span>
                        <BiEdit onClick={() => openModal({ cstatus: item?.orderStatus, orderID: item?.id })} className="text-3xl transition-transform duration-300 hover:scale-110 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Row 1: User and Delivery Person details */}
          <div className="grid grid-cols-2 gap-6">

            {/* User Details */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md"> {/* Reduced padding */}
              <h2 className="text-2xl font-semibold text-center text-purple-400 mb-2">User Details</h2>
              <div className="relative mt-10 overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <tbody>
                    <tr className=" border-b border-t dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-bold text-green-300 whitespace-nowrap">
                        Username
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {`${order?.user?.firstname} ${order?.user?.lastname}`.toUpperCase()}
                      </td>
                    </tr>
                    <tr className=" border-b dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-green-300 whitespace-nowrap">
                        Email
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {order?.user?.email}
                      </td>
                    </tr>
                    <tr className=" border-b dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-green-300 whitespace-nowrap">
                        User ID
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {order?.user?.id}
                      </td>
                    </tr>
                    <tr className=" border-b dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-green-300 whitespace-nowrap">
                        Mobile
                      </th>
                      <td className="px-6 font-bold italic text-white py-4">
                        {order?.user?.mobile ? order?.user?.mobile : `Null`}
                      </td>
                    </tr>
                    <tr className=" dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-green-300 whitespace-nowrap">
                        Total Order
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        10
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>


            {/* Whom To Deliver Person Details */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md"> {/* Reduced padding */}
              <h2 className="text-2xl font-semibold text-center text-green-500 mb-2">Whom To Deliver</h2>
              <div className="relative mt-10 overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <tbody>
                    <tr className=" border-b border-t dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-bold text-purple-500 whitespace-nowrap">
                        Full Name
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {`${order?.shippingAddress?.firstname} ${order?.shippingAddress?.lastname}`.toUpperCase()}
                      </td>
                    </tr>
                    <tr className=" border-b dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-purple-500 whitespace-nowrap">
                        Mobile
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {order?.shippingAddress?.mobile}
                      </td>
                    </tr>
                    <tr className=" border-b dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-purple-500 whitespace-nowrap">
                        Street
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {order?.shippingAddress?.street}
                      </td>
                    </tr>
                    <tr className=" border-b dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-purple-500 whitespace-nowrap">
                        Zip
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {order?.shippingAddress?.zip}
                      </td>
                    </tr>
                    <tr className="dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-bold text-purple-500 whitespace-nowrap">
                        City & State
                      </th>
                      <td className="px-6 font-bold text-white py-4">
                        {`${order?.shippingAddress?.city}, ${order?.shippingAddress?.state}`}
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* Row 3: Payment Details */}
          <div className="bg-gray-800 p-3 rounded-lg shadow-md w-full">
            <h2 className="text-lg text-center mb-5 font-semibold text-blue-600">Payment Details</h2>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="uppercase text-yellow-500 border-t">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Paid At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t italic text-white">
                    <th scope="row" className="px-6 py-4 font-bold">
                      {order?.paymentDetail?.paymentMethod || "Null"}
                    </th>
                    <td className="px-6 py-4 font-bold">
                      {order?.paymentDetail?.paymentId || "Null"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {order?.paymentDetail?.amountPaid || "Null"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {order?.paymentDetail?.paymentDateAndTime || "Null"}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {order?.paymentDetail?.status || "Null"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </>


  );
};

export default OrderDetailView;
