import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { login } from "../../store/slices/authSlice";
import api from "../../api/api";

import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending login request...");
      console.log("Email:", cleanEmail);

      const response = await api.post("/login/", {
        email: cleanEmail,
        password: password,
      });

      console.log("Login response:", response.data);

      const { access, refresh, user } = response.data;

      if (!access || !refresh || !user) {
        alert("Login response is incomplete.");
        return;
      }

      // Save JWT tokens
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Save user information in Redux
      dispatch(
        login({
          id: user.id,
          name: user.username,
          email: user.email,
        })
      );

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      if (error.response) {
        if (error.response.data?.error) {
          alert(error.response.data.error);
        } else {
          alert(
            `Login failed. Server returned ${error.response.status}.`
          );
        }
      } else {
        alert(
          "Cannot connect to Django server. Please make sure Django is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">

      <section className="login-container">

        <div className="login-card">

          <div className="login-header">

            <div className="login-logo">
              ✈️
            </div>

            <span className="login-label">
              WELCOME BACK
            </span>

            <h1>Login to Wanderly</h1>

            <p>
              Continue your journey and explore amazing
              destinations.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="login-form"
          >

            {/* EMAIL */}

            <div className="login-form-group">

              <label htmlFor="email">
                <Mail size={17} />
                Email Address
              </label>

              <div className="login-input-wrapper">

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <label htmlFor="password">
                <Lock size={17} />
                Password
              </label>

              <div className="login-input-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/* REGISTER */}

          <div className="login-register">

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Create an account
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;