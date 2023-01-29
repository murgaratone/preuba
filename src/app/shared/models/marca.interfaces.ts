export interface BrandVehicle {
  name: string;
  id?: string;
  title?: string;
  select?: boolean;
  notSelect?: boolean;
}

export interface BrandVehicleResult {
  data:BrandVehicle[];
  pages: number
}

