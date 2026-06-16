import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages (import paths may vary depending on your team's file names)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateVibe from "./pages/CreateVibe";
import SavedPlaylists from "./pages/SavedPlaylists";
import Environment from "./pages/Environment";
import SavedVibes from "./pages/SavedVibes";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/environment" element={<Environment />} />
        <Route path="/saved-vibes" element={<SavedVibes />} />


        {/* Protected routes — user must be logged in */}
        <Route
          path="/createVibe"
          element={
            <ProtectedRoute>
              <CreateVibe />
            </ProtectedRoute>
          }
        />

        <Route
             path="/saved"
          element={
             <ProtectedRoute>
            <SavedPlaylists />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
