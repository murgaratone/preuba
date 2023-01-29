export interface TableInterface {
    select?: string | boolean;
    notSelect?: string | boolean;
    alarm?: string | boolean
}

export interface PlateInterface extends TableInterface {
    plate?: string; 
    id?: string;
}

export interface WashOrdersCreate extends PlateInterface {
    idCombo?: string; 
    idCleaner?: string;
    idWashingTrack?: string;
    idBrand?: string;
    idVehicleType?: string
}

export interface WashOrdersList extends WashOrdersCreate {
    customer?: string;
    vehicleType?: string;
    washingTrack: string;
    cleaner: string;
    serviceType?: string;
    orderNumber?: string;
    status?: string | boolean;
}

export interface WashOrdersListResult {
    data: WashOrdersList[];
    pages: number
}

export interface WashOrders extends WashOrdersList {
    customerName: string;
    customerLastName: string;
    customerSecondLastName: string;
    brand: string;    
    servicePrice: string;
    washOrderDate?: string;
}

export interface SelectList {
    id: string,
    name: string,
}