// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaTags, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

function Sidebar() {
    const activeStyle = { backgroundColor: '#000000' };
    return (
        <div className="w-48 h-full bg-gray-900 text-white">
            <div className="p-4 text-center font-bold text-lg">Admin Panel</div>
            <nav className="mt-6">
                <ul>
                    <li>
                        <NavLink
                            to="/admin/dashboard"
                            className="hover:bg-black hover:scale-105 flex items-center p-4 space-x-3 transition-colors duration-500"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <FaTachometerAlt className="text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black hover:scale-105">
                        <NavLink
                            to="/admin/products"
                            className="flex items-center p-4 space-x-3 transition-colors duration-200"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <FaBox className="text-xl" />
                            <span>Products</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black hover:scale-105">
                        <NavLink
                            to="/admin/categories"
                            className="flex items-center p-4 space-x-3 transition-colors duration-200"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <FaTags className="text-xl" />
                            <span>Categories</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black hover:scale-105">
                        <NavLink
                            to="/admin/customers"
                            className="flex items-center p-4 space-x-3 transition-colors duration-200"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <FaUsers className="text-xl" />
                            <span>Customers</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black hover:scale-105">
                        <NavLink
                            to="/admin/dashboard"
                            className="flex items-center p-4 space-x-3 transition-colors duration-200"
                        >
                            <FaChartLine className="text-xl" />
                            <span>Reports</span>
                        </NavLink>
                    </li>
                    <li className="hover:bg-black hover:scale-105">
                        <NavLink
                            to="/admin/settings"
                            className="flex items-center p-4 space-x-3 transition-colors duration-200"
                            style={({ isActive }) => (isActive ? activeStyle : undefined)}
                        >
                            <FaCog className="text-xl" />
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
