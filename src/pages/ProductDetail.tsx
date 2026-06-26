import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import ImageSlider from "../components/ImageSlider";

import {
  getProductDetailApi
} from "../features/products/productAPI";

const ProductDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

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

      setProduct(
        response.data
      );

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center py-24">

        <div className="text-lg text-gray-500">

          Loading product...

        </div>

      </div>

    );

  }

  if (!product) {

    return (

      <div className="flex justify-center items-center py-24">

        <div className="text-lg text-gray-500">

          Product not found

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-10">

      {/* Back Button */}

      <button

        onClick={() => navigate(-1)}

        className="
          px-4
          py-2
          bg-white
          border
          rounded-xl
          shadow-sm
          hover:bg-gray-100
          transition
        "

      >

        ← Back

      </button>

      {/* Top Section */}

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Images */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <ImageSlider
            images={
              product.productimages_set || []
            }
          />

        </div>

        {/* Product Information */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-8
            h-fit
            lg:sticky
            lg:top-8
          "
        >

          <div className="text-sm text-gray-500">

            {product.brand}

          </div>

          <h1 className="mt-3 text-4xl font-bold text-gray-800">

            {product.name}

          </h1>

          <div className="mt-6 text-4xl font-bold text-blue-600">

            ₹{product.price}

            /* MarketPlace Price */
            {
              product.productprice_set?.length > 0 && (

                <div className="mt-8">

                  <h3 className="text-lg font-semibold mb-4">

                    Available at

                  </h3>

                  <div className="space-y-3">

                    {

                      product.productprice_set.map(
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
                              rounded-xl
                              p-4
                              hover:shadow-md
                              hover:border-blue-500
                              transition
                            "

                          >

                            <div className="flex items-center gap-3">

                              {

                                price.marketplace.logo ? (

                                  <img
                                    src={price.marketplace.logo}
                                    className="h-8"
                                    alt={price.marketplace.name}
                                  />

                                ) : (

                                  <div className="text-lg font-semibold text-gray-80">

                                    {
                                      price.marketplace.name
                                    }

                                  </div>

                                )

                        }

                            </div>

                            <div className="text-right">

                              <div className="font-bold text-blue-600 text-xl">

                                ₹{price.price}

                              </div>

                              <div className="text-sm text-gray-500">

                                View Deal →

                              </div>

                            </div>

                          </a>

                        )
                      )

                    }

                  </div>

                </div>

              )
            }

          </div>

          <div className="mt-10 space-y-4 text-gray-700">

            {

              product.camera_type && (

                <div>

                  <span className="font-semibold">

                    Camera Type:

                  </span>

                  {" "}

                  {product.camera_type}

                </div>

              )

            }

            {

              product.lens_type && (

                <div>

                  <span className="font-semibold">

                    Lens Type:

                  </span>

                  {" "}

                  {product.lens_type}

                </div>

              )

            }

            {

              product.mount_type && (

                <div>

                  <span className="font-semibold">

                    Mount Type:

                  </span>

                  {" "}

                  {product.mount_type}

                </div>

              )

            }

            {

              product.sensor_type && (

                <div>

                  <span className="font-semibold">

                    Sensor Type:

                  </span>

                  {" "}

                  {product.sensor_type}

                </div>

              )

            }

          </div>

        </div>

      </div>


      {/* Specifications */}

      <div className="bg-white rounded-2xl shadow-sm">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">

            Specifications

          </h2>

        </div>

        <div
          className="
            max-h-[600px]
            overflow-y-auto
          "
        >

          <table className="w-full">

            <thead
              className="
                sticky
                top-0
                bg-white
                border-b
              "
            >

              <tr>

                <th className="p-4 text-left w-1/3">

                  Specification

                </th>

                <th className="p-4 text-left">

                  Value

                </th>

              </tr>

            </thead>

            <tbody>

              {

                product.productspecifications_set?.map(
                  (spec: any) => (

                    <tr
                      key={spec.id}
                      className="
                        border-b
                        hover:bg-gray-50
                      "
                    >

                      <td
                        className="
                          p-4
                          bg-gray-50
                          font-medium
                        "
                      >

                        {spec.key}

                      </td>

                      <td className="p-4 text-gray-600">

                        {spec.value}

                      </td>

                    </tr>

                  )
                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default ProductDetail;