// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdCategory } from 'react-icons/md';

import { FaTachometerAlt, FaBox, FaTags, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

function Sidebar() {
    const activeStyle = { backgroundColor: 'bg-orange-400' };
    return (
        <div className="w-48 min-h-screen bg-gray-900 text-white">
            <div className="p-4 text-center font-bold text-lg">Admin Panel</div>
            <hr />
            <nav className="mt-6">
                <ul>
                    <li>
                        <NavLink
                            to="/admin/dashboard"
                            className={`hover:bg-yellow-500 hover:scale-10  flex items-center p-4 space-x-3 transition-colors duration-500`}
                        >
                            <FaTachometerAlt className="text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black">
                        <NavLink
                            to="/admin/products"
                            className={`flex hover:bg-yellow-400 items-center p-4 space-x-3 transition-colors duration-200`}
                        >
                            <FaBox className="text-xl" />
                            <span>Products</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black">
                        <NavLink
                            to="/admin/orderhistory"
                            className="flex hover:bg-yellow-400 items-center p-4 space-x-3 transition-colors duration-200"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <FaTags className="text-xl" />
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black ">
                        <NavLink
                            to="/admin/category"
                            className="flex hover:bg-yellow-400 items-center p-4 space-x-3 transition-colors duration-200"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <MdCategory className="text-xl" />
                            <span>Categories</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black ">
                        <NavLink
                            to="/admin/customers"
                            className="flex hover:bg-yellow-400 items-center p-4 space-x-3 transition-colors duration-200"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <FaUsers className="text-xl" />
                            <span>Customers</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black ">
                        <NavLink
                            to="/admin/report"
                            className="flex hover:bg-yellow-400 items-center p-4 space-x-3 transition-colors duration-200"
                        >
                            <FaChartLine className="text-xl" />
                            <span>Reports</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
