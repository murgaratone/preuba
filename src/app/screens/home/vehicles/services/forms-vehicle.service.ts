import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectList, Vehicle } from 'app/shared/models/vehicles.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import * as moment from 'moment'
import { VehiclesService } from './vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class FormsVehicleService {

  public formVehicle: FormGroup | undefined;
  public vehicle: Vehicle | undefined;
  public idVehicle: string = '';
  public brands: SelectList[] | undefined;
  public vehicleTypes: SelectList[] | undefined;
  public validator = '^([a-zA-z]{2}\[0-9]{4})|([0-9]{6})$';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private vehicleService: VehiclesService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formVehicle = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      phoneNumber: [undefined, [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      dni: [undefined, [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      registerDate: [undefined, [Validators.required]],
      plate: ['', [Validators.required, Validators.pattern(this.validator), Validators.maxLength(6), Validators.minLength(6)]],
      brand: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
    }, {
    });
    this.brands = await this.vehicleService.getBrands();
    this.vehicleTypes = await this.vehicleService.getVehicleTypes();
    if (mode != 'create') {
      const result = await this.vehicleService.getVehicle(this.idVehicle);
      this.vehicle = result[0];

      if (this.vehicle) {
        this.formVehicle.setValue({
          name: this.vehicle.name ?? '',
          lastName: this.vehicle.lastName ?? '',
          secondLastName: this.vehicle.secondLastName ?? '',
          phoneNumber: this.vehicle.phoneNumber ?? 0,
          dni: this.vehicle.dni ?? '',
          address: this.vehicle.address ?? '',
          email: this.vehicle.email ?? '',
          registerDate: this.vehicle.registerDate ? moment(this.vehicle.registerDate).add(1, 'day').format('YYYY-MM-DD') : '',
          plate: this.vehicle.plate,
          brand: this.vehicle.idBrand ? this.brands?.find(x => x.id === this.vehicle?.idBrand)?.id : '',
          vehicleType: this.vehicle.idVehicleType ? this.vehicleTypes?.find(x => x.id === this.vehicle?.idVehicleType)?.id : '',
        });
      }
    }

    if (mode === 'view') {
      this.formVehicle.controls['name'].disable();
      this.formVehicle.controls['lastName'].disable();
      this.formVehicle.controls['secondLastName'].disable();
      this.formVehicle.controls['phoneNumber'].disable();
      this.formVehicle.controls['dni'].disable();
      this.formVehicle.controls['address'].disable();
      this.formVehicle.controls['email'].disable();
      this.formVehicle.controls['registerDate'].disable();
      this.formVehicle.controls['plate'].disable();
      this.formVehicle.controls['brand'].disable();
      this.formVehicle.controls['vehicleType'].disable();
    }

    this.configService.setLoadingPage(false);
  }
}
