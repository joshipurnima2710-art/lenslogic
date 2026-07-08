const Newsletter = () => {
  return (
    <section className="home-section">
      <div className="container">

        <div className="newsletter">

          <h2 className="section-title text-center">
            Never miss a price drop
          </h2>

          <p
            className="section-subtitle text-center"
            style={{ marginBottom: "30px" }}
          >
            Get notified when prices drop on your
            favorite camera lenses.
          </p>

          <div className="newsletter-box">

            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address"
            />

            <button className="newsletter-btn">
              Subscribe
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;