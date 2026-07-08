import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../features/filters/filterSlice";
import type { RootState } from "../app/store";
import MultiSelectDropdown from "./MultiSelectDropdown";

const Filters = () => {
  const dispatch = useDispatch();

  const {
    activeMenu,
    selectedFilters
  } = useSelector(
    (state: RootState) => state.filters
  );

  const filterData =
    activeMenu === "Cameras"
      ? [
          {
            label: "Brand",
            options: [
              { id: 1, name: "Canon", brand_id: null },
              { id: 2, name: "Nikon", brand_id: null },
              { id: 3, name: "Sony", brand_id: null }
            ]
          },
          {
            label: "Camera Type",
            options: [
              { id: 1, name: "DSLR", brand_id: null },
              { id: 2, name: "Mirrorless", brand_id: null },
              { id: 3, name: "Compact", brand_id: null }
            ]
          }
        ]
      : [
          {
            label: "Lens Type",
            options: [
              { id: 1, name: "Prime", brand_id: null },
              { id: 2, name: "Zoom", brand_id: null }
            ]
          },
          {
            label: "Mount",
            options: [
              { id: 1, name: "Canon RF", brand_id: null },
              { id: 2, name: "Sony E", brand_id: null },
              { id: 3, name: "Nikon Z", brand_id: null }
            ]
          }
        ];

  return (
    <div className="mb-8">

      {/* Result Text */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          {activeMenu}
        </h2>

        <p className="text-gray-500 mt-1">
          Compare prices across multiple marketplaces
        </p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4">
        {filterData.map(filter => (
          <MultiSelectDropdown
            key={filter.label}
            label={filter.label}
            options={filter.options}
            selected={
              selectedFilters[
                filter.label
              ] || []
            }
            onChange={(value) =>
              dispatch(
                toggleFilter({
                  category: filter.label,
                  value
                })
              )
            }
          />
        ))}
      </div>

    </div>
  );
};

export default Filters;