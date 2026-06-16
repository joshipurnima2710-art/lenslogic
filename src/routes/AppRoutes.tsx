import {
  Routes,
  Route
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";

const AppRoutes = () => {

  return (

    <Routes>

      {/* Public */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected */}

      <Route
        element={
          <PrivateRoute>

            <MainLayout />

          </PrivateRoute>
        }
      >

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetail />}
        />

      </Route>

    </Routes>

  );

};

export default AppRoutes;