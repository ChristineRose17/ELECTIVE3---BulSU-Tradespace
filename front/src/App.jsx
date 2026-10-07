import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import CreatePost from './pages/CreatePost';
import MyListings from './pages/MyListings';
import MyClaims from './pages/MyClaims';
import Profile from './pages/Profile';

// Redirects unauthenticated guests to /marketplace instead of a blank or broken page.
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
      <Route element={<AppLayout />}>
        {/* Public — guests may browse */}
        <Route path="/marketplace" element={<Marketplace />} />
        {/* Protected — requires a logged-in session */}
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
