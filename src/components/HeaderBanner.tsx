import bannerImage from "../assets/images/banner.png";

const HeaderBanner = () => {
  return (
    <div className="lm-banner">
      <img
        src={bannerImage}
        alt="LensMarket Banner"
      />
    </div>
  );
};

export default HeaderBanner;