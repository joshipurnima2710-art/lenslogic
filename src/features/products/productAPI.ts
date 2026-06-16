import api from "../../services/axios";

export const getProductsApi = async (
  params: any,
  page: number = 1
) => {

  const cleanedParams = Object.fromEntries(

    Object.entries(params).filter(
      ([_, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )

  );

  const response = await api.get(
    "/products/",
    {
      params: {
        ...cleanedParams,
        page
      }
    }
  );

  return response.data;
};

export const getProductDetailApi = async (
  id: string
) => {

  const response = await api.get(
    `/products/${id}/`
  );

  return response.data;

};