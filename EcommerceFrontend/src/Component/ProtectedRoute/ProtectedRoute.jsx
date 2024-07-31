import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    // const jwtToken = useSelector((state) => state.auth.jwtToken);
    const jwtToken = localStorage.getItem(`jwtToken`);
    // console.log(jwtToken);

    if (jwtToken) {
        return <Navigate to={`/`} />
    }

    return children;
};

export default ProtectedRoute;
