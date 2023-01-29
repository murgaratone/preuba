export interface ProductList {
  status: string | boolean;
  isLiquid: string | boolean;
  code: string;
  name: string;
  id?: string;
}

export interface ProductListResult {
  data: ProductList[];
  pages: number
}
  
export interface Product extends ProductList {
}