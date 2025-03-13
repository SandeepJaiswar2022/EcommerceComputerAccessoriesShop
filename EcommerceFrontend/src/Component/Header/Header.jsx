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
    const [sheetOpen, setSheetOpen] = useState(false);

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
        setIsLargeScreen(false);
        dispatch(logout());
    }

    if (auth?.user?.role === "ADMIN") {
        return <nav className="sticky top-0 bg-black shadow-md w-full z-10">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex justify-between items-center">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-indigo-500">
                    <NavLink to={`/`}>Tech Mart</NavLink>
                </div>

                <div className="hidden md:flex space-x-8">

                    <NavLink to={`/admin/dashboard`} className={({ isActive }) => (` customHover  font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Home</NavLink>
                    <NavLink to={`/admin/customers`} className={({ isActive }) => (` customHover  font-bold transition duration-300 ${isActive ? `custom` : `text-white`}`)}>Add_Admin</NavLink>
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
                <NavLink onClick={() => setIsLargeScreen(!isLargeScreen)} to={`/admin/dashboard`} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm font-medium hover:text-red-700 transition duration-500 ${isActive ? `text-red-700` : `text-white`}`)}
                >Home</NavLink>
                <NavLink onClick={() => setIsLargeScreen(!isLargeScreen)} to={`/admin/customers`} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm font-medium hover:text-red-700 transition duration-500 ${isActive ? `text-red-700` : `text-white`}`)}
                >Add_Admin</NavLink>
                <NavLink onClick={() => setIsLargeScreen(!isLargeScreen)} to={`/admin/addproduct`} className={({ isActive }) => (`block w-1/6 py-2 px-4 text-sm font-medium hover:text-red-700 transition duration-500 ${isActive ? `text-red-700` : `text-white`}`)}
                >Add_Product</NavLink>
                <NavLink onClick={handleLogout} className={` 
                ${auth.user?.firstname ? `` : `hidden`} block w-1/6 py-2 px-4 text-sm text-white hover:text-red-700 transition duration-300`}>Logout</NavLink>
                <NavLink onClick={() => setIsLargeScreen(!isLargeScreen)} to={`/myprofile`} className={({ isActive }) => (` 
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
                        <button onClick={() => setSheetOpen(true)} id="mobile-menu-button" className={`border-2 p-1 ${sheetOpen ? 'opacity-0' : ''} rounded-md focus:outline-none text-white`}>
                            <RiMenu4Fill />
                        </button>
                    </div>
                </div>
                {/* SEARCH BAR */}
                {location.pathname === '/shop' && <SearchBar />}

                {/* Overlay */}
                {/* <div
                    className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isLargeScreen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setIsLargeScreen(false)}
                /> */}

                <div
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform transition-transform duration-300 ${sheetOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="md:hidden justify-self-end">
                        <button onClick={() => setSheetOpen(false)} id="mobile-menu-button" className={`border-2 ${!sheetOpen ? `opacity-0` : ``} p-1 rounded-md focus:outline-none text-white`}>
                            <RiCloseFill />
                        </button>
                    </div>
                    {/* <div className={`${isLargeScreen ? hidden : } md:hidden}`> */}
                    <div className={`p-4 space-y-2`}>
                        <NavLink
                            to="/"
                            onClick={() => setSheetOpen(false)}
                            className={({ isActive }) =>
                                `block py-2 px-4 text-sm font-medium hover:text-red-700 transition duration-500 ${isActive ? 'text-red-700' : 'text-white'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/shop"
                            onClick={() => setSheetOpen(false)}
                            className={({ isActive }) =>
                                `block py-2 px-4 text-sm hover:text-red-700 transition duration-300 ${isActive ? 'text-red-700' : 'text-white'
                                }`
                            }
                        >
                            Shop
                        </NavLink>
                        <NavLink
                            to="/contact"
                            onClick={() => setSheetOpen(false)}
                            className={({ isActive }) =>
                                `block py-2 px-4 text-sm hover:text-red-700 transition duration-300 ${isActive ? 'text-red-700' : 'text-white'
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                        {!auth.user?.firstname ? (
                            <NavLink
                                to="/signin"
                                onClick={() => setSheetOpen(false)}
                                className={({ isActive }) =>
                                    `block py-2 px-4 text-sm hover:text-red-700 transition duration-300 ${isActive ? 'text-red-700' : 'text-white'
                                    }`
                                }
                            >
                                Sign In
                            </NavLink>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setSheetOpen(false);
                                    }}
                                    className="block w-full text-left py-2 px-4 text-sm hover:text-red-700 transition duration-300"
                                >
                                    Logout
                                </button>
                                <NavLink
                                    to="/cart"
                                    onClick={() => setSheetOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 px-4 text-lg hover:text-red-700 transition duration-300 ${isActive ? 'text-red-700' : 'text-white'
                                        }`
                                    }
                                >
                                    <CartIcon />
                                </NavLink>
                                <NavLink
                                    to="/myprofile"
                                    onClick={() => setSheetOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 px-4 -mx-1 transition duration-300 ${isActive ? 'text-red-700' : 'text-white'
                                        }`
                                    }
                                >
                                    <UserAvatar username={auth.user?.firstname} />
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header
