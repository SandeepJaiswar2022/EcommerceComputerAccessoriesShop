import React, { useEffect } from 'react'
import { Footer, Header } from './Component'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
