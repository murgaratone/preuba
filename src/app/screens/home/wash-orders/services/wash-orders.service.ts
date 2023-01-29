import { Injectable } from '@angular/core';
import { WashOrdersListResult, WashOrdersList, WashOrdersCreate } from 'app/shared/models/wash-orders.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class WashOrdersService {

  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService,
  ) { }

  public getWashOrders(pageNumber?: number, customer?: string, plate?: string): Promise<WashOrdersListResult> {
    return this.dataApiService.getAll(`washing-orders?customer=${customer}&plate=${plate}&pageSize=${this.configService.pageSize}&pageNumber=${pageNumber ?? 1}`, undefined, true);
  }

  public getWashOrder(id: string) {
    return this.dataApiService.getById('washing-orders', id);
  }

  public getCustomerInfoByPlate(plate: string) {
    return this.dataApiService.getById('washing-orders/customer-info', plate);
  } 

  public createWashOrder(washOrders: WashOrdersCreate): Promise<any> {
    return this.dataApiService.post(washOrders, 'washing-orders');
  }

  public updateWashOrder(washOrders: WashOrdersCreate): Promise<any> {
    return this.dataApiService.update(washOrders, 'washing-orders');
  }

  public finishWashOrder(washOrders: WashOrdersCreate): Promise<any> {
    return this.dataApiService.postById(washOrders, 'washing-orders/finish-order');
  }

  public getBrands(id: string) {
    return this.dataApiService.getById('brands', id);
  }

  public getVehicleTypes(id: string) {
    return this.dataApiService.getById('vehicle-types', id);
  }

  public getTracks() {
    return this.dataApiService.getAll('washing-tracks?availableWashingTracks=true','',true);
  }

  public getCleaners() {
    return this.dataApiService.getAll('colaborators?availableCleaners=true','',true);
  }

  public getserviceTypes() {
    return this.dataApiService.getAll('combos','',true);
  }

  // public getserviceTypes(combo?: number, vehicleType?: number): Promise<any> {
  //   return this.dataApiService.getAll(`basic-costs/combos?combo=${combo}&vehicleType=${vehicleType}&pageSize=${this.configService.pageSize}}`, undefined, true);
  // }

}
