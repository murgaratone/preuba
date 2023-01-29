import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlarmsList } from 'app/shared/models/alarms.interfaces';
import { Dialogs } from 'app/shared/models/dialog.class';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { AlarmsService } from './alarms.service';

@Injectable({
  providedIn: 'root'
})
export class TableAlarmsService {
  headers: string[] = [];
  data: AlarmsList[] = [];
  actions = {
    edit: true,
    view: false,
    delete: false,
    add: false,
    substract: false
  };
  disableEditItemWithStatus = true;
  totalPages = 1;
  actualPage = 1;
  viewId = false;

  constructor(
    public activeUserService: AlarmsService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues() {
    this.headers = ['Producto', 'Líquido', 'Cantidad Mínima', 'Estado'];
    const result = await this.activeUserService.getAlarms(this.actualPage);    
    this.data = result.data.map((alarm) =>{
      return{
        id: alarm.id,
        name: alarm.name,
        isLiquid: alarm.isLiquid? 'SI' : 'NO',
        quantityTrigger: alarm.quantityTrigger,
        statusProduct: alarm.statusProduct? 'ACTIVO' : 'INACTIVO',
        select: alarm.quantityTrigger >= (alarm.currentQuantity?? 0),
        alarm: alarm.quantityTrigger >= (alarm.currentQuantity?? 0),
      }
    });
    this.totalPages = result.pages ?? 1;
  }

  public editAlarm(item: any) {
    this.router.navigate(['/alarms/edit', item.id]);
  }

  public viewAlarm(item: any) {
  }

  public changeStatusAlarm(item: any) {
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
      await this.assignInitialValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

}
