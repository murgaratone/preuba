import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock, SelectList } from 'app/shared/models/stock.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class FormsStockService {

  public formStock: FormGroup | undefined;
  public stock: Stock | undefined;
  public units: SelectList[] | undefined;
  public idProduct: string = '';
  public validator = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';
  public decimalMaxValidator = '^([0-9]{1,5})(([,.]{1})([0-9]{1,2}))?$';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private stockService: StockService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formStock = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      // name: [''],
      // code: [''],
      // units: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0), Validators.max(99999.99), Validators.pattern(this.decimalMaxValidator)]],
      unitPrice: ['', [Validators.required, Validators.min(0), Validators.max(99999.99), Validators.pattern(this.decimalMaxValidator)]],
      relatedNotes: ['', [Validators.max(100)]],
    }, { });

    if (mode != 'table') {
      this.units = await this.stockService.getSelectedUnits();
      const result = await this.stockService.getStock(this.idProduct);
      this.stock = result[0];
      if (this.stock) {
        this.formStock.setValue({
          name: this.stock.name ?? '',
          code: this.stock.code ?? '',
          // units: this.stock.units ?? '',
          quantity: this.stock.quantity ?? '',
          unitPrice: this.stock.unitPrice ?? '',
          relatedNotes: '',
        });
      }
    }

    this.configService.setLoadingPage(false);
  }
}
