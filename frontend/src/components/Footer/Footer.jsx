import { Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">

          <h2 className="footer-logo">
            <span>✈</span> Wanderly
          </h2>

          <p className="footer-description">
            Discover beautiful destinations, plan unforgettable
            journeys, and create memories that last a lifetime.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>

            <a href="#" aria-label="Facebook">
              Facebook
            </a>

            <a href="#" aria-label="Twitter">
              X
            </a>
          </div>

        </div>


        {/* Explore */}
        <div className="footer-column">

          <h3>Explore</h3>

          <a href="#">Destinations</a>
          <a href="#">Travel Packages</a>
          <a href="#">Popular Places</a>
          <a href="#">Travel Guides</a>

        </div>


        {/* Company */}
        <div className="footer-column">

          <h3>Company</h3>

          <a href="#">About Wanderly</a>
          <a href="#">Contact Us</a>
          <a href="#">Reviews</a>
          <a href="#">FAQ</a>

        </div>


        {/* Contact */}
        <div className="footer-column">

          <h3>Contact Us</h3>

          <div className="footer-contact">

            <MapPin size={17} />

            <span>India</span>

          </div>

          <div className="footer-contact">

            <Phone size={17} />

            <span>+91 98765 43210</span>

          </div>

          <div className="footer-contact">

            <Mail size={17} />

            <span>hello@wanderly.com</span>

          </div>

        </div>

      </div>


      {/* Footer Bottom */}

      <div className="footer-bottom">

        <p>
          © 2026 Wanderly. All rights reserved.
        </p>

        <div className="footer-bottom-links">

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Terms & Conditions
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;