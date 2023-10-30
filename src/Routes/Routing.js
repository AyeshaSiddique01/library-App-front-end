import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CircularIndeterminate from "../Components/Common/Spinner";
const Footer = lazy(() => import("../Components/Common/Footer"));
const ProtectedRoute = lazy(() => import("./ProtectedRoutes"));
const Login = lazy(() => import("../pages/Common/Login"));
const Signup = lazy(() => import("../pages/User/Signup"));
const UpdatePassword = lazy(() => import("../pages/Common/UpdatePassword"));

const Home = lazy(() => import("../pages/User/Home"));
const Books = lazy(() => import("../pages/Common/Books"));
const RequestedBooks = lazy(() => import("../pages/Common/RequestedBooks"));
const Tickets = lazy(() => import("../pages/Common/Tickets"));

const Routing = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute isProtected={false}>
              <Signup />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute isProtected={false}>
              <Login />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/update_password"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute isProtected={false}>
              <UpdatePassword />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/books"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/requested_books"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute>
              <RequestedBooks />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/tickets"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          </Suspense>
        }
      />
    </Routes>
    <Suspense fallback={<CircularIndeterminate />}>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </Suspense>
  </Router>
);

export default Routing;
