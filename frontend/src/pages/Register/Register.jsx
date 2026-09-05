import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import api from "../../api/api";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Django User model needs a username.
      // We use the full name as the username.
      const username = name.trim().replace(/\s+/g, "_");

      const response = await api.post("/register/", {
        username: username,
        email: email,
        password: password,
      });

      console.log("Registration response:", response.data);

      alert("Account created successfully!");

      // Go to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert(
          "Registration failed. Please make sure the Django server is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-container">
        <div className="register-card">

          {/* HEADER */}

          <div className="register-header">

            <div className="register-logo">
              ✈️
            </div>

            <span className="register-label">
              JOIN WANDERLY
            </span>

            <h1>Create Your Account</h1>

            <p>
              Start your journey and discover beautiful
              destinations around the world.
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="register-form"
          >

            {/* NAME */}

            <div className="register-form-group">

              <label htmlFor="name">
                <User size={17} />
                Full Name
              </label>

              <div className="register-input-wrapper">

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

              </div>

            </div>

            {/* EMAIL */}

            <div className="register-form-group">

              <label htmlFor="register-email">
                <Mail size={17} />
                Email Address
              </label>

              <div className="register-input-wrapper">

                <input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="register-form-group">

              <label htmlFor="register-password">
                <Lock size={17} />
                Password
              </label>

              <div className="register-input-wrapper">

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="register-form-group">

              <label htmlFor="confirm-password">
                <Lock size={17} />
                Confirm Password
              </label>

              <div className="register-input-wrapper">

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* BENEFITS */}

            <div className="register-benefits">

              <div>
                <CheckCircle size={17} />
                Save your favorite destinations
              </div>

              <div>
                <CheckCircle size={17} />
                Manage your bookings
              </div>

              <div>
                <CheckCircle size={17} />
                Plan your next adventure
              </div>

            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="register-submit-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>

          </form>

          {/* LOGIN LINK */}

          <div className="register-login">

            <p>
              Already have an account?
            </p>

            <Link to="/login">
              Login to Wanderly
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Register;