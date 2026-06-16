import FilterMenu from "../components/FilterMenu";
import DynamicFilters from "../components/DynamicFilters";
import ProductCard from "../components/ProductCard";

const Dashboard = () => {

  return (

    <div className="space-y-6">

      <FilterMenu />

      <DynamicFilters />

      <ProductCard />

    </div>

  );

};

export default Dashboard;