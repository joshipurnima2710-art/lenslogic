export interface FilterOption {
  id: number;
  name: string;
  brand_id: number | null;
}

export interface FilterCategory {
  name: string;
  options: FilterOption[];
}

export interface FilterState {

  filters: {
    [key: string]: FilterCategory;
  };

  loading: boolean;

  error: string | null;

  // Camera=1, Lens=2
  productType: number;

  // Selected ids
  selectedFilters: {
    [key: string]: number[];
  };

}