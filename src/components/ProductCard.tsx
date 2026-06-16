import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import {
  fetchProducts
} from "../features/products/productSlice";

import {
  buildProductParams
} from "../features/products/productHelper";

import { Link } from "react-router-dom";

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

          We couldn't find any cameras or lenses matching your current filters.

        </p>

        <p className="text-gray-500">

          Try removing some filters or selecting different options.

        </p>

      </div>

    );

  }

  return (

    <>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {

          products.map(product => (

            <div
              key={product.id}
              className="
              bg-white
              rounded-xl
              shadow
              p-4
              hover:shadow-lg
              transition
              "
            >

              <img
                src={
                  product.productimages_set?.[0]?.image_url ??
                  "/no-image.png"
                }
                alt={product.name}
                className="
                w-full
                h-52
                object-contain
                "
              />

              <h3 className="mt-4 font-semibold">
                <Link to={`/products/${product.id}`} className="block mt-4 font-semibold text-gray-800 hover:text-blue-600">
                  {product.name}
                </Link>

              </h3>

              <div className="mt-2 text-blue-600 font-bold text-xl">

                ₹{product.price}

              </div>

            </div>

          ))

        }

      </div>

      {

        hasMore && (

          <div className="flex justify-center mt-10">

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