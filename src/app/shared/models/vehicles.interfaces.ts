export interface VehiclesList {
    name: string;
    lastName: string;
    secondLastName: string;
    plate: string;
    id?: string;
}

export interface VehiclesListResult {
    data: VehiclesList[];
    pages: number
}

export interface Vehicle extends VehiclesList {
    dni: string;
    phoneNumber: number;
    email: string;
    registerDate: string;
    address: string;
    idBrand: string;
    idVehicleType: string;
}

export interface SelectList{
    id: string,
    name: string
}