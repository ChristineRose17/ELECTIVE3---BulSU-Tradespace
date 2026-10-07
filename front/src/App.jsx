import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Marketplace from './pages/Marketplace';
import CreatePost from './pages/CreatePost';
import MyListings from './pages/MyListings';
import MyClaims from './pages/MyClaims';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

/**
 * Requires the user to be logged in.
 * If not logged in → redirect to /marketplace (guest browse).
 */
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/marketplace" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Legacy route redirected to marketplace */}
      <Route path="/complete-profile" element={<Navigate to="/marketplace" replace />} />

      <Route element={<AppLayout />}>
        {/* Public — guests may browse */}
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Protected — accessible right away even with empty profile */}
        <Route path="/create-listing" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/create-post" element={<Navigate to="/create-listing" replace />} />
        <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
        <Route path="/my-claims" element={<ProtectedRoute><MyClaims /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
