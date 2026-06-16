import { Camera, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full">
      <div className="bg-[#0f172a] text-white text-[11px] text-center py-1">
        PHASE 0 DRY RUN: TRACKING AMAZON, B&H, ADORAMA,
        BEST BUY & EBAY
      </div>

      <div className="bg-white shadow-sm px-6 py-3 flex items-center">

        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-md">
            <Camera className="text-white w-4 h-4" />
          </div>

          <span className="font-semibold text-gray-800">
            LENSLOGIC
          </span>
        </div>

        <div className="flex-1"></div>

        <div className="relative w-[300px] mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            className="w-full bg-gray-100 rounded-full pl-10 py-2"
            placeholder="Search by model or brand..."
          />
        </div>

        {user ? (
          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;