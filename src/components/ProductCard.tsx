import { Link } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import {
  fetchProducts
} from "../features/products/productSlice";

import {
  buildProductParams
} from "../features/products/productHelper";

import {
  toggleCompare
} from "../features/products/compareSlice";

const ProductCard = () => {

  const dispatch =
    useAppDispatch();

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

  const compareIds =
    useAppSelector(
      state => state.compare.selectedIds
    );

  const handleLoadMore = () => {

    dispatch(

      fetchProducts({

        params:
          buildProductParams(
            productType,
            selectedFilters
          ),

        page:
          currentPage + 1

      })

    );

  };

  if (
    !loading &&
    products.length === 0
  ) {

    return (

      <div className="bg-white rounded-2xl shadow p-12 text-center mt-6">

        <div className="text-5xl mb-4">
          📷
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">

          No matching products found

        </h2>

        <p className="mt-3 text-gray-500">

          We couldn't find any products matching your filters.

        </p>

        <p className="text-gray-500">

          Try adjusting your filter selection.

        </p>

      </div>

    );

  }

  return (

    <>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {

          products.map(product => {

            const selected =
              compareIds.includes(
                product.id
              );

            const disableCompare =
              !selected &&
              compareIds.length >= 4;

            return (

              <div

                key={product.id}

                className="
                  bg-white
                  rounded-2xl
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  overflow-hidden
                  border
                "

              >

                {/* Product Image */}

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
                      w-full
                      h-56
                      object-contain
                      p-4
                    "
                  />

                </Link>

                {/* Content */}

                <div className="p-5">

                  <div className="text-sm text-gray-500">

                    {product.brand}

                  </div>

                  <Link
                    to={`/products/${product.id}`}
                    className="
                      block
                      mt-2
                      text-lg
                      font-semibold
                      text-gray-800
                      hover:text-blue-600
                      min-h-[56px]
                    "
                  >

                    {product.name}

                  </Link>

                  <div className="mt-3 text-2xl font-bold text-blue-600">

                    ₹{product.price}

                  </div>

                  {/* Buttons */}

                  <div className="mt-5 flex gap-3">

                    <Link

                      to={`/products/${product.id}`}

                      className="
                        flex-1
                        text-center
                        py-2.5
                        border
                        rounded-xl
                        hover:bg-gray-50
                        transition
                      "

                    >

                      Details

                    </Link>

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
                        flex-1
                        py-2.5
                        rounded-xl
                        font-medium
                        transition

                        ${
                          selected
                          ? "bg-green-600 text-white"
                          : "border hover:bg-gray-50"
                        }

                        ${
                          disableCompare
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                        }
                      `}

                    >

                      {

                        selected
                        ? "✓ Selected"
                        : "Compare"

                      }

                    </button>

                  </div>

                </div>

              </div>

            );

          })

        }

      </div>

      {

        hasMore && (

          <div className="flex justify-center mt-12">

            <button

              onClick={handleLoadMore}

              disabled={loading}

              className="
                px-8
                py-3
                bg-blue-600
                text-white
                rounded-xl
                hover:bg-blue-700
                transition
                disabled:opacity-50
              "

            >

              {

                loading

                ? "Loading..."

                : "Load More Products"

              }

            </button>

          </div>

        )

      }

    </>

  );

};

export default ProductCard;