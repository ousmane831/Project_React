import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

import Login from './pages/Login';
import Home from './pages/Home';
import Owners from './pages/Owners';
import Patients from './pages/Patients';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }
    />
    <Route
      path="/owners"
      element={
        <PrivateRoute>
          <Owners />
        </PrivateRoute>
      }
    />
    <Route
      path="/patients"
      element={
        <PrivateRoute>
          <Patients />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
