import { Injectable } from '@angular/core';
import { Alarm, AlarmsListResult } from 'app/shared/models/alarms.interfaces';
import { ProductList } from 'app/shared/models/product.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root',
})
export class AlarmsService {
  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) {}

  public getAlarms(pageNumber?: number): Promise<AlarmsListResult> {
    return this.dataApiService.getAll(
      `alarms?pageSize=${this.configService.pageSize}&pageNumber=${
        pageNumber ?? 1
      }`,
      undefined,
      true
    );
  }

  public getAlarm(id: string) {
    return this.dataApiService.getById('alarms', id);
  }

  public createAlarm(user: Alarm): Promise<any> {
    return this.dataApiService.post(user, 'alarms');
  }

  public updateAlarm(user: Alarm): Promise<any> {
    return this.dataApiService.update(user, 'alarms', undefined, true);
  }

  public getNotifications(): Promise<any[]> {
    return this.dataApiService.getAll(
      `notifications`,
      undefined,
      true
    );
  }

  public getProducts(): Promise<ProductList[]> {
    return this.dataApiService.getAll(`products`, undefined, true);
  }
}
