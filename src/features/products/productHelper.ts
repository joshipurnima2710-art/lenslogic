export const buildProductParams = (
  productType: number,
  selectedFilters: {
    [key: string]: number[];
  }
) => {

  const params: any = {
    product_type: productType
  };

  if (selectedFilters["Brand"]?.length) {

    params.brand_id =
      selectedFilters["Brand"].join(",");

  }

  if (selectedFilters["Camera Type"]?.length) {

    params.camera_type =
      selectedFilters["Camera Type"].join(",");

  }

  if (selectedFilters["Mount Type"]?.length) {

    params.mount_type =
      selectedFilters["Mount Type"].join(",");

  }

  if (selectedFilters["Sensor Type"]?.length) {

    params.sensor_type =
      selectedFilters["Sensor Type"].join(",");

  }

  if (selectedFilters["Lens Type"]?.length) {

    params.lens_type =
      selectedFilters["Lens Type"].join(",");

  }

  return params;
};