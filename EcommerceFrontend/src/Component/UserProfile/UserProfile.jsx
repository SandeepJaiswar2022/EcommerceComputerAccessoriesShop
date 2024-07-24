import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const jwtToken = localStorage.getItem(`jwtToken`);
    const auth = useSelector(store => store.auth)
    const navigateTo = useNavigate();
   
    return (
        <div className='bg-indigo-500 text-xl text-center font-bold'>
            Will be Implemented Soon
        </div>
    )
}

export default UserProfile
