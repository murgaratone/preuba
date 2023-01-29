import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'app/shared/models/product.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ProductService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class FormsProductsService {

  public formProduct: FormGroup | undefined;
  public product: Product | undefined;
  public idProduct: string = '';
  public validator = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private productService: ProductService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formProduct = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      isLiquid: ['', [Validators.required]],
      status: ['', [Validators.required]],
    }, {
    });
    if (mode != 'create') {
      const result = await this.productService.getProduct(this.idProduct);
      this.product = result[0];
      
      if (this.product) {
        this.formProduct.setValue({
          name: this.product.name ?? '',
          code: this.product.code ?? '',
          isLiquid: this.product.isLiquid ? 'SI' : 'NO',
          status: this.product.status ? 'ACTIVO' : 'INACTIVO'
        });
      }      
    }

    this.configService.setLoadingPage(false);
  }
}
