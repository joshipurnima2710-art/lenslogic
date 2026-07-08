import { topPriceDrops } from "../data/homeData";

const TopPriceDrops = () => {
  return (
    <section className="home-section">
      <div className="container">

        <h2 className="section-title">
          Top Price Drops
        </h2>

        <div className="product-grid">
          {topPriceDrops.map((item) => (
            <div className="product-card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />

              <h3 className="product-title">
                {item.name}
              </h3>

              <p className="price-drop">
                ↓ {item.drop} Price Drop
              </p>

              <h2 className="product-price">
                {item.price}
              </h2>

              <p className="product-store">
                Lowest at {item.store}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopPriceDrops;