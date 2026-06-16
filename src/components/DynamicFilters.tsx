import { useEffect } from "react";

import MultiSelectDropdown from "./MultiSelectDropdown";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import {
  fetchFilters,
  setSelectedFilters
} from "../features/filters/filterSlice";

import {
  fetchProducts
} from "../features/products/productSlice";

import {
  buildProductParams
} from "../features/products/productHelper";

const DynamicFilters = () => {

  const dispatch = useAppDispatch();

  const {
    filters,
    productType,
    selectedFilters
  } = useAppSelector(
    state => state.filters
  );

  const handleSelect = (
    filterName: string,
    optionId: number
  ) => {

    const current =
      selectedFilters[
        filterName
      ] || [];

    const updatedFilters = {

      ...selectedFilters,

      [filterName]:

        current.includes(optionId)

          ? current.filter(
              id => id !== optionId
            )

          : [...current, optionId]

    };

    dispatch(
      setSelectedFilters(
        updatedFilters
      )
    );

  };

  useEffect(() => {

    const optionIds =

      Object.values(
        selectedFilters
      ).flat();

    // reload dropdowns

    dispatch(

      fetchFilters({

        productType,

        optionIds

      })

    );

    // reload products

    dispatch(

      fetchProducts({

        params:

          buildProductParams(
            productType,
            selectedFilters
          ),

        page: 1

      })

    );

  },

  [
    selectedFilters,
    productType,
    dispatch
  ]);

  return (

    <div className="flex flex-wrap gap-4">

      {

        Object.entries(
          filters
        ).map(
          ([key, value]) => (

            <MultiSelectDropdown

              key={key}

              label={value.name}

              options={value.options}

              selected={
                selectedFilters[key] || []
              }

              onChange={optionId =>
                handleSelect(
                  key,
                  optionId
                )
              }

            />

          )
        )

      }

    </div>

  );

};

export default DynamicFilters;