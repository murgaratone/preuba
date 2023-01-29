import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { Dialogs } from 'app/shared/models/dialog.class';
import { BrandVehicle} from 'app/shared/models/marca.interfaces';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { async } from 'rxjs';
import { MarcaService } from './marca.service';

@Injectable({
  providedIn: 'root'
})
export class TableMarcaService {
  headers: string[] = [];
  data: BrandVehicle[] = [];
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
  brandId?: string;

  constructor(
    public marcaService: MarcaService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues(mode: modeViewCrud) {
    this.headers = ['Nombre'];
    const result = await this.marcaService.getBrands(this.actualPage);
    this.data = result.data.map(data=>({...data, select: data.id == this.brandId, status: (mode === 'edit' || mode === 'create')? false: true }));
    this.totalPages = result.pages ?? 1;
  }

  public scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  public editBrandVehicle(item: any) {
    this.router.navigate(['/settings/marca/edit', item.id]);
  }

  public viewBrandVehicle(item: any){
    this.router.navigate(['/settings/marca/edit', item.id]);
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
