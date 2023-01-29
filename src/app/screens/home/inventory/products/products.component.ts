import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormsProductsService } from './services/forms-products.service';
import { TableProductsService } from './services/table-products.service'
import { ProductService } from './services/products.service';
import { Role } from 'app/shared/models/role';
import { IsLiquid, LiquidY, LiquidN } from 'app/shared/models/is-liquid';
import { Status, ActiveStatus, InactiveStatus } from 'app/shared/models/active-status';
import { Product } from 'app/shared/models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('myFormProduct', { static: false }) myFormProduct: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public selectLiquid: IsLiquid[] = [];
  public liquidY = new LiquidY();
  public liquidN = new LiquidN();
  public statusList: Status[] = [];
  public activeStatus = new ActiveStatus();
  public inactiveStatus = new InactiveStatus();
  public title = 'Productos';
  public disabled = false;
  public inputProductName = "";
  public inputProductCode = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,    
    public tableProductsService : TableProductsService,
    public formsProductsService: FormsProductsService,
    public configService: ConfigurationService,
    private productService: ProductService,
    
  ) { 
    this.formsProductsService.idProduct = this.route.snapshot.paramMap.get(
      'id'
    ) ?? '';
  }

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.profileList = [this.configService.adminUser, this.configService.manageUser]
    this.selectLiquid = [this.liquidY, this.liquidN]
    this.statusList = [this.activeStatus, this.inactiveStatus]
    this.mode = this.route.snapshot.data['mode'];
    try {
      await this.initValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    if (this.mode === 'table' || this.mode === 'create') {
      this.title = 'Productos';
      await this.tableProductsService.assignInitialValues();
    }
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'edit':
          this.title = 'Editar Producto';
          this.disabled = true;
          break;

        case 'create':
          this.title = 'Productos';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsProductsService.createForm(this.mode);
    }
  }

  public addProductButton() {
    this.router.navigate(['/inventory/products/create']);
  }

  public back() {
    this.router.navigate(['/inventory/']);
  }

  public saveProduct() {
    if (!this.formsProductsService.formProduct?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const {name, code, isLiquid, status} = this.formsProductsService.formProduct?.value;
    const product: Product = {name, code, isLiquid, status};
    product.name = product.name.toUpperCase();
    product.code = product.code.toUpperCase();
    product.isLiquid = product.isLiquid === 'SI' ? true : false;
    product.status = product.status === 'ACTIVO' ? true : false;

    if (this.mode === 'edit') {
      product.id = this.formsProductsService.product?.id
    }

    const promise =
      this.mode === 'edit'
        ? this.productService.updateProduct(product)
        : this.productService.createProduct(product);
    
    return promise.then((data) => {
      if (this.mode === 'edit') {
        this.formsProductsService.formProduct?.reset()
        this.myFormProduct?.resetForm();
        this.initValues();
        this.router.navigate(['/inventory/']);
      } else {
        this.router.navigate(['/inventory/']);
      }
    }).catch(() => {
      this.formsProductsService.formProduct?.reset()
      this.myFormProduct?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });
  }

}
