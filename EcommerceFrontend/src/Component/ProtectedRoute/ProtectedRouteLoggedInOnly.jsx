import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRouteLoggedInOnly = ({ children }) => {
    const jwtToken = useSelector((state) => state.auth.jwtToken);

    if (!jwtToken) {
        return <Navigate to={`/signin`} />
    }

    return children;
};

export default ProtectedRouteLoggedInOnly;
