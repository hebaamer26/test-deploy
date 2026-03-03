export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandsResponse {
  data: BrandType[];
  results?: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
}
