import { Navigate, useLocation } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'
import { AuthContext } from '../providers/AuthContext'
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
   const { user, loading } = useContext(AuthContext);
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
