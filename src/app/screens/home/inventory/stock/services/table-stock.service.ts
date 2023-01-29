import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockList } from 'app/shared/models/stock.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class TableStockService {
  headers: string[] = [];
  data: StockList[] = [];
  actions = {
    edit: false,
    view: false,
    delete: false,
    add: true,
    substract: true
  };
  disableEditItemWithStatus = true;
  totalPages = 1;
  actualPage = 1;
  viewId = false;
  viewStatus = true;

  constructor(
    public stockService: StockService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues() {
    this.headers = ['PRODUCTO', 'CÓDIGO PRODUCTO', 'LÍQUIDO', 'ESTADO', 'CANTIDAD (UND/ONZ)', 'COSTO UNITARIO', 'COSTO EN INVENTARIO'];
    const result = await this.stockService.getAllStock(this.actualPage);
    this.data = result.data.map(item =>
      { return {
          id: item.id,
          name: item.name,
          code: item.code,
          isLiquid: item.isLiquid ? 'SI': 'NO',
          status: item.status ? 'ACTIVO': 'INACTIVO',
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          inventoryCost: item.inventoryCost,
        }
      });
    this.totalPages = result.pages ?? 1;
  }

  public addProductToStock(item: any) {
    this.router.navigate(['/inventory/stock/add', item.id]);
  }

  public subProductToStock(item: any) {
    this.router.navigate(['/inventory/stock/substract', item.id]);
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
