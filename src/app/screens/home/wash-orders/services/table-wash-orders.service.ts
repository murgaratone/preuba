import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WashOrdersList } from 'app/shared/models/wash-orders.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { WashOrdersService } from './wash-orders.service';

@Injectable({
  providedIn: 'root'
})
export class TableWashOrdersService {
  headers: string[] = [];
  data: WashOrdersList[] = [];
  actions = {
    edit: true,
    view: true,
    delete: false,
    add: false,
    substract: false
  };
  disableEditItemWithStatus = true;
  totalPages = 1;
  actualPage = 1;
  viewId = false;
  viewStatus = true;

  constructor(
    public washOrdersService: WashOrdersService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues(name?: string, plate?: string) {
    this.headers = ['N°', 'Cliente', 'Placa', 'Tipo de vehículo', 'Pista', 'Cleaner', 'Estado'];
    const result = await this.washOrdersService.getWashOrders(this.actualPage, name?? '', plate?? '');    
    this.data = result.data? result.data.map(
      (item) => { return {
        id: item.orderNumber ?? '',
        orderNumber: item.orderNumber ?? '',
        customer: item.customer ?? '',
        plate: item.plate ?? '',
        vehicleType: item.vehicleType ?? '',
        washingTrack: item.washingTrack ?? '',
        cleaner: item.cleaner ?? '',
        status: item.status ? 'Activa' : 'Finalizada',
        select: !item.status,   
        notSelect: item.status,             
        alarm: !item.status
      }
    }) : [];    
    this.totalPages = result.pages ?? 1;
  }

  public editWashOrder(item: any) {
    this.router.navigate(['/wash-orders/edit', item.orderNumber]);
  }

  public viewWashOrder(item: any) {
    this.router.navigate(['/wash-orders/view', item.orderNumber]);
  }

  public async backPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage - 1;
      await this.assignInitialValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  public async nextPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage + 1;
      await this.assignInitialValues('', '');
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

}
