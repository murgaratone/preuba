import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VehiclesList } from 'app/shared/models/vehicles.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { VehiclesService } from './vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class TableVehicleService {
  headers: string[] = [];
  data: VehiclesList[] = [];
  actions = {
    edit: true,
    view: true,
    delete: false,
    add: false,
    substract: false
  };
  disableEditItemWithStatus= true;
  totalPages = 1;
  actualPage = 1;
  viewId = false;

  constructor(
    public vehicleService: VehiclesService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues(name?: string, plate?: string) {
    this.headers = ['Primer nombre', 'Primer apellido', 'Segundo apellido', 'Placa'];
    const result = await this.vehicleService.getVehicles(this.actualPage, name?? '', plate?? '');
    this.data = result.data? result.data.map((item) => { return{...item, status:true}}) : [];
    this.totalPages = result.pages ?? 1;
  }

  public editVehicle(item: any) {
    this.router.navigate(['/vehicles/edit', item.id]);
  }

  public viewVehicle(item: any) {
    this.router.navigate(['/vehicles/view', item.id]);
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
