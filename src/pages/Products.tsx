import { useState } from "react";
import FilterMenu from "../components/FilterMenu";
import DynamicFilters from "../components/DynamicFilters";
import ProductCard from "../components/ProductCard";
import SortDropdown from "../components/SortBar";

const Products = () => {
  const [sort, setSort] = useState("popularity");

  return (
    <div className="space-y-8">

      <section className="bg-white shadow-sm p-6">
        <FilterMenu />

        <div className="mt-6">
          <DynamicFilters />
        </div>

        {/* Sort Section */}
        <div className="mt-6 flex justify-end">
          <SortDropdown
            value={sort}
            onChange={setSort}
          />
        </div>

        <div className="mt-8">
          <ProductCard />
        </div>
      </section>
    </div>
  );
};

export default Products;