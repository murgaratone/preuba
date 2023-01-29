export class ResponseBack {

    public details: details = { status: '', message: '', totalPag: 0 };
    public data: any[] = [];
    public status = 0;

    constructor() { }
}

export interface details {
    status: string, 
    message: string, 
    totalPag?: number;
}
