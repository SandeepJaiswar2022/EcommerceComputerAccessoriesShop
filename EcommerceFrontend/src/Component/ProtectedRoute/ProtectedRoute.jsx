import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (auth?.role === 'ADMIN') {
        return <Navigate to={`/admin/dashboard`} />
    }
    if (auth?.jwtToken) {
        console.log("Role : ", auth?.role);

        return <Navigate to={`/`} />
    }


    return children;
};

export default ProtectedRoute;
