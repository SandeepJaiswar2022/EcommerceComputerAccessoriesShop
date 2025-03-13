import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const AdminRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);


    if (auth?.role === 'ADMIN') {
        // return <Navigate to={`/`} />;
        return children;
    }

    return <Navigate to={`/`} />;

};

export default AdminRoute;
