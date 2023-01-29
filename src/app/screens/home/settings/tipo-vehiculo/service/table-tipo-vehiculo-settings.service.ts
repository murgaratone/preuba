import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { Dialogs } from 'app/shared/models/dialog.class';
import { VehicleType } from 'app/shared/models/settings.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { async } from 'rxjs';
import { TipoVehiculoSettingsService } from './tipo-vehiculo-settings.service';

@Injectable({
  providedIn: 'root'
})
export class TableTipoVehiculoSettingsService {
  headers: string[] = [];
  data: VehicleType[] = [];
  actions = {
    edit: true,
    view: false,
    delete: false,
    add: false,
    substract: false
  };
  totalPages = 1;
  actualPage = 1;
  viewId = false
  vehicleId?: string;

  constructor(
    public tipoVehiculoSettingsService: TipoVehiculoSettingsService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues(mode: modeViewCrud) {
    this.headers = ['Nombre'];
    const result = await this.tipoVehiculoSettingsService.getVehicleTypes(this.actualPage);
    this.data = result.data.map(data=>({...data, select: data.id == this.vehicleId, status: (mode === 'edit' || mode === 'create')? false: true }));
    this.totalPages = result.pages ?? 1;
  }

  public scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  public editVehicleType(item: any) {
    this.router.navigate(['/settings/tipo-vehiculo/edit', item.id]);
  }

  public viewVehicleType(item: any) {
    this.router.navigate(['/settings/tipo-vehiculo/view', item.id]);
  }

  public async backPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage - 1;
      await this.assignInitialValues('table');
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  public async nextPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage + 1;
      await this.assignInitialValues('table');
    } finally {
      this.configService.setLoadingPage(false);
    }
  }
}
