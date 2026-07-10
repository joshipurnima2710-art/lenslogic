import { useEffect } from "react";

import FilterMenu from "../components/FilterMenu";
import DynamicFilters from "../components/DynamicFilters";
import ProductCard from "../components/ProductCard";
import SortDropdown from "../components/SortBar";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import {
  fetchProducts
} from "../features/products/productSlice";

import {
  setSortBy
} from "../features/products/productSlice";


const Products = () => {


  const dispatch = useAppDispatch();


  const {
    sortBy
  } = useAppSelector(
    state => state.products
  );


  const {
    productType,
    selectedFilters
  } = useAppSelector(
    state => state.filters
  );



  useEffect(()=>{


    const params = {

      product_type: productType,

      brand_id:
        selectedFilters.brand_id,

      camera_type:
        selectedFilters.camera_type,

      lens_type:
        selectedFilters.lens_type,

      mount_type:
        selectedFilters.mount_type,

      sensor_type:
        selectedFilters.sensor_type,


      // SORT PARAM
      ordering: sortBy

    };


    dispatch(
      fetchProducts({

        params,

        page:1

      })
    );


  },[
    productType,
    selectedFilters,
    sortBy,
    dispatch
  ]);



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

            value={sortBy}

            onChange={(value:string)=>
              dispatch(
                setSortBy(value)
              )
            }

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