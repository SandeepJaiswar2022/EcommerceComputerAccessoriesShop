import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import ProductTable from './ProductTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AllProducts() {
    const product = useSelector(store => store.product);

    return (
        <>
            {/* <ToastContainer autoClose={1000} /> */}

            <div className="grid grid-cols-6 space-x-1 gap-4 p-4">
                {/* First Grid (1 column) */}
                <div className="col-span-1 bg-black">
                    <div className="text-white"><Sidebar /></div>
                </div>

                {/* Second Grid (3 columns) */}
                <div className="col-span-5 text-white text-center grid gap-4">
                    <ProductTable />
                </div>
            </div>
        </>
    );
}

export default AllProducts
