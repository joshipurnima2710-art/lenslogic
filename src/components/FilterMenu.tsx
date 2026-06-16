import { useEffect, useState } from "react";

import { useAppDispatch } from "../hooks/useAppDispatch";

import {
  fetchFilters,
  setProductType,
} from "../features/filters/filterSlice";

const FilterMenu = () => {

  const dispatch = useAppDispatch();

  const [activeMenu, setActiveMenu] = useState(1);

  // Load Camera filters on page load
  useEffect(() => {

    dispatch(setProductType(1));

    dispatch(
      fetchFilters({
        productType: 1,
        optionIds: [],
      })
    );

  }, [dispatch]);

  const handleMenuClick = (
    menuId: number
  ) => {

    setActiveMenu(menuId);

    dispatch(
      setProductType(menuId)
    );

    dispatch(
      fetchFilters({
        productType: menuId,
        optionIds: [],
      })
    );

  };

  return (

    <div className="flex gap-4 mb-6">

      <button
        onClick={() =>
          handleMenuClick(1)
        }
        className={`px-4 py-2 rounded-md font-medium ${
          activeMenu === 1
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        Cameras
      </button>

      <button
        onClick={() =>
          handleMenuClick(2)
        }
        className={`px-4 py-2 rounded-md font-medium ${
          activeMenu === 2
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        Lenses
      </button>

    </div>

  );
};

export default FilterMenu;