import React from 'react'
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from '../Sidebar/Sidebar';
import { BiEdit } from 'react-icons/bi';
import { deleteUserIfAdmin, updateUserRole } from '../../State/Auth/AuthSlice';

function Customers() {
  const roleBgColor = {
    USER: `bg-yellow-500`,
    ADMIN: `bg-indigo-700`,
  }
  const auth = useSelector(store => store.auth);

  const [rowsLimit] = useState(4);
  const [rowsToShow, setRowsToShow] = useState();
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    if (auth?.users && auth.users.length > 0) {
      const totalPages = Math.ceil(auth.users.length / rowsLimit);
      setTotalPage(totalPages);
      setRowsToShow(auth.users.slice(0, rowsLimit));
      setCustomPagination(
        Array(Math.ceil(auth?.users.length / rowsLimit)).fill(null)
      );
    }
  }, [auth, rowsLimit]);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = auth?.users.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = auth?.users.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = auth?.users.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  // useMemo(() => {

  // }, [auth, rowsLimit]);


  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [roleRequest, setRoleRequest] = useState({
    userId: null,
    userRole: null
  });

  const [userIdToDelete, setUserId] = useState(null);


  const [currentRole, setCurrentRole] = useState(null);


  const openAlert = (userId) => {
    setShowAlert(true);
    setUserId(userId);
  }

  const handleDelete = () => {
    setShowAlert(false);
    dispatch(deleteUserIfAdmin(userIdToDelete));
  }

  // const { userId, role } = data;

  const updateRole = (e) => {
    dispatch(updateUserRole({ ...roleRequest, userRole: e.target.value }));
    setShowModal(false);
  };

  const openModal = ({ id, role }) => {
    setShowModal(true);
    setCurrentRole(role);

    setRoleRequest({
      userId: id,
      userRole: role
    })
  }



  if (auth?.loading) {
    return (
      <h1>
        Loading...
      </h1>
    )
  }
  return (
    <>
      <ToastContainer autoClose={1000} />
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 shadow-lg relative flex flex-col w-full bg-gray-200 outline-none focus:outline-none">
                <div className="flex items-start space-x-4 justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold">Update Role</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black text-center justify-center items-center flex h-8 w-8 hover:bg-gray-800 hover:text-gray-300 text-xl font-bold bg-gray-500 rounded-full">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-auto max-h-80">
                  <form className="rounded px-8 pt-6 pb-8 w-full">
                    <select name="status" onChange={updateRole} value={currentRole} className="border bg-black text-white w-full rounded p-2">
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </>
      ) : null}
      {showAlert ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-600 outline-none focus:outline-none">
                <div className="flex items-start space-x-2 justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-lg text-white font-semibold">Are you Sure? All the Data(Order, Addresses, Cart) associated with this User will be deleted.</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowAlert(false)}
                  >
                    <span className="text-black text-center justify-center items-center flex h-8 w-8 hover:text-white hover:bg-gray-800 text-xl font-bold bg-gray-500 rounded-full">
                      X
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white bg-yellow-500 hover:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowAlert(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
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
                    <tr className="bg-purple-700">
                      <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                        ID
                      </th>
                      <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                        Profile Picture
                      </th>
                      <th className="py-3 px-3  justify-center text-white sm:text-base font-bold whitespace-nowrap">
                        Username
                      </th>
                      <th className="py-3 px-3  justify-center text-white sm:text-base font-bold whitespace-nowrap">
                        First Name
                      </th>
                      <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                        Last Name
                      </th>

                      <th className="flex items-center py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap gap-1">
                        Role
                      </th>
                      <th className="py-3 px-3 text-white sm:text-base font-bold whitespace-nowrap">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowsToShow?.map((user, index) => (
                      <tr
                        className={`${index % 2 == 0 ? "bg-[#030d15]" : "bg-[#262949]"
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
                          {user?.id}
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
                            {user?.firstname?.charAt(0).toUpperCase()}
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
                          {user?.username}
                        </td>
                        <td
                          className={`py-2 px-3 text-base  font-normal ${index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                            } whitespace-nowrap`}
                        >
                          {user?.firstname}
                        </td>
                        <td
                          className={`py-2 px-3 text-base  font-normal ${index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                            } min-w-[70px]`}
                        >
                          {user?.lastname}
                        </td>

                        <td
                          className={`py-5 px-4 text-base font-normal ${index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                            }`}
                        >
                          <div className='flex space-x-2'>
                            <span className={`${roleBgColor[user?.role]} px-2 py-1`}>{user?.role}</span>
                            <BiEdit onClick={() => openModal({ id: user?.id, role: user?.role })} className="text-3xl text-green-400 transition-transform duration-300 hover:scale-110 cursor-pointer" />
                            {/*  */}
                          </div>

                        </td>
                        <td
                          className={`py-10 flex justify-center items-center px-3 text-base space-x-4 font-normal ${index == 0
                            ? "border-t-2 border-black"
                            : index == rowsToShow?.length
                              ? "border-y"
                              : "border-t"
                            }`}
                        >
                          <button onClick={() => openAlert(user.id)} className="text-2xl text-red-600 hover:text-red-500 transform transition-transform duration-500 hover:scale-125"><FaTrashAlt /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
                <div className="text-lg">
                  Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                  {currentPage == totalPage - 1
                    ? auth?.users?.length
                    : (currentPage + 1) * rowsLimit}{" "}
                  of {auth?.users?.length} entries
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
}

export default Customers
