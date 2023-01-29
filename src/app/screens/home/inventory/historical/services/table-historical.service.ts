import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HistoricalProductList } from 'app/shared/models/historical-product.interface';
import { FormsHistoricalService } from './forms-historical.service';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { HistoricalService } from './historical.service';

@Injectable({
  providedIn: 'root'
})
export class TableHistoricalService {
  @ViewChild('myFormProduct', { static: false }) myFormProduct: NgForm | undefined;

  headers: string[] = [];
  data: HistoricalProductList[] = [];
  totalPages = 1;
  actualPage = 1;
  viewId = false;
  viewStatus = true;
  startDate = "";
  endDate = "";

  constructor(
    public historicalService: HistoricalService,
    public formsHistoricalService: FormsHistoricalService,
    public dialog: MatDialog,
    private router: Router,
    private configService: ConfigurationService,
  ) { }

  public async assignSearchValues(startDate: string, endDate: string) {
    this.headers = ['Fecha de registro', 'Nombre de producto', 'Código de producto', 'Líquido', 'Estado',
                    'Cantidad inicial (UND/ONZ)', 'Costo por unidad', 'Costo en inventario', 'Cantidad usada (UND/ONZ)', 
                    'Costo cantidad usada (UND/ONZ)', 'Cantidad inventario final (UND/ONZ)', 'Costo inventario final', 
                    'Observaciones costo en inventario'];
    this.startDate = startDate;
    this.endDate = endDate;
    const result = await this.historicalService.getHistoricalProducts(this.startDate, this.endDate, this.actualPage);
    try {
      this.data = result.data.map(item =>
        { return {          
            inventoryDate: item.inventoryDate,
            name: item.name,
            code: item.code,
            isLiquid: item.isLiquid ? 'SI' : 'NO',
            status: item.status ? 'ACTIVO' : 'INACTIVO',
            initialQuantity: item.initialQuantity,
            unitPrice: item.unitPrice,
            inventoryCost: item.inventoryCost,
            quantityUsed: item.quantityUsed,
            quantityUsedCost: item.quantityUsedCost,
            finalQuantity: item.finalQuantity,
            quantityFinalCost: item.quantityFinalCost,
            relatedNotes: item.relatedNotes
          }
        });
      this.totalPages = result.pages ?? 1;
    } catch(err) {
      this.formsHistoricalService.formHistoricalProduct?.reset();
      this.myFormProduct?.resetForm();
      this.router.navigate(['/inventory/historical/']);
    }
  }

  public async chargeNewPageValues() {
    this.headers = ['Fecha de registro', 'Nombre de producto', 'Código de producto', 'Líquido', 'Estado', 
                    'Cantidad inicial', 'Costo por unidad', 'Costo en inventario', 'Cantidad usada', 
                    'Costo cantidad usada', 'Cantidad inventario final', 'Costo inventario final', 
                    'Observaciones costo en inventario'];
    const result = await this.historicalService.getHistoricalProducts(this.startDate, this.endDate, this.actualPage);
    this.data = result.data.map(item =>
      { return {
          inventoryDate: item.inventoryDate,
          name: item.name,
          code: item.code,
          isLiquid: item.isLiquid ? 'SI' : 'NO',
          status: item.status ? 'ACTIVO' : 'INACTIVO',
          initialQuantity: item.initialQuantity,
          unitPrice: item.unitPrice,
          inventoryCost: item.inventoryCost,
          quantityUsed: item.quantityUsed,
          quantityUsedCost: item.quantityUsedCost,
          finalQuantity: item.finalQuantity,
          quantityFinalCost: item.quantityFinalCost,
          relatedNotes: item.relatedNotes
        }
      });    
    this.totalPages = result.pages ?? 1;
  }  

  public async backPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage - 1;
      await this.chargeNewPageValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  public async nextPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage + 1;
      await this.chargeNewPageValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

}
