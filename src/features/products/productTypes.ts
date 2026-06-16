export interface ProductImage {
  id: number;
  image_url: string;
}

export interface ProductSpecification {
  id: number;
  specification_name: string;
  specification_value: string;
}

export interface Product {
  id: number;

  name: string;

  price: number;

  product_type: string;

  brand: string;

  lens_type: string;

  camera_type: string;

  mount_type: string;

  sensor_type: string;

  productspecifications_set?: ProductSpecification[];

  productimages_set?: ProductImage[];
}

export interface ProductState {

  products: Product[];

  loading: boolean;

  error: string | null;

  currentPage: number;

  totalPages: number;

  totalCount: number;

  pageSize: number;

  hasMore: boolean;

}