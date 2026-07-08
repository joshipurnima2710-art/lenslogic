import {
  Package,
  Heart,
  Bell,
  LogOut,
  Home,
  Scale,
  User,
} from "lucide-react";

import logo from "../assets/images/logo1.png";

import { useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const compareIds = useAppSelector(
    (state) => state.compare.selectedIds
  );

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const compareHandler = () => {
    if (compareIds.length < 2) {
      alert("Please select at least 2 products to compare.");
      return;
    }

    navigate(`/compare?ids=${compareIds.join(",")}`);
  };

  const activeClass = (path: string) =>
    location.pathname === path
      ? "text-[#10B981] border-b-2 border-[#10B981]"
      : "text-gray-600 hover:text-[#10B981]";

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="lm-container lm-navbar flex items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img
            src={logo}
            alt="LensMarket Logo"
            className="w-14 h-14 object-contain"
          />

          <div className="text-3xl font-bold">
            <span className="text-gray-900">Lens</span>
            <span className="text-[#10B981]">Market</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex ml-16 gap-10">
          <button
            onClick={() => navigate("/")}
            className={`lm-nav-link pb-4 flex items-center gap-2 ${activeClass("/")}`}
          >
            <Home size={18} />
            Home
          </button>

          <button
            onClick={() => navigate("/products")}
            className={`lm-nav-link pb-4 flex items-center gap-2 ${activeClass("/products")}`}
          >
            <Package size={18} />
            Products
          </button>

          <button
            onClick={compareHandler}
            className={`lm-nav-link pb-4 flex items-center gap-2 ${activeClass("/compare")}`}
          >
            <Scale size={18} />
            Compare

            {compareIds.length > 0 && (
              <span className="bg-[#10B981] text-white text-xs rounded-full px-2 py-0.5">
                {compareIds.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex-1" />

        {/* Saved */}
        <button
          className="mr-4 text-gray-600 hover:text-[#10B981] transition"
          onClick={() => navigate("/saved")}
        >
          <Heart />
        </button>

        {/* Alerts */}
        <button
          className="mr-4 text-gray-600 hover:text-[#10B981] transition"
          onClick={() => navigate("/alerts")}
        >
          <Bell />
        </button>

        {/* Login / Logout */}
        {user ? (
          <button
            onClick={logoutHandler}
            className="
              flex items-center gap-2
              border border-red-500 text-red-500
              px-5 py-2.5 rounded-xl
              hover:bg-red-500 hover:text-white
              transition-all duration-200
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="
              flex items-center gap-2
              border border-[#10B981] text-[#10B981]
              px-5 py-2.5 rounded-xl
              hover:bg-[#10B981] hover:text-white
              transition-all duration-200
            "
          >
            <User size={18} />
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;