import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleType } from 'app/shared/models/settings.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { TipoVehiculoSettingsService } from './tipo-vehiculo-settings.service';

@Injectable({
  providedIn: 'root'
})
export class FormsTipoVehiculoSettingsService {

  public formVehicleType: FormGroup | undefined;
  public vehicleType: VehicleType | undefined;
  public vehicleId: string = '';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private vehicleTypeSettingsService: TipoVehiculoSettingsService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formVehicleType = this.fb.group({
      name: ['', [Validators.required]],
    }, {
    });
    if (mode != 'create') {
      const result = await this.vehicleTypeSettingsService.getVehicleType(this.vehicleId);
      this.vehicleType = result[0];

      if(this.vehicleType){
        this.formVehicleType.setValue({
          name: this.vehicleType.name ?? '',
        });
      }
    }

    if (mode === 'view') {
      this.formVehicleType.controls['name'].disable();
    }

    this.configService.setLoadingPage(false);
  }
}
