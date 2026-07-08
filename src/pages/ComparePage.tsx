import { useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  X,
  ShoppingCart,
  BadgeIndianRupee,
  CheckCircle,
} from "lucide-react";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import { fetchCompareProducts } from "../features/products/compareSlice";

import "../assets/css/compare.css";

const ComparePage = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const ids = searchParams.get("ids");

  const { compareProducts, loading } = useAppSelector(
    (state) => state.compare
  );

  useEffect(() => {
    if (ids) {
      dispatch(
        fetchCompareProducts(
          ids.split(",").map(Number)
        )
      );
    }
  }, [ids, dispatch]);

  // MUST be before conditional returns
  const allSpecifications = useMemo(() => {
    const specs = compareProducts.flatMap(
      (product: any) =>
        (product.productspecifications_set || []).map(
          (spec: any) => spec.key
        )
    );

    return [...new Set(specs)];
  }, [compareProducts]);

  const getSpecificationValue = (
    product: any,
    key: string
  ) => {
    const specification =
      (product.productspecifications_set || []).find(
        (item: any) => item.key === key
      );

    return specification?.value || "-";
  };

  if (loading) {
    return (
      <div className="compare-loading">
        Loading comparison...
      </div>
    );
  }

  if (!compareProducts || compareProducts.length === 0) {
    return (
      <div className="compare-empty">
        No products selected for comparison.
      </div>
    );
  }

  return (
    <div className="compare-page">
      <div className="compare-top-bar">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
      <div className="compare-header">
        <h1>Compare Products</h1>
        <p>
          Compare specifications, prices and marketplace availability
        </p>
      </div>

      <div className="compare-wrapper">

        {/* Specification Column */}
        <div className="compare-spec-column">
          <div className="spec-header-space"></div>

          <div className="spec-group-title">
            Specifications
          </div>

          {allSpecifications.map((spec: string) => (
            <div
              className="spec-name"
              key={spec}
            >
              {spec}
            </div>
          ))}
        </div>

        {/* Products */}
        {compareProducts.map((product: any) => {

          const marketplacePrices =
            (product.productprice_set || []).map(
              (item: any) => Number(item.price)
            );

          const lowestMarketplacePrice =
            marketplacePrices.length > 0
              ? Math.min(...marketplacePrices)
              : 0;

          return (
            <div
              className="compare-product-column"
              key={product.id}
            >

              {/* Remove Button */}
              <button className="remove-btn">
                <X size={16} />
              </button>

              {/* Image */}
              <img
                src={
                  product.productimages_set?.[0]?.image_url ||
                  "/placeholder.png"
                }
                alt={product.name}
                className="compare-image"
              />

              {/* Name */}
              <h3 className="product-name">
                {product.name}
              </h3>

              {/* Product Meta */}
              <div className="product-meta">

                {product.brand && (
                  <span>{product.brand}</span>
                )}

                {product.lens_type && (
                  <span>{product.lens_type}</span>
                )}

                {product.mount_type && (
                  <span>{product.mount_type}</span>
                )}

                {product.sensor_type && (
                  <span>{product.sensor_type}</span>
                )}

              </div>

              {/* MRP */}
              <div className="mrp-price">
                {product.price}
              </div>

              {/* Lowest Price Card */}
              <div className="lowest-price-card">

                <BadgeIndianRupee size={18} />

                <div>
                  <div className="lowest-label">
                    Lowest Price
                  </div>

                  <div className="lowest-value">
                    ₹{lowestMarketplacePrice}
                  </div>
                </div>

              </div>

              {/* Specifications */}
              {allSpecifications.map(
                (spec: string) => (
                  <div
                    className="spec-value"
                    key={`${product.id}-${spec}`}
                  >
                    {getSpecificationValue(
                      product,
                      spec
                    )}
                  </div>
                )
              )}

              {/* Marketplace */}
              <div className="marketplace-title">
                Marketplace Prices
              </div>

              <div className="marketplace-list">

                {(product.productprice_set || []).map(
                  (market: any) => {

                    const isLowest =
                      Number(market.price) ===
                      lowestMarketplacePrice;

                    return (
                      <a
                        href={market.product_url}
                        target="_blank"
                        rel="noreferrer"
                        className="market-card"
                        key={market.id}
                      >
                        <div className="market-left">

                          <div className="market-name">
                            {market.marketplace?.name}
                          </div>

                          <div className="market-price">
                            ₹{market.price}
                          </div>

                        </div>

                        <div className="market-right">

                          {isLowest && (
                            <CheckCircle
                              size={18}
                              className="best-price-icon"
                            />
                          )}

                          <ShoppingCart size={18} />

                        </div>
                      </a>
                    );
                  }
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparePage;