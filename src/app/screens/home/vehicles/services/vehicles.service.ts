import { Injectable } from '@angular/core';
import { Vehicle, VehiclesListResult } from 'app/shared/models/vehicles.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService,
  ) { }

  public getVehicles(pageNumber?: number, name?: string, plate?: string): Promise<VehiclesListResult> {
    return this.dataApiService.getAll(`customers?name=${name}&plate=${plate}&pageSize=${this.configService.pageSize}&pageNumber=${pageNumber ?? 1}`, undefined, true);
  }

  public getVehicle(id: string) {
    return this.dataApiService.getById('customers', id);
  }

  public getBrands() {
    return this.dataApiService.getAll('brands','',true);
  }

  public getVehicleTypes() {
    return this.dataApiService.getAll('vehicle-types','',true);
  }

  public createVehicle(vehicle: Vehicle): Promise<any> {
    return this.dataApiService.post(vehicle, 'customers');
  }

  public updateVehicle(vehicle: Vehicle): Promise<any> {
    return this.dataApiService.update(vehicle, 'customers');
  }

}
