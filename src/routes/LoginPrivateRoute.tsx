import { Outlet, Navigate } from 'react-router-dom';

import { useAuthStore } from '../store/useAuthStore';

export const LoginPrivateRoute = () => {
  const { isLogged } = useAuthStore();

  if (isLogged) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
