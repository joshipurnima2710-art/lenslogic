import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Home,
  ChevronRight,
  Star
} from "lucide-react";

import ImageSlider from "../components/ImageSlider";
import MarketplacePrices from "../components/MarketplacePrices";
import SpecificationTable from "../components/SpecificationTable";

import { getProductDetailApi } from "../features/products/productAPI";

import "../assets/css/detail.css";

const ProductDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const response =
        await getProductDetailApi(id);

      setProduct(response.data);

    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="lm-loading">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="lm-loading">
        Product not found
      </div>
    );
  }

  return (

    <div className="lm-detail-page">

      {/* Breadcrumb */}
      <div className="lm-breadcrumb">

        <Home
          size={16}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />

        <ChevronRight size={14} />

        <span>Cameras</span>

        <ChevronRight size={14} />

        <span>{product.brand}</span>

        <ChevronRight size={14} />

        <span className="active">
          {product.name}
        </span>

      </div>

      {/* Top Section */}
      <div className="lm-detail-top">

        {/* Left Side */}
        <div className="lm-image-card">

          <ImageSlider
            images={
              product.productimages_set || []
            }
          />

        </div>

        {/* Right Side */}
        <div className="lm-product-card">

          <div className="lm-product-info">

            <div className="lm-brand">
              {product.brand}
            </div>

            <h1 className="lm-title">
              {product.name}
            </h1>

            <div className="lm-price">
              ₹{product.price.toLocaleString()}
            </div>

            <div className="lm-mrp">
              MRP (Incl. of all taxes)
            </div>

            <div className="lm-feature-grid">

              {product.sensor_type && (
                <div className="lm-feature-card">
                  <h4>Sensor</h4>
                  <p>{product.sensor_type}</p>
                </div>
              )}

              {product.camera_type && (
                <div className="lm-feature-card">
                  <h4>Camera Type</h4>
                  <p>{product.camera_type}</p>
                </div>
              )}

              {product.mount_type && (
                <div className="lm-feature-card">
                  <h4>Mount Type</h4>
                  <p>{product.mount_type}</p>
                </div>
              )}

              {product.lens_type && (
                <div className="lm-feature-card">
                  <h4>Lens Type</h4>
                  <p>{product.lens_type}</p>
                </div>
              )}

            </div>

          </div>

          <MarketplacePrices
            prices={
              product.productprice_set || []
            }
          />

        </div>

      </div>

      {/* Specifications */}
      <SpecificationTable
        specifications={
          product.productspecifications_set || []
        }
      />

    </div>

  );

};

export default ProductDetail;