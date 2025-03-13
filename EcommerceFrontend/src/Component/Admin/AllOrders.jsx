import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { AiOutlineEye } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from "../Sidebar/Sidebar";
import { getUserOrderHistory } from "../../State/OrderDetails/OrderDetailsSlice";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';



const AllOrders = () => {
    const auth = useSelector(state => state.auth);
    const navigateTo = useNavigate();
    const orderDetails = useSelector(state => state.orderDetails);
    const [rowsLimit] = useState(4);
    const [rowsToShow, setRowsToShow] = useState(orderDetails.orderHistory.slice(0, rowsLimit));
    const [customPagination, setCustomPagination] = useState([]);
    const [totalPage] = useState(Math.ceil(orderDetails.orderHistory?.length / rowsLimit));
    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        const startIndex = rowsLimit * (currentPage + 1);
        const endIndex = startIndex + rowsLimit;
        const newArray = orderDetails?.orderHistory.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(currentPage + 1);
    };
    const changePage = (value) => {
        const startIndex = value * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = orderDetails?.orderHistory?.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        setCurrentPage(value);
    };
    const previousPage = () => {
        const startIndex = (currentPage - 1) * rowsLimit;
        const endIndex = startIndex + rowsLimit;
        const newArray = orderDetails?.orderHistory.slice(startIndex, endIndex);
        setRowsToShow(newArray);
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(0);
        }
    };

    useMemo(() => {
        setCustomPagination(
            Array(Math.ceil(orderDetails.orderHistory?.length / rowsLimit)).fill(null)
        );
    }, []);


    const dispatch = useDispatch();

    const goToOrderDetails = (orderId) => {
        navigateTo(`/admin/orderDetails/${orderId}`);
    }

    useEffect(() => {
        if (auth?.role)
            dispatch(getUserOrderHistory(auth.role));
    }, [dispatch, auth.role]);

    useEffect(() => {
        setRowsToShow(orderDetails?.orderHistory?.slice(0, rowsLimit));
        setCustomPagination(
            Array(Math.ceil(orderDetails.orderHistory?.length / rowsLimit)).fill(null)
        );
    }, [orderDetails.orderHistory, rowsLimit]);



    // input changes to update newProduct state
    if (orderDetails.loading) {
        return (
            <h1>
                Loading...
            </h1>
        )
    }

    return (

        <>
            <ToastContainer autoClose={1000} />
            <div className="grid grid-cols-6 space-x-1 gap-4 p-4">
                {/* First Grid (1 column) */}
                <div className="col-span-1 bg-black">
                    <div className="text-white"><Sidebar /></div>
                </div>

                {/* Second Grid (3 columns) */}
                <div className="col-span-5 text-white text-center grid gap-4">
                    <h1 className='text-2xl font-extrabold'>All Users</h1>
                    <div className="min-h-screen h-full bg-black flex justify-center">
                        <div className="w-full max-w-4xl px-2">
                            <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none">
                                <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
                                    <thead className="rounded-lg text-base text-white font-semibold w-full">
                                        <tr className="bg-green-700">
                                            <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                                Order ID
                                            </th>
                                            <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                                User Image
                                            </th>
                                            <th className="py-3 px-3  justify-center text-white sm:text-base font-bold whitespace-nowrap">
                                                User ID
                                            </th>
                                            <th className="py-3 px-3  justify-center text-white sm:text-base font-bold whitespace-nowrap">
                                                Created At
                                            </th>
                                            <th className="py-3 px-3  justify-center text-white sm:text-base font-bold whitespace-nowrap">
                                                Contact Number
                                            </th>
                                            <th className="py-3 px-3  justify-center text-white sm:text-base font-bold whitespace-nowrap">
                                                Total Items
                                            </th>
                                            <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                                                Price
                                            </th>

                                            <th className="flex items-center py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap gap-1">
                                                View Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowsToShow?.map((data, index) => (
                                            <tr
                                                className={`${index % 2 == 0 ? "bg-[#030d15]" : "bg-[#281505]"
                                                    }`}
                                                key={index}
                                            >
                                                <td
                                                    className={`py-2 px-3 font-normal text-base ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        } whitespace-nowrap`}
                                                >
                                                    {data?.id}
                                                </td>
                                                <td
                                                    className={`py-2 px-3 min-w-4 font-normal text-base ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        } whitespace-nowrap`}
                                                >
                                                    <div className="w-16 h-16 text-black text-4xl bg-white flex items-center justify-center font-bold rounded-full overflow-hidden">
                                                        {data?.shippingAddress.firstname.charAt(0).toUpperCase()}
                                                    </div>
                                                </td>
                                                <td
                                                    className={`py-2 px-3 font-normal text-base ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        } whitespace-nowrap`}
                                                >
                                                    {data?.orderItems[0].userId}
                                                </td>
                                                <td
                                                    className={`py-2 px-3 text-base  font-normal ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        } whitespace-nowrap`}
                                                >
                                                    {`${data?.orderDate}  ${data?.orderTime}`}
                                                </td>
                                                <td
                                                    className={`py-2 px-3 text-base  font-normal ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        } min-w-[70px]`}
                                                >
                                                    {data?.shippingAddress.mobile}
                                                </td>

                                                <td
                                                    className={`py-2 px-3 text-base  font-normal ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        } min-w-[70px]`}
                                                >
                                                    {data?.totalItem}
                                                </td>

                                                <td
                                                    className={`py-2 px-3 text-base  font-normal ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        } min-w-[70px]`}
                                                >
                                                    {"₹" + data?.totalDiscountPrice}
                                                </td>

                                                <td
                                                    className={`py-10 flex justify-center items-center px-3 text-base space-x-4 font-normal ${index == 0
                                                        ? "border-t-2 border-black"
                                                        : index == rowsToShow?.length
                                                            ? "border-y"
                                                            : "border-t"
                                                        }`}
                                                >
                                                    <button onClick={() => goToOrderDetails(data?.id)} className="text-3xl font-extrabold text-indigo-400 hover:text-indigo-600 transform transition-transform duration-500 hover:scale-125"><AiOutlineEye /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                                <div className="text-lg">
                                    Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                                    {currentPage == totalPage - 1
                                        ? orderDetails?.orderHistory?.length
                                        : (currentPage + 1) * rowsLimit}{" "}
                                    of {orderDetails?.orderHistory?.length} entries
                                </div>
                                <div className="flex">
                                    <ul
                                        className="flex justify-center items-center gap-x-[10px] z-30"
                                        role="navigation"
                                        aria-label="Pagination"
                                    >
                                        <li
                                            className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                                                ? "bg-[#cccccc] text-black pointer-events-none"
                                                : " cursor-pointer"
                                                }
`}
                                            onClick={previousPage}
                                        >
                                            <FaChevronLeft />
                                        </li>
                                        {customPagination?.map((user, index) => (
                                            <li
                                                className={`flex items-center justify-center w-[36px] text-black rounded-[6px] h-[34px] border-[1px] border-solid bg-[#FFFFFF] cursor-pointer ${currentPage == index
                                                    ? " border-sky-500"
                                                    : "border-[#E4E4EB] "
                                                    }`}
                                                onClick={() => changePage(index)}
                                                key={index}
                                            >
                                                {index + 1}
                                            </li>
                                        ))}
                                        <li
                                            className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage == totalPage - 1
                                                ? "bg-[#cccccc] text-black pointer-events-none"
                                                : " cursor-pointer"
                                                }`}
                                            onClick={nextPage}
                                        >
                                            <FaChevronRight />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

};
export default AllOrders;