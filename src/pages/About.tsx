import "../assets/css/about.css";
import {
  Camera,
  ShoppingBag,
  BadgeIndianRupee,
  ShieldCheck,
  Users,
  Search,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Camera size={28} />,
      title: "Detailed Specifications",
      description:
        "Compare cameras and lenses side by side with complete specifications.",
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Marketplace Prices",
      description:
        "View prices from multiple marketplaces in one place.",
    },
    {
      icon: <BadgeIndianRupee size={28} />,
      title: "Price Tracking",
      description:
        "Track price changes and find the best deals available online.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Trusted Information",
      description:
        "Accurate specifications and transparent product comparisons.",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About LensMarket</h1>
        <p>
          Compare smarter, buy better. LensMarket helps photographers and
          creators discover the right camera gear at the best price.
        </p>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="stat-card">
          <Camera size={32} />
          <h2>1000+</h2>
          <p>Products Compared</p>
        </div>

        <div className="stat-card">
          <ShoppingBag size={32} />
          <h2>10+</h2>
          <p>Marketplaces</p>
        </div>

        <div className="stat-card">
          <Users size={32} />
          <h2>5000+</h2>
          <p>Monthly Users</p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="about-content">
          <div>
            <h2>Our Mission</h2>
            <p>
              Buying cameras and lenses can be confusing with hundreds of
              specifications and constantly changing prices.
            </p>

            <p>
              LensMarket simplifies the process by bringing product details,
              specifications, comparisons, and marketplace prices together in
              one platform.
            </p>

            <p>
              Our goal is to help creators spend less time researching and more
              time creating.
            </p>
          </div>

          <div className="about-image-card">
            <Search size={80} />
            <h3>Find the perfect gear faster</h3>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="about-features">
        <h2>Why Choose LensMarket?</h2>

        <div className="feature-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Section */}
      <section className="about-bottom">
        <h2>Built for Creators</h2>
        <p>
          Whether you're buying your first camera or upgrading your professional
          setup, LensMarket helps you make informed decisions with confidence.
        </p>

        <div className="about-tagline">
          Capture Moments • Create Stories • Choose Smarter
        </div>
      </section>
    </div>
  );
};

export default About;