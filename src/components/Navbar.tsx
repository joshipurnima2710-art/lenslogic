import {
  Camera,
  Search,
  LogOut,
  GitCompare
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import { logout } from "../features/auth/authSlice";

const Navbar = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const compareIds = useAppSelector(
    state => state.compare.selectedIds
  );

  const logoutHandler = () => {

    dispatch(logout());

    navigate("/login");

  };

  const compareHandler = () => {

    if (compareIds.length < 2) {

      alert(
        "Please select at least 2 products to compare."
      );

      return;

    }

    navigate(
      `/compare?ids=${compareIds.join(",")}`
    );

  };

  return (

    <div className="w-full">

      {/* Announcement Bar */}

      <div className="bg-[#0f172a] text-white text-[11px] text-center py-1">

        PHASE 0 DRY RUN: TRACKING AMAZON, B&H, ADORAMA,
        BEST BUY & EBAY

      </div>

      {/* Navbar */}

      <div className="bg-white shadow-sm px-6 py-3 flex items-center">

        {/* Logo */}

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >

          <div className="bg-blue-600 p-2 rounded-md">

            <Camera className="text-white w-4 h-4" />

          </div>

          <span className="font-semibold text-gray-800">

            LENSLOGIC

          </span>

        </div>

        <div className="flex-1" />

        {/* Compare Button */}

        <button

          onClick={compareHandler}

          disabled={compareIds.length < 2}

          className={`
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            mr-4
            transition
            font-medium

            ${
              compareIds.length >= 2
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }
          `}
        >

          <GitCompare size={18} />

          Compare ({compareIds.length})

        </button>

        {/* Search */}

        <div className="relative w-[300px] mr-4">

          <Search
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              w-4
              h-4
              text-gray-400
            "
          />

          <input
            className="
              w-full
              bg-gray-100
              rounded-full
              pl-10
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            placeholder="Search by model or brand..."
          />

        </div>

        {/* Auth */}

        {

          user ? (

            <button

              onClick={logoutHandler}

              className="
                flex
                items-center
                gap-2
                bg-red-500
                hover:bg-red-600
                text-white
                px-4
                py-2
                rounded-lg
                transition
              "

            >

              <LogOut size={18} />

              Logout

            </button>

          ) : (

            <button

              onClick={() => navigate("/login")}

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2
                rounded-lg
                transition
              "

            >

              Login

            </button>

          )

        }

      </div>

    </div>

  );

};

export default Navbar;