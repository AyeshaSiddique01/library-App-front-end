import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Footer = lazy(() => import("../Components/User/Footer"));
const ProtectedRoute = lazy(() => import("./ProtectedRoutes"));
const Login = lazy(() => import("../pages/User/Login"));
const Signup = lazy(() => import("../pages/User/Signup"));
const UpdatePassword = lazy(() => import("../pages/User/UpdatePassword"));

const Home = lazy(() => import("../pages/User/Home"));
const Books = lazy(() => import("../pages/User/Books"));
const RequestedBooks = lazy(() => import("../pages/User/RequestedBooks"));
const Tickets = lazy(() => import("../pages/User/Tickets"));

const Routing = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute isProtected={false}>
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute isProtected={false}>
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/update_password"
        element={
          <ProtectedRoute isProtected={false}>
            <Suspense fallback={<div>Loading...</div>}>
              <UpdatePassword />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Books />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/requested_books"
        element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <RequestedBooks />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <Tickets />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
    <Suspense fallback={<div>Loading...</div>}>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </Suspense>
  </Router>
);

export default Routing;
