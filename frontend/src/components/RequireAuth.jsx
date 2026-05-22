import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ roles, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const allowedRoles = roles ? roles.map((item) => item.toLowerCase()) : null;
  const roleMatches = allowedRoles
    ? (user?.rolesList || [])
        .map((item) => item.toLowerCase())
        .some((item) => allowedRoles.includes(item))
    : true;
  const hasFlagMatch = allowedRoles
    ? (allowedRoles.includes('admin') && user?.isAdmin) ||
      (allowedRoles.includes('vendor') && user?.isVendor)
    : true;

  if (allowedRoles && !roleMatches && !hasFlagMatch) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
