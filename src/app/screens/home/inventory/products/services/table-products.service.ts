import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductList } from 'app/shared/models/product.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { ProductService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class TableProductsService {
  headers: string[] = [];
  data: ProductList[] = [];
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
  viewStatus = true;

  constructor(
    public productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues() {
    this.headers = ['Nombre Producto', 'Código', 'Líquido', 'Estado',];
    const result = await this.productService.getProducts(this.actualPage);
    this.data = result.data.map(item =>
      { return {
          id: item.id,
          name: item.name,
          code: item.code,
          isLiquid: item.isLiquid ? 'SI': 'NO',
          status: item.status ? 'ACTIVO': 'INACTIVO'
        }
      });
    this.totalPages = result.pages ?? 1;
  }

  public editProduct(item: any) {
    this.router.navigate(['/inventory/products/edit', item.id]);
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
