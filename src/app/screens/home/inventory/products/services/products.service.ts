import { Injectable } from '@angular/core';
import { Product, ProductListResult } from 'app/shared/models/product.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService,
  ) { }

  public getProducts(pageNumber?: number): Promise<ProductListResult> {
    return this.dataApiService.getAll(`products?pageSize=${this.configService.pageSize}&pageNumber=${pageNumber??1}`, undefined, true);
  }
  
  public getProduct(id: string) {
    return this.dataApiService.getById('products', id);
  }

  public createProduct(product: Product): Promise<any> {
    return this.dataApiService.post(product, 'products');
  }

  public updateProduct(product: Product): Promise<any> {
    return this.dataApiService.update(product, 'products');
  }

}
