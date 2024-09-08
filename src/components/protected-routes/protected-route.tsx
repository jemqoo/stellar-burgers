import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type TProtectedRouteType = 'auth' | 'unauth';

type ProtectedRouteProps = {
  children: React.ReactElement;
  type: TProtectedRouteType;
};

export const ProtectedRoute = ({ children, type }: ProtectedRouteProps) => {
  const { user } = useSelector((state) => state.user);

  if (type === 'auth' && !user) {
    return <Navigate to='/login' />;
  }

  if (type === 'unauth' && user) {
    return <Navigate to='/profile' />;
  }

  return children;
};
