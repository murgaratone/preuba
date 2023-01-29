export interface VehicleType {
  name: string;
  id?: string;
  title?: string;
  select?: boolean;
  notSelect?: boolean;
}

export interface VehicleTypeResult {
  data:VehicleType[];
  pages: number
}
