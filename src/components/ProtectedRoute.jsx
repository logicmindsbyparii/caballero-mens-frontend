import { Navigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useStore();
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
