import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
    const { currentUser } = useContext(AuthContext);

    if(currentUser) {
        return <Navigate to="/profile" />;
    }

  return <Outlet />;
}

export default GuestRoute