export type TApiResponse = {
  status: number;
  statusText: string;
  data: IProductsData | undefined;
  error: any;
  loading: boolean;
};

export interface IProductsData {
  products: IProductEntity[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductEntity {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[] | null;
}
