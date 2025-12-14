import { Navigate } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import useRole from '../hooks/useRole';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';

const EmployeeRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { role, loading: isRoleLoading } = useRole(user?.email);

  if (isRoleLoading) return <LoadingSpinner />;
  if (role === 'employee') return children;
  return <Navigate to='/' replace={true} />;
};

export default EmployeeRoute;
