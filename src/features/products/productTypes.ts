export interface Marketplace {
  id: number;
  name: string;
  website: string;
  logo: string | null;
}

export interface ProductPrice {
  id: number;
  marketplace: Marketplace;
  price: string;
  product_url: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
}

export interface ProductPrice {
  id: number;
  price: number;
  currency: string;
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
  
  productprice_set?: ProductPrice[];

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