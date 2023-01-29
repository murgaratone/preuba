export interface HistoricalProductList {
  inventoryDate: string;
  status: boolean | string;
  isLiquid: boolean | string;
  code: string;
  name: string;
  id?: string;  
  initialQuantity: string;
  unitPrice: string;
  inventoryCost: string;
  quantityUsed: string;
  quantityUsedCost: string;
  finalQuantity: string;
  quantityFinalCost: string;
  relatedNotes: string;
}

export interface HistoricalProductListResult {
  data: HistoricalProductList[];
  pages: number
}
  
export interface HistoricalProduct extends HistoricalProductList {
}