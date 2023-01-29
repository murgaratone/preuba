export interface TableInterface {
    select?: boolean;
    notSelect?: boolean;
    alarm?: boolean
}

export interface AlarmsList extends TableInterface {
    quantityTrigger: number;
    name?: string;
    isLiquid?: boolean | string;
    statusProduct?: boolean | string;
    idProduct?: string | number;
    id?: string;
    currentQuantity?: number;
}

export interface AlarmsListResult {
    data: AlarmsList[];
    pages: number
}

export interface Alarm extends AlarmsList {
    observation?: string;
    status?: boolean
}

export interface ListInterface {
    id: boolean;
    name: string;
}

export interface ListProductInterface {
    id: string;
    name: string;
    isLiquid: boolean;
    status: boolean
}