import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

import {
  fetchCompareProducts,
  clearCompare
} from "../features/products/compareSlice";

const ComparePage = () => {

  const dispatch =
    useAppDispatch();

  const [searchParams] =
    useSearchParams();

  const ids =
    searchParams.get("ids");

  const {
    compareProducts,
    loading
  } = useAppSelector(
    state => state.compare
  );

  useEffect(() => {

    if (ids) {

      dispatch(
        fetchCompareProducts(
          ids
            .split(",")
            .map(Number)
        )
      );

    }

  }, [ids, dispatch]);

  if (loading) {

    return (

      <div className="flex justify-center py-20">

        Loading comparison...

      </div>

    );

  }

  if (
    compareProducts.length === 0
  ) {

    return (

      <div className="text-center py-20">

        No products selected for comparison.

      </div>

    );

  }

  const specificationNames =
    Array.from(

      new Set(

        compareProducts.flatMap(

          product =>

            product.productspecifications_set
              ?.map(
                (spec: any) =>
                  spec.specification_name
              )
              .filter(Boolean) || []

        )

      )

    );

  return (

    <div className="max-w-[1800px] mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Product Comparison

        </h1>

        <button

          onClick={() =>
            dispatch(
              clearCompare()
            )
          }

          className="
            px-4
            py-2
            bg-red-500
            text-white
            rounded-lg
            hover:bg-red-600
          "

        >

          Clear Comparison

        </button>

      </div>

      <div
        className="
          overflow-x-auto
          bg-white
          rounded-xl
          shadow
        "
      >

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th
                className="
                  p-5
                  bg-gray-50
                  sticky
                  left-0
                  z-20
                  min-w-[250px]
                  text-left
                "
              >

                Specification

              </th>

              {

                compareProducts.map(
                  product => (

                    <th

                      key={`header-${product.id}`}

                      className="
                        p-5
                        min-w-[320px]
                        border-l
                        text-center
                      "

                    >

                      <img

                        src={
                          product.productimages_set?.[0]
                            ?.image_url ||
                          "/no-image.png"
                        }

                        alt={product.name}

                        className="
                          h-52
                          mx-auto
                          object-contain
                        "
                      />

                      <div className="mt-4 text-lg font-bold">

                        {product.name}

                      </div>

                      <div className="text-gray-500">

                        {product.brand}

                      </div>

                      <div className="text-2xl font-bold text-blue-600 mt-3">

                        ₹{product.price}

                      </div>

                      <div className="mt-4 space-y-2">

                        {

                            product.productprice_set?.map(
                            (price: any) => (

                                <a

                                key={price.id}

                                href={price.product_url}

                                target="_blank"

                                rel="noopener noreferrer"

                                className="
                                    flex
                                    justify-between
                                    items-center
                                    border
                                    rounded-lg
                                    px-3
                                    py-2
                                    hover:bg-gray-50
                                    transition
                                "

                                >

                                <span className="text-sm text-gray-600">

                                    {

                                    price.marketplace.name

                                    }

                                </span>

                                <span className="font-semibold text-blue-600">

                                    ₹{price.price}

                                </span>

                                </a>

                            )
                            )

                        }

                        </div>

                    </th>

                  )
                )

              }

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="p-4 font-semibold bg-gray-50 sticky left-0">

                Product Type

              </td>

              {

                compareProducts.map(
                  product => (

                    <td
                      key={`ptype-${product.id}`}
                      className="p-4 text-center"
                    >

                      {product.product_type || "-"}

                    </td>

                  )
                )

              }

            </tr>

            <tr className="border-b">

              <td className="p-4 font-semibold bg-gray-50 sticky left-0">

                Brand

              </td>

              {

                compareProducts.map(
                  product => (

                    <td
                      key={`brand-${product.id}`}
                      className="p-4 text-center"
                    >

                      {product.brand || "-"}

                    </td>

                  )
                )

              }

            </tr>

            <tr className="border-b">

              <td className="p-4 font-semibold bg-gray-50 sticky left-0">

                Camera Type

              </td>

              {

                compareProducts.map(
                  product => (

                    <td
                      key={`camera-${product.id}`}
                      className="p-4 text-center"
                    >

                      {product.camera_type || "-"}

                    </td>

                  )
                )

              }

            </tr>

            <tr className="border-b">

              <td className="p-4 font-semibold bg-gray-50 sticky left-0">

                Mount Type

              </td>

              {

                compareProducts.map(
                  product => (

                    <td
                      key={`mount-${product.id}`}
                      className="p-4 text-center"
                    >

                      {product.mount_type || "-"}

                    </td>

                  )
                )

              }

            </tr>

            <tr className="border-b">

              <td className="p-4 font-semibold bg-gray-50 sticky left-0">

                Sensor Type

              </td>

              {

                compareProducts.map(
                  product => (

                    <td
                      key={`sensor-${product.id}`}
                      className="p-4 text-center"
                    >

                      {product.sensor_type || "-"}

                    </td>

                  )
                )

              }

            </tr>

            {

              specificationNames.map(
                specName => (

                  <tr
                    key={`spec-row-${specName}`}
                    className="border-b"
                  >

                    <td
                      className="
                        p-4
                        font-semibold
                        bg-gray-50
                        sticky
                        left-0
                      "
                    >

                      {specName}

                    </td>

                    {

                      compareProducts.map(
                        product => {

                          const spec =
                            product.productspecifications_set?.find(
                              (item: any) =>
                                item.specification_name === specName
                            );

                          return (

                            <td

                              key={`spec-${specName}-${product.id}`}

                              className="p-4 text-center"

                            >

                              {
                                spec?.specification_value || "-"
                              }

                            </td>

                          );

                        }
                      )

                    }

                  </tr>

                )
              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ComparePage;