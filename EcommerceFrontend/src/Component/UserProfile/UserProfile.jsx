import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


function UserProfile() {

    return (
        <div className='bg-indigo-100 text-xl text-center font-bold'>
            <div className="flex space-y-5 flex-col items-center justify-center sm:flex">
                <h1 className="text-center font-extrabold text-2xl">Go To My Orders</h1>
                <div className="rounded-md shadow">
                    <Link
                        to={`/myorders`}
                        className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base rounded-md font-bold text-white btn-bg-color btn-bg-color-hover md:py-4 md:text-lg md:px-10"
                    >
                        My Orders
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default UserProfile
