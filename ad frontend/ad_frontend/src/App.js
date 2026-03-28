import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageAdsPage from './pages/admin/ManageAdsPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import TheaterDashboardPage from './pages/theater/TheaterDashboardPage';
import AddTheaterPage from './pages/theater/AddTheaterPage';
import ViewTheatersPage from './pages/theater/ViewTheatersPage';
import ViewAdsPage from './pages/theater/ViewAdsPage';
import BookAdPage from './pages/theater/BookAdPage';
import MyBookingsPage from './pages/theater/MyBookingsPage';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ads"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageAdsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageUsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/theater-dashboard"
            element={
              <ProtectedRoute allowedRoles={['theater_owner']}>
                <TheaterDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theater/add"
            element={
              <ProtectedRoute allowedRoles={['theater_owner']}>
                <AddTheaterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theater/list"
            element={
              <ProtectedRoute allowedRoles={['theater_owner']}>
                <ViewTheatersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theater/ads"
            element={
              <ProtectedRoute allowedRoles={['theater_owner']}>
                <ViewAdsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theater/book"
            element={
              <ProtectedRoute allowedRoles={['theater_owner']}>
                <BookAdPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theater/bookings"
            element={
              <ProtectedRoute allowedRoles={['theater_owner']}>
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/dashboard" element={<Navigate to="/admin-dashboard" replace />} />
          <Route path="/theater/dashboard" element={<Navigate to="/theater-dashboard" replace />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
