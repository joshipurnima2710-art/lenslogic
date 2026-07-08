import { useEffect, useState } from "react";
import { Camera, Aperture } from "lucide-react";

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

  const handleMenuClick = (menuId: number) => {
    setActiveMenu(menuId);

    dispatch(setProductType(menuId));

    dispatch(
      fetchFilters({
        productType: menuId,
        optionIds: [],
      })
    );
  };

  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      {/* Cameras */}
      <button
        onClick={() => handleMenuClick(1)}
        className={`
          flex items-center gap-2 px-5 py-3 rounded-xl
          font-semibold transition-all duration-200 border
          ${
            activeMenu === 1
              ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-200"
              : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-500 hover:shadow-md"
          }
        `}
      >
        <Camera size={18} />
        Cameras
      </button>

      {/* Lenses */}
      <button
        onClick={() => handleMenuClick(2)}
        className={`
          flex items-center gap-2 px-5 py-3 rounded-xl
          font-semibold transition-all duration-200 border
          ${
            activeMenu === 2
              ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-200"
              : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-500 hover:shadow-md"
          }
        `}
      >
        <Aperture size={18} />
        Lenses
      </button>
    </div>
  );
};

export default FilterMenu;