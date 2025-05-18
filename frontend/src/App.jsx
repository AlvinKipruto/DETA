import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import SalesPage from './screens/SalesPage';
import PurchasesScreen from './screens/PurchasesScreen'; // ✅ New

const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <LoginScreen />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={<SignupScreen />} />

        <Route path="/home" element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        } />

        <Route path="/inventory" element={
          <ProtectedRoute>
            <InventoryScreen />
          </ProtectedRoute>
        } />

        <Route path="/sales" element={
          <ProtectedRoute>
            <SalesPage />
          </ProtectedRoute>
        } />

        <Route path="/purchases" element={
          <ProtectedRoute>
            <PurchasesScreen />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
