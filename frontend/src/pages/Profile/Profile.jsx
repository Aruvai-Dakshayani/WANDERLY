import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../store/slices/authSlice";

import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Heart,
  ArrowRight,
  LogOut,
  Plane,
} from "lucide-react";

import api from "../../api/api";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [wishlist, setWishlist] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const [wishlistResponse, bookingsResponse] = await Promise.all([
          api.get("/wishlist/"),
          api.get("/bookings/"),
        ]);

        setWishlist(wishlistResponse.data);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Failed to load profile data:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          dispatch(logout());
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    dispatch(logout());

    navigate("/login");
  };

  const userName =
    user?.name ||
    user?.username ||
    "Wanderly Traveler";

  const userEmail =
    user?.email ||
    "traveler@wanderly.com";

  return (
    <main className="profile-page">

      {/* =====================================
          PROFILE HERO
      ===================================== */}

      <section className="profile-hero">

        <div className="profile-hero-icon">
          <User size={42} />
        </div>

        <div className="profile-hero-content">

          <span className="profile-label">
            MY ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            Manage your personal information, bookings
            and travel preferences.
          </p>

        </div>

      </section>


      {/* =====================================
          PROFILE CONTENT
      ===================================== */}

      <section className="profile-container">

        {loading ? (
          <div className="profile-loading">
            <h2>Loading your profile...</h2>
            <p>Please wait while we load your travel information.</p>
          </div>
        ) : (

          <div className="profile-grid">

            {/* =================================
                PERSONAL INFORMATION
            ================================= */}

            <div className="profile-card personal-card">

              <div className="profile-user-header">

                <div className="profile-user-icon">
                  <User size={30} />
                </div>

                <div>

                  <h2>{userName}</h2>

                  <p>
                    Explore. Travel. Experience.
                  </p>

                </div>

              </div>

              <div className="profile-divider"></div>

              <h3 className="personal-title">
                Personal Information
              </h3>


              {/* NAME */}

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  <User size={18} />
                </div>

                <div>

                  <span>Full Name</span>

                  <strong>{userName}</strong>

                </div>

              </div>


              {/* EMAIL */}

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  <Mail size={18} />
                </div>

                <div>

                  <span>Email Address</span>

                  <strong>{userEmail}</strong>

                </div>

              </div>


              {/* PHONE */}

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  <Phone size={18} />
                </div>

                <div>

                  <span>Phone Number</span>

                  <strong>Not added</strong>

                </div>

              </div>


              {/* LOCATION */}

              <div className="profile-info-row">

                <div className="profile-info-icon">
                  <MapPin size={18} />
                </div>

                <div>

                  <span>Location</span>

                  <strong>Not added</strong>

                </div>

              </div>

            </div>


            {/* =================================
                RIGHT SIDE
            ================================= */}

            <div className="profile-right">

              {/* STATISTICS */}

              <div className="profile-stats">


                {/* BOOKINGS */}

                <div className="profile-stat-card">

                  <div className="profile-stat-icon">
                    <CalendarDays size={23} />
                  </div>

                  <div>

                    <strong>
                      {bookings.length}
                    </strong>

                    <span>
                      Total
                      <br />
                      Bookings
                    </span>

                  </div>

                </div>


                {/* WISHLIST */}

                <div className="profile-stat-card">

                  <div className="profile-stat-icon">
                    <Heart size={23} />
                  </div>

                  <div>

                    <strong>
                      {wishlist.length}
                    </strong>

                    <span>
                      Saved
                      <br />
                      Places
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================
                  QUICK ACTIONS
              ================================= */}

              <div className="quick-actions-card">

                <span className="quick-actions-label">
                  TRAVEL MANAGEMENT
                </span>

                <h2>Quick Actions</h2>


                {/* BOOKINGS */}

                <Link
                  to="/bookings"
                  className="quick-action"
                >

                  <div className="quick-action-left">

                    <div className="quick-action-icon">
                      <CalendarDays size={20} />
                    </div>

                    <div>

                      <strong>
                        My Bookings
                      </strong>

                      <span>
                        View and manage your trips
                      </span>

                    </div>

                  </div>

                  <ArrowRight size={20} />

                </Link>


                {/* WISHLIST */}

                <Link
                  to="/wishlist"
                  className="quick-action"
                >

                  <div className="quick-action-left">

                    <div className="quick-action-icon">
                      <Heart size={20} />
                    </div>

                    <div>

                      <strong>
                        My Wishlist
                      </strong>

                      <span>
                        View your saved destinations
                      </span>

                    </div>

                  </div>

                  <ArrowRight size={20} />

                </Link>


                {/* DESTINATIONS */}

                <Link
                  to="/destinations"
                  className="quick-action"
                >

                  <div className="quick-action-left">

                    <div className="quick-action-icon">
                      <Plane size={20} />
                    </div>

                    <div>

                      <strong>
                        Explore Destinations
                      </strong>

                      <span>
                        Discover your next adventure
                      </span>

                    </div>

                  </div>

                  <ArrowRight size={20} />

                </Link>


                {/* LOGOUT */}

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >

                  <LogOut size={19} />

                  Logout

                </button>

              </div>

            </div>

          </div>

        )}

      </section>

    </main>
  );
}

export default Profile;