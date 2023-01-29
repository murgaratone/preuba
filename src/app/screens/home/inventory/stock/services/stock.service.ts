import { Injectable } from '@angular/core';
import { Stock, StockListResult } from 'app/shared/models/stock.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService,
  ) { }

  public getAllStock(pageNumber?: number): Promise<StockListResult> {
    return this.dataApiService.getAll(`inventory?pageSize=${this.configService.pageSize}&pageNumber=${pageNumber??1}`, undefined, true);
  }
  
  public getStock(id: string) {
    return this.dataApiService.getById('inventory', id);
  }

  public updateStock(stock: Stock): Promise<any> {
    return this.dataApiService.update(stock, 'inventory');
  }

  public getSelectedUnits() {
    return this.dataApiService.getAll('combos','',true);
  }

}
