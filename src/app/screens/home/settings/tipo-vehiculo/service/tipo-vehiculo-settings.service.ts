import { Injectable } from '@angular/core';
import {
  VehicleType,
  VehicleTypeResult,
} from 'app/shared/models/settings.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoVehiculoSettingsService {
  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) {}

  public getVehicleTypes(pageNumber?: number): Promise<VehicleTypeResult> {
    return this.dataApiService.getAll(
      `vehicle-types?pageSize=${this.configService.pageSize}&pageNumber=${
        pageNumber ?? 1
      }`,
      undefined,
      true
    );
  }

  public getVehicleType(id: string) {
    return this.dataApiService.getById('vehicle-types', id);
  }

  public createVehicleType(vehicleType: VehicleType): Promise<any> {
    return this.dataApiService.post(vehicleType, 'vehicle-types');
  }

  public updateVehicleType(vehicleType: VehicleType): Promise<any> {
    return this.dataApiService.update(vehicleType, 'vehicle-types');
  }
}
