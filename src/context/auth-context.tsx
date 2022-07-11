import React, { useMemo, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { User } from '../interfaces/user';

export const AuthContext = React.createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signin = (_user: User, callback: VoidFunction) => {
    setUser(_user);
    callback();
  };

  const signout = () => {
    setUser(null);
    return <Navigate to="/login" replace />;
  };

  const value = useMemo(() => ({ user, signin, signout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth() {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

interface AuthContextType {
  user: User | null;
  signin: (user: User, callback: VoidFunction) => void;
  signout: () => void;
}
