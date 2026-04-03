/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ComplaintPage } from './pages/ComplaintPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AnimatePresence, motion } from 'motion/react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;
  
  return <>{children}</>;
};

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50 max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
          <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
          <Route path="/complaint" element={<PageWrapper><ProtectedRoute><ComplaintPage /></ProtectedRoute></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
          <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><ProtectedRoute><ProfilePage /></ProtectedRoute></PageWrapper>} />
          <Route path="/application/:id" element={<PageWrapper><ProtectedRoute><ApplicationDetailPage /></ProtectedRoute></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminRoute><AdminDashboard /></AdminRoute></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}


