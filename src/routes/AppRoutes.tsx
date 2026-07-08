import {
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import ComparePage from "../pages/ComparePage";
import About from "../pages/About";
import Feedback from "../pages/Feedback";

const AppRoutes = () => {

  return (

    <Routes>

      {/* Public */}

      <Route path="/login" element={<Login />} />

      {/* Protected */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/compare" element={<ComparePage />}/>
      </Route>

    </Routes>

  );

};

export default AppRoutes;