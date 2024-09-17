import React, { useEffect, useState } from 'react'
import { RiCloseFill, RiMenu4Fill } from 'react-icons/ri';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getUserProfile, logout } from '../../State/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import UserAvatar from '../UserAvatar/UserAvatar';
import CartIcon from '../CartIcon/CartIcon';
import { getCartItems } from '../../State/CartItem/CartItemSlice';
import SearchBar from '../SearchBar/SearchBar';



function Header() {
    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.jwtToken) {
            dispatch(getCartItems(auth.jwtToken));
        }
    }, [dispatch, auth.jwtToken]);

    const handleLogout = () => {
        dispatch(logout());
    }

    if (auth?.user?.role === "ADMIN") {
        return <nav className="sticky top-0 bg-black shadow-md w-full z-10">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex justify-between items-center">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-indigo-500">
                    <NavLink to={`/`}>Tech Mart</NavLink>
                </div>

                <div className="hidden md:flex space-x-8">

                    <NavLink to={`/shop`} className={({ isActive }) => (` customHover  font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Add_Admin</NavLink>
                    <NavLink to={`/admin/addproduct`} className={({ isActive }) => (` customHover  font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Add_Product</NavLink>

                    <Link onClick={handleLogout} className={`customHover font-bold text-white transition duration-300 ${auth.user?.firstname ? `` : `hidden`}`}>Logout</Link>


                    <NavLink to={`/myprofile`} className={({ isActive }) => (` ${auth.user?.firstname ? `` : `hidden`} bg-red-700 p-2 -m-2 rounded-lg text-lg hover:text-neutral-950 hover:bg-white transition duration-500 font-bold ${isActive ? `text-red-700` : `text-white`}`)}>ADMIN</NavLink>
                    {/*  */}
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsLargeScreen(!isLargeScreen)} id="mobile-menu-button" className="border-2 p-1 rounded-md focus:outline-none text-white">
                        {isLargeScreen ? <RiMenu4Fill /> : <RiCloseFill />}
                    </button>
                </div>
            </div>
            <div id="mobile-menu" className={`${isLargeScreen ? `hidden` : ``} md:hidden`}>
                <NavLink to={``} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm font-medium hover:text-red-700 transition duration-500 ${isActive ? `text-red-700` : `text-white`}`)}
                >Add_Admin</NavLink>
                <NavLink to={`/admin/addproduct`} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm font-medium hover:text-red-700 transition duration-500 ${isActive ? `text-red-700` : `text-white`}`)}
                >Add_Product</NavLink>
                <NavLink onClick={handleLogout} className={` 
                ${auth.user?.firstname ? `` : `hidden`} block w-1/6 py-2 px-4 text-sm text-white hover:text-red-700 transition duration-300`}>Logout</NavLink>
                <NavLink to={`/myprofile`} className={({ isActive }) => (` 
                ${auth.user?.firstname ? `` : `hidden`} block w-1/6 py-2 px-4 -mx-1 transition duration-300 ${isActive ? `text-red-700` : `text-white`}`)}><UserAvatar username={auth.user?.firstname} /></NavLink>
            </div>
        </nav >
    }


    return (
        <>
            <nav className="sticky top-0 bg-black shadow-md w-full z-10">
                <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex justify-between items-center">
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-indigo-500">
                        <NavLink to={`/`}>Tech Mart</NavLink>
                    </div>
                    {/* SEARCH BAR */}
                    {location.pathname === '/shop' && <SearchBar />}

                    <div className="hidden md:flex space-x-8">

                        <NavLink to={`/`} className={({ isActive }) => (` customHover  font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Home</NavLink>

                        <NavLink to={`/shop`} className={({ isActive }) => (` customHover  font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Shop</NavLink>

                        <NavLink to={`/contact`} className={({ isActive }) => (` customHover font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Contact Us</NavLink>

                        <NavLink to={`/signin`} className={({ isActive }) => (`${auth.user?.firstname ? `hidden` : ``} customHover font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Sign In</NavLink>

                        <Link onClick={handleLogout} className={`customHover font-bold text-white transition duration-300 ${auth.user?.firstname ? `` : `hidden`}`}>Logout</Link>

                        <NavLink to={`/cart`} className={({ isActive }) => (` ${auth.user?.firstname ? `` : `hidden`} text-2xl font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}><CartIcon /></NavLink>


                        <NavLink to={`/myprofile`} className={({ isActive }) => (` ${auth.user?.firstname ? `` : `hidden`} hover:text-red-700 -m-1 text-2xl font-bold transition duration-300 ${isActive ? `text-red-700` : `text-white`}`)}><UserAvatar username={auth.user?.firstname} /></NavLink>
                        {/*  */}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsLargeScreen(!isLargeScreen)} id="mobile-menu-button" className="border-2 p-1 rounded-md focus:outline-none text-white">
                            {isLargeScreen ? <RiMenu4Fill /> : <RiCloseFill />}
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" className={`${isLargeScreen ? `hidden` : ``} md:hidden`}>
                    <NavLink to={``} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm font-medium hover:text-red-700 transition duration-500 ${isActive ? `text-red-700` : `text-white`}`)}
                    >Home</NavLink>
                    <NavLink to={`/shop`} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm hover:text-red-700 transition duration-300 ${isActive ? `text-red-700` : `text-white`}`)}>Shop</NavLink>
                    <NavLink to={`/contact`} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm hover:text-red-700 transition duration-300 ${isActive ? `text-red-700` : `text-white`}`)}>Contact</NavLink>
                    <NavLink to={`/signin`} className={({ isActive }) => (` 
                        ${auth.user?.firstname ? `hidden` : ``} block w-1/6 py-2 px-4 text-sm hover:text-red-700 transition duration-300 ${isActive ? `text-red-700` : `text-white`}`)}>Sign In</NavLink>
                    <NavLink onClick={handleLogout} className={` 
                        ${auth.user?.firstname ? `` : `hidden`} block w-1/6 py-2 px-4 text-sm text-white hover:text-red-700 transition duration-300`}>Logout</NavLink>
                    <NavLink to={`/cart`} className={({ isActive }) => (` 
                        ${auth.user?.firstname ? `` : `hidden`} block w-1/6 py-2 px-4 text-lg hover:text-red-700 transition duration-300 ${isActive ? `text-red-700` : `text-white`}`)}><CartIcon /></NavLink>
                    <NavLink to={`/myprofile`} className={({ isActive }) => (` 
                        ${auth.user?.firstname ? `` : `hidden`} block w-1/6 py-2 px-4 -mx-1 transition duration-300 ${isActive ? `text-red-700` : `text-white`}`)}><UserAvatar username={auth.user?.firstname} /></NavLink>
                </div>
            </nav >
        </>
    )
}

export default Header
