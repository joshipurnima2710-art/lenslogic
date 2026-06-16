import api from "../../services/axios";

export const getFiltersApi = async (
  productType: number,
  optionIds: number[] = []
) => {

  let url =
    `/products/filter/?product_type=${productType}`;

  if (optionIds.length > 0) {
    url += `&option_ids=${optionIds.join(",")}`;
  }

  console.log(url);

  const response = await api.get(url);

  return response.data;
};