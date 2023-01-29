import { Injectable } from '@angular/core';
import {
  BrandVehicle,
  BrandVehicleResult,
} from 'app/shared/models/marca.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) {}

  public getBrands(pageNumber: number): Promise<BrandVehicleResult> {
    return this.dataApiService.getAll(
      `brands?pageSize=${this.configService.pageSize}&pageNumber=${
        pageNumber ?? 1
      }`,
      undefined,
      true
    );
  }

  public getBrandVehicle(id: string) {
    return this.dataApiService.getById('brands', id);
  }

  public createBrandVehicle(brandVehicle: BrandVehicle): Promise<any> {
    return this.dataApiService.post(brandVehicle, 'brands');
  }

  public updateBrandVehicle(brandVehicle: BrandVehicle): Promise<any> {
    return this.dataApiService.update(brandVehicle, 'brands');
  }
}
