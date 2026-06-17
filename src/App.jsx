import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

/*
  Pages
  ─────────────────────────────────────────────
  Core views of the application.
  These represent the main user flow:
  Home → Auth → Create Vibe → Environment → Saved Vibes
*/
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateVibe from "./pages/CreateVibe";
import Environment from "./pages/Environment";
import SavedVibes from "./pages/SavedVibes";

/*
  ─────────────────────────────────────────────
  MAIN APPLICATION ROUTER
  ─────────────────────────────────────────────
  Defines all routes in the ENVibe application.

  Includes:
  - Public routes (no authentication required)
  - Protected routes (authentication required)
  - Catch-all redirect for invalid URLs
*/

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ─────────────────────────────
            PUBLIC ROUTES
            Accessible without login
        ───────────────────────────── */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Environment page is public because it uses route state,
            but only reachable through app flow */}
        <Route path="/environment" element={<Environment />} />

        {/* ─────────────────────────────
            PROTECTED ROUTES
            Requires authenticated user
        ───────────────────────────── */}

        <Route
          path="/create-vibe"
          element={
            <ProtectedRoute>
              <CreateVibe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-vibes"
          element={
            <ProtectedRoute>
              <SavedVibes />
            </ProtectedRoute>
          }
        />

        {/* ─────────────────────────────
            FALLBACK ROUTE
            Redirects unknown URLs to Home
        ───────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}