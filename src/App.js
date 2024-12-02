import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ScannedItemsPage from './pages/ScannedItemsPage';
import ProfilePage from './pages/ProfilePage';
import ItemCategories from './pages/ItemCategories';
import ServiceAreas from './pages/ServiceAreas';
import BinsDataPage from './pages/BinsDataPage';
import EmployeesPage from './pages/EmployeesPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route 
          path="/scanned-items" 
          element={
            <ProtectedRoute>
              <ScannedItemsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/item-categories" 
          element={
            <ProtectedRoute>
              <ItemCategories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/service-areas" 
          element={
            <ProtectedRoute>
              <ServiceAreas />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bins-data" 
          element={
            <ProtectedRoute>
              <BinsDataPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employees-data" 
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
