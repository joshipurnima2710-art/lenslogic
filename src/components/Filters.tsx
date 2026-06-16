import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../features/filters/filterSlice";
import type { RootState } from "../app/store";
import MultiSelectDropdown from "./MultiSelectDropdown";

const Filters = () => {
  const dispatch = useDispatch();
  const { activeMenu, selectedFilters } = useSelector(
    (state: RootState) => state.filters
  );

  const filterData =
    activeMenu === "Cameras"
      ? [
          {
            label: "Brand",
            options: ["Canon", "Nikon", "Sony"],
          },
          {
            label: "Camera Type",
            options: ["DSLR", "Mirrorless", "Compact"],
          },
          
        ]
      : [
          {
            label: "Lens Type",
            options: ["Prime", "Zoom"],
          },
          {
            label: "Mount",
            options: ["Canon EF", "Sony E", "Nikon F"],
          },
        ];

  return (
    <div>
      <div className="mt-4 text-sm text-gray-500">
        Showing results for <span className="font-semibold">{activeMenu}</span>
      </div>
      <div className="flex gap-4 flex-wrap mt-4">
        {filterData.map((filter) => (
          <MultiSelectDropdown
            key={filter.label}
            label={filter.label}
            options={filter.options}
            selected={selectedFilters[filter.label] || []}
            onChange={(value) =>
              dispatch(
                toggleFilter({
                  category: filter.label,
                  value,
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