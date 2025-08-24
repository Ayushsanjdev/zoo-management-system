import React, { lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Layout from "./components/layout/Layout"; // New layout component

const LoginView = lazy(() => import("./pages/Login"));
const DashboardView = lazy(() => import("./pages/Dashboard"));
const StaffManagementView = lazy(() => import("./pages/StaffManagement"));
const AnimalManagementView = lazy(() => import("./pages/AnimalManagement"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<RedirectRoot />} />

          {/* Public routes - no layout */}
          <Route
            path='/login'
            element={
              <PublicRoute>
                <LoginView />
              </PublicRoute>
            }
          />

          {/* Protected routes - with layout */}
          <Route
            path='/*'
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path='/dashboard' element={<DashboardView />} />
                    <Route path='/staff' element={<StaffManagementView />} />
                    <Route path='/animals' element={<AnimalManagementView />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

function RedirectRoot() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? (
    <Navigate to='/dashboard' replace />
  ) : (
    <Navigate to='/login' replace />
  );
}
