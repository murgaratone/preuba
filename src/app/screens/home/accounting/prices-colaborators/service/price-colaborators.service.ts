import { Injectable } from '@angular/core';
import { PricesColaboratorsResult, PricesColaborators } from 'app/shared/models/priceColaborators.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class PriceColaboratorsService {

  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) { }

  public getPricesColaborators(pageNumber?: number): Promise<PricesColaboratorsResult> {
    return this.dataApiService.getAll(
      `prices-colaborators?pageSize=${this.configService.pageSize}&pageNumber=${
        pageNumber ?? 1
      }`,
      undefined,
      true
    );
  }

  public getPricesColaborator(id: string) {
    return this.dataApiService.getById('prices-colaborators', id);
  }

  public createPricesColaborators(pricesColaborators: PricesColaborators): Promise<any> {
    return this.dataApiService.post(pricesColaborators, 'prices-colaborators');
  }

  public getPricesColaboratorsPdf(id: string) {
    return this.dataApiService.getById('admin-pay-pdf', id);
  }
}
