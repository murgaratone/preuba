import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormsStockService } from './services/forms-stock.service';
import { TableStockService } from './services/table-stock.service'
import { StockService } from './services/stock.service';
import { Role } from 'app/shared/models/role';
import { Stock } from 'app/shared/models/stock.interface';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @ViewChild('myFormStock', { static: false }) myFormStock: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public title = 'Consulta de inventario';
  public disabled = false;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public tableStockService : TableStockService,
    public formsStockService: FormsStockService,
    public configService: ConfigurationService,
    private stockService: StockService,

  ) {
    this.formsStockService.idProduct = this.route.snapshot.paramMap.get(
      'id'
    ) ?? '';
  }

  ngAfterViewInit(): void {
    this.tableStockService.actions.add = !(this.configService.role === this.configService.partnerUser.key);
    this.tableStockService.actions.substract = !(this.configService.role === this.configService.partnerUser.key);
  }

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.profileList = [this.configService.adminUser, this.configService.manageUser, this.configService.partnerUser]
    this.mode = this.route.snapshot.data['mode'];
    try {
      await this.initValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    if (this.mode === 'table') {
      this.title = 'Consulta de inventario';
      await this.tableStockService.assignInitialValues();
    }
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'add':
          this.title = 'Agregar Producto';
          this.disabled = true;
          break;

        case 'substract':
          this.title = 'Eliminar Producto';
          this.disabled = true;
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsStockService.createForm(this.mode);
    }
  }

  public back() {
    this.router.navigate(['/inventory/stock/']);
  }

  public async getProductQuantity(product: any) {
    let result = await this.stockService.getStock(product.id);
    return result[0];
  }

  public async saveProduct() {
    if (!this.formsStockService.formStock?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const {name, code, isLiquid, status, quantity, unitPrice, inventoryCost, relatedNotes} = this.formsStockService.formStock?.value;
    const stock: Stock = {name, code, isLiquid, status, quantity, unitPrice, inventoryCost, relatedNotes};
    stock.name = stock.name.toUpperCase();
    stock.code = stock.code.toUpperCase();
    stock.quantity = stock.quantity * 1;
    stock.id = this.formsStockService.stock?.id;

    const base = await this.getProductQuantity(stock);
    stock.isLiquid = base.isLiquid;
    stock.status = base.status;

    if (this.mode === 'add') {
      stock.quantity = base.quantity + stock.quantity;
    } else {
      stock.quantity = base.quantity - stock.quantity;
    }
    const promise = this.stockService.updateStock(stock);

    return promise.then((data) => {
      if (this.mode != 'table') {
        this.formsStockService.formStock?.reset()
        this.myFormStock?.resetForm();
        this.initValues();
        this.router.navigate(['/inventory/stock/']);
      } else {
        this.router.navigate(['/inventory/stock/']);
      }
    }).catch(() => {
      this.formsStockService.formStock?.reset()
      this.myFormStock?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });
  }

}
