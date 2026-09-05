import {
  Heart,
  Menu,
  Search,
  User,
  LogOut,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useState } from "react";

import { logout } from "../../store/slices/authSlice";

import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = useSelector(
    (state) => state.auth.user
  );

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const userName =
    user?.username ||
    user?.name ||
    "Traveler";

  const handleLogout = () => {
    dispatch(logout());

    setMobileMenuOpen(false);

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) {
      alert("Please enter a destination to search.");
      return;
    }

    navigate(
      `/destinations?search=${encodeURIComponent(query)}`
    );

    setSearchOpen(false);
    setSearchText("");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
        >
          <span className="logo-icon">
            ✈️
          </span>

          <span>
            Wanderly
          </span>
        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/destinations">
            Destinations
          </Link>

          <Link to="/packages">
            Packages
          </Link>

          <Link to="/about">
            About
          </Link>

        </nav>


        {/* ACTIONS */}

        <div className="navbar-actions">

          {/* SEARCH */}

          {searchOpen && (
            <form
              className="navbar-search"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                autoFocus
              />

              <button type="submit">
                <Search size={18} />
              </button>
            </form>
          )}


          <button
            className="icon-button"
            aria-label="Search"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
          >
            {searchOpen ? (
              <X size={20} />
            ) : (
              <Search size={20} />
            )}
          </button>


          {/* LOGGED-IN ACTIONS */}

          {isLoggedIn && user && (
            <>

              <Link
                to="/wishlist"
                className="icon-button"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>


              <Link
                to="/profile"
                className="icon-button"
                aria-label="Profile"
              >
                <User size={20} />
              </Link>


              <Link
                to="/profile"
                className="navbar-user"
              >
                <span className="navbar-user-name">
                  {userName}
                </span>
              </Link>


              <button
                className="logout-navbar-button"
                onClick={handleLogout}
              >
                <LogOut size={17} />

                <span>
                  Logout
                </span>
              </button>

            </>
          )}


          {/* LOGIN */}

          {!isLoggedIn && (
            <Link
              to="/login"
              className="login-button"
            >
              Login
            </Link>
          )}


          {/* MOBILE MENU BUTTON */}

          <button
            className="menu-button"
            aria-label="Open menu"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

      </div>


      {/* MOBILE MENU */}

      {mobileMenuOpen && (
        <div className="mobile-menu">

          <Link
            to="/"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/destinations"
            onClick={closeMobileMenu}
          >
            Destinations
          </Link>

          <Link
            to="/packages"
            onClick={closeMobileMenu}
          >
            Packages
          </Link>

          <Link
            to="/about"
            onClick={closeMobileMenu}
          >
            About
          </Link>


          {isLoggedIn && user && (
            <>

              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
              >
                ❤️ Wishlist
              </Link>

              <Link
                to="/profile"
                onClick={closeMobileMenu}
              >
                👤 Profile
              </Link>

              <button
                className="mobile-logout"
                onClick={handleLogout}
              >
                <LogOut size={17} />

                Logout
              </button>

            </>
          )}


          {!isLoggedIn && (
            <Link
              to="/login"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          )}

        </div>
      )}

    </header>
  );
}

export default Navbar;