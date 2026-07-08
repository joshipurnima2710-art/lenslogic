import { Search } from "lucide-react";

const SearchSection = () => {
  return (
    <section className="search-section">
      <div className="container">
        <div className="search-card">

          <h2 className="search-title">
            Search over 50,000+ camera lenses
          </h2>

          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search Sony, Canon, Sigma, Nikon..."
            />

            <button className="search-btn">
              <Search size={22} />
            </button>
          </div>

          <div className="popular-searches">
            <span className="popular-tag">Sony 24-70 GM II</span>
            <span className="popular-tag">Canon RF 70-200</span>
            <span className="popular-tag">Sigma 35mm Art</span>
            <span className="popular-tag">Tamron 28-75 G2</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SearchSection;