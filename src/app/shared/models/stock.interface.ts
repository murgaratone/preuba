export interface StockList {
    status: boolean | string;
    isLiquid: boolean | string;
    code: string;
    name: string;
    id?: string;  
    quantity: number;
    unitPrice: number;
    inventoryCost: number;
    relatedNotes?: string;
    units?: string;
  }
  
  export interface StockListResult {
    data: StockList[];
    pages: number
  }
    
  export interface Stock extends StockList {
  }

  export interface SelectList {
    id: string,
    name: string,
}