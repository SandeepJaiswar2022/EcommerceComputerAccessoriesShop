import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRouteLoggedInOnly = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (!auth?.jwtToken) {
        return <Navigate to={`/signin`} />
    }
    if (auth?.user?.role === 'ADMIN') {
        return <Navigate to={`/admin/dashboard`} />
    }
    return children;
};

export default ProtectedRouteLoggedInOnly;
