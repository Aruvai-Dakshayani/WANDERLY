import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";

import Home from "./pages/Home/Home";
import Destinations from "./pages/Destinations/Destinations";
import DestinationDetails from "./pages/DestinationDetails/DestinationDetails";

import Packages from "./pages/Packages/Packages";
import PackageDetails from "./pages/PackageDetails/PackageDetails";

import Booking from "./pages/Booking/Booking";
import Bookings from "./pages/Bookings/Bookings";

import Wishlist from "./pages/Wishlist/Wishlist";
import Profile from "./pages/Profile/Profile";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =====================================
            PUBLIC PAGES
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/destinations"
          element={<Destinations />}
        />

        <Route
          path="/destinations/:name"
          element={<DestinationDetails />}
        />

        <Route
          path="/packages"
          element={<Packages />}
        />

        <Route
          path="/packages/:id"
          element={<PackageDetails />}
        />
        <Route path="/about" element={<About />} />


        {/* =====================================
            LOGIN / REGISTER
            ONLY FOR LOGGED-OUT USERS
        ===================================== */}

        <Route element={<PublicRoute />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Route>


        {/* =====================================
            PROTECTED PAGES
            ONLY FOR LOGGED-IN USERS
        ===================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/booking"
            element={<Booking />}
          />

          <Route
            path="/bookings"
            element={<Bookings />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;