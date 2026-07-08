import { popularLenses } from "../data/homeData";

const PopularLenses = () => {
  return (
    <section className="home-section">
      <div className="container">

        <h2 className="section-title">
          Popular Lenses
        </h2>

        <div className="product-grid">

          {popularLenses.map((lens) => (
            <div className="product-card" key={lens.id}>
              <img
                src={lens.image}
                alt={lens.name}
                className="product-image"
              />

              <h3 className="product-title">
                {lens.name}
              </h3>

              <h2 className="product-price">
                From {lens.price}
              </h2>

              <button className="compare-btn">
                Compare Prices
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default PopularLenses;