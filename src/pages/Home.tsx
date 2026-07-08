import HeaderBanner from "../components/HeaderBanner";
import SearchSection from "../components/SearchSection";
import TopPriceDrops from "../components/TopPriceDrops";
import HowItWorks from "../components/HowItWorks";
import Newsletter from "../components/Newsletter";
import "../assets/css/home.css";

const HomePage = () => {
  return (
    <>
      <HeaderBanner />
      <SearchSection />
      <TopPriceDrops />
      <HowItWorks />
      <Newsletter />
    </>
  );
};

export default HomePage;