import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "../Components/Footer";
import ProtectedRoute from "./ProtectedRoutes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UpdatePassword from "../pages/UpdatePassword";
import Home from "../pages/Home";
import Books from "../pages/Books";
import RequestedBooks from "../pages/RequestedBooks";
import Tickets from "../pages/Tickets";

const Routing = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute isProtected={false}>
            <Signup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute isProtected={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update_password"
        element={
          <ProtectedRoute isProtected={false}>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requested_books"
        element={
          <ProtectedRoute>
            <RequestedBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        }
      />
    </Routes>
    <Footer sx={{ mt: 8, mb: 4 }} />
  </Router>
);

export default Routing;
