import {
  Map,
  ShieldCheck,
  Heart,
  Users,
  Sparkles,
  Globe,
} from "lucide-react";

import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">
            <Sparkles size={18} />
            Discover. Explore. Wander.
          </span>

          <h1>
            Travel More.
            <br />
            <span>Experience More.</span>
          </h1>

          <p>
            Wanderly makes it simple to discover beautiful
            destinations, explore travel packages, and plan
            unforgettable journeys.
          </p>
        </div>
      </section>

      {/* About Wanderly */}
      <section className="about-intro">
        <div className="about-intro-content">

          <div className="about-section-label">
            ABOUT WANDERLY
          </div>

          <h2>
            Your journey starts with
            <span> Wanderly.</span>
          </h2>

          <p>
            Wanderly is a modern travel platform designed to
            help travelers discover amazing destinations and
            plan their perfect trips with ease.
          </p>

          <p>
            From relaxing beaches and peaceful backwaters to
            adventurous mountains and historic cities, Wanderly
            brings exciting travel experiences together in one
            place.
          </p>

        </div>

        <div className="about-intro-card">
          <Globe size={42} />

          <h3>Explore the World</h3>

          <p>
            Discover new places, create beautiful memories,
            and make every journey special.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="about-features">

        <div className="about-section-heading">
          <span>WHY WANDERLY</span>

          <h2>
            Everything you need for
            <br />
            your next adventure
          </h2>
        </div>

        <div className="about-feature-grid">

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Map size={28} />
            </div>

            <h3>Discover Destinations</h3>

            <p>
              Explore beautiful destinations and find the
              perfect place for your next adventure.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <ShieldCheck size={28} />
            </div>

            <h3>Easy & Secure</h3>

            <p>
              Enjoy a simple and secure travel planning
              experience from discovery to booking.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Heart size={28} />
            </div>

            <h3>Save Your Favorites</h3>

            <p>
              Add your favorite destinations to your wishlist
              and keep your travel ideas organized.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">
              <Users size={28} />
            </div>

            <h3>Made for Travelers</h3>

            <p>
              Wanderly is designed to make travel planning
              easier, faster, and more enjoyable.
            </p>
          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">

        <div className="about-mission-content">

          <span>OUR MISSION</span>

          <h2>
            Making every journey
            <br />
            <strong>worth remembering.</strong>
          </h2>

          <p>
            We believe travel is more than visiting a place.
            It's about discovering new experiences, meeting
            new people, and creating memories that last a
            lifetime.
          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="about-cta">

        <h2>
          Ready to start your journey?
        </h2>

        <p>
          Discover your next destination with Wanderly.
        </p>

        <a href="/destinations">
          Explore Destinations
        </a>

      </section>

    </main>
  );
}

export default About;