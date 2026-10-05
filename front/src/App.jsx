import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import CreatePost from './pages/CreatePost';
import MyListings from './pages/MyListings';
import MyClaims from './pages/MyClaims';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<AppLayout />}>
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create-listing" element={<CreatePost />} />
        <Route path="/create-post" element={<Navigate to="/create-listing" replace />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/my-claims" element={<MyClaims />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
