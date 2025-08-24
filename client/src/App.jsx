import React, { lazy, Suspense } from "react";
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
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner";
import RouterErrorBoundary from "./components/common/RouterErrorBoundary";

const LoginView = lazy(() => import("./pages/Login"));
const DashboardView = lazy(() => import("./pages/Dashboard"));
const StaffManagementView = lazy(() => import("./pages/StaffManagement"));
const AnimalManagementView = lazy(() => import("./pages/AnimalManagement"));
const NotFoundView = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <RouterErrorBoundary>
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
                          <Route
                            path='/dashboard'
                            element={<DashboardView />}
                          />
                          <Route
                            path='/staff'
                            element={<StaffManagementView />}
                          />
                          <Route
                            path='/animals'
                            element={<AnimalManagementView />}
                          />
                          {/* Catch-all route for 404 - must be last */}
                          <Route path='*' element={<NotFoundView />} />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />

                {/* Public 404 route - outside protected routes */}
                <Route path='*' element={<NotFoundView />} />
              </Routes>
            </RouterErrorBoundary>
          </Suspense>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
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
