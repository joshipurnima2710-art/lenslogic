import {Heart, GitCompare} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchProducts } from "../features/products/productSlice";
import { buildProductParams } from "../features/products/productHelper";
import { toggleCompare } from "../features/products/compareSlice";

const ProductCard = () => {
  const dispatch = useAppDispatch();

  const {
    products,
    loading,
    currentPage,
    hasMore
  } = useAppSelector(
    state => state.products
  );

  const {
    productType,
    selectedFilters
  } = useAppSelector(
    state => state.filters
  );

  const compareIds = useAppSelector(
    state => state.compare.selectedIds
  );

  const handleLoadMore = () => {
    dispatch(
      fetchProducts({
        params: buildProductParams(
          productType,
          selectedFilters
        ),
        page: currentPage + 1
      })
    );
  };

  if (!loading && products.length === 0) {
    return (
      <div className="bg-white rounded-[28px] border border-gray-200 py-20 text-center">
        <div className="text-6xl mb-5">📷</div>

        <h2 className="text-2xl font-semibold text-gray-800">
          No matching products found
        </h2>

        <p className="text-gray-500 mt-3">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">

        {products.map(product => {

          const selected =
            compareIds.includes(product.id);

          const disableCompare =
            !selected &&
            compareIds.length >= 4;

          return (
            <div
              key={product.id}
              className="
                bg-white
                border
                border-gray-200
                overflow-hidden
                hover:shadow-lg
                transition-all
                duration-300
              "
            >
              {/* Image Section */}
              <div className="relative">

                {/* Wishlist */}
                <button
                  className="
                    absolute
                    top-4
                    right-4
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    border
                    border-gray-100
                    flex
                    items-center
                    justify-center
                    shadow-sm
                    z-10
                  "
                >
                  <Heart
                    size={18}
                    className="text-gray-400"
                  />
                </button>

                <Link
                  to={`/products/${product.id}`}
                >
                  <img
                    src={
                      product.productimages_set?.[0]
                        ?.image_url ||
                      "/no-image.png"
                    }
                    alt={product.name}
                    className="
                      
                      
                      object-contain
                      p-8
                    "
                  />
                </Link>
              </div>

              {/* Content */}
              <div className="px-5 pb-5">

                {/* Brand */}
                <div className="text-sm text-gray-500">
                  {product.brand}
                </div>

                {/* Product Name */}
                <Link
                  to={`/products/${product.id}`}
                  className="
                    block
                    mt-2
                    text-[18px]
                    font-semibold
                    text-gray-900
                    leading-7
                    hover:text-[#10B981]
                    min-h-[58px]
                  "
                >
                  {product.name}
                </Link>

                {/* Price */}
                <div
                    className="
                      font-bold
                      text-[#10B981]
                      leading-none
                      mt-1
                    "
                  >
                    ₹{product.price}
                  </div>

                {/* Compare Button */}
                <button
                  onClick={() =>
                    dispatch(
                      toggleCompare(
                        product.id
                      )
                    )
                  }
                  disabled={
                    disableCompare
                  }
                  className={`
                    mt-6
                    w-full
                    h-12
                    rounded-xl
                    font-medium
                    transition-all

                    ${
                      selected
                        ? "bg-[#10B981] text-white"
                        : "bg-[#F4FAF7] text-[#0F766E]"
                    }

                    ${
                      disableCompare
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-2">
                    <GitCompare size={16} />

                    {
                      selected
                        ? "Added to Compare"
                        : "Compare"
                    }
                  </div>
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-14">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="
              px-10
              py-4
              rounded-2xl
              bg-[#10B981]
              text-white
              hover:bg-[#059669]
              transition
            "
          >
            {
              loading
                ? "Loading..."
                : "Load More Products"
            }
          </button>
        </div>
      )}
    </>
  );
};

export default ProductCard;