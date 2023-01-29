import { Injectable } from '@angular/core';
import { HistoricalProductListResult } from 'app/shared/models/historical-product.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {

  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService,
  ) { }

  public getHistoricalProducts(startDate: string, endDate: string, pageNumber?: number): Promise<HistoricalProductListResult> {
    return this.dataApiService.getAll(
        `inventory-history?pageSize=${this.configService.pageSize}&pageNumber=${pageNumber??1}&fromDate=${startDate}&toDate=${endDate}`, 
        undefined, true);
  }
  
  public getHistoricalProductsPdf(startDate: string, endDate: string, pageNumber?: number) {
    return this.dataApiService.getPDF(
        `inventory-history-pdf?pageSize=${this.configService.pageSize}&pageNumber=${pageNumber??1}&fromDate=${startDate}&toDate=${endDate}`, 
        undefined);
  }

}
