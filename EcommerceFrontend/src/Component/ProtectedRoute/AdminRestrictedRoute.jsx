import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRestrictedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (auth?.role === 'ADMIN') {
        return <Navigate to={`/admin/dashboard`} />
    }

    return children;
};

export default AdminRestrictedRoute
