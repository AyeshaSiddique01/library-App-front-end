import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CircularIndeterminate from "../Components/Common/Spinner";

const Librarians = lazy(() => import("../pages/Admin/Librarians"));
const Authors = lazy(() => import("../pages/Librarian/Authors"));
const ProtectedRoute = lazy(() => import("./ProtectedRoutes"));
const Signup = lazy(() => import("../pages/User/Signup"));
const BookDetails = lazy(() => import("../Components/Common/BookDetails"));
const Footer = lazy(() => import("../Components/Common/Footer"));
const Login = lazy(() => import("../pages/Common/Login"));
const UpdatePassword = lazy(() => import("../pages/Common/UpdatePassword"));
const Home = lazy(() => import("../pages/Common/Home"));
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
      <Route
        path="/authors"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute>
              <Authors />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/librarians"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute>
              <Librarians />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path="/book_details"
        element={
          <Suspense fallback={<CircularIndeterminate />}>
            <ProtectedRoute>
              <BookDetails />
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
