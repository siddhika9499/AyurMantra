import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

// Layouts
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

// Pages
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DoctorDashboard from '../pages/Dashboard/DoctorDashboard';
import PatientDashboard from '../pages/Dashboard/PatientDashboard';
import PrakritiQuestionnaire from '../pages/Prakriti/PrakritiQuestionnaire';
import FoodTracking from '../pages/FoodTracking/FoodTracking';
import DietPlan from '../pages/DietPlan/DietPlan';
import Profile from '../pages/Profile/Profile';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Doctor */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Patient */}
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Common Protected Routes */}
        <Route
          path="/prakriti-questionnaire"
          element={
            <ProtectedRoute>
              <PrakritiQuestionnaire />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-tracking"
          element={
            <ProtectedRoute>
              <FoodTracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diet-plan"
          element={
            <ProtectedRoute>
              <DietPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
