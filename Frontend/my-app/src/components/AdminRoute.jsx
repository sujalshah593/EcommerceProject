import { Navigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext.jsx';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("ADMIN ROUTE CHECK:", { user, loading });

  if (loading) return <div>Checking admin...</div>;

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default AdminRoute;