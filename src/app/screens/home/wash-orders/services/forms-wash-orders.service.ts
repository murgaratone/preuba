import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectList, WashOrders, PlateInterface } from 'app/shared/models/wash-orders.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import * as moment from 'moment'
import { WashOrdersService } from './wash-orders.service';

@Injectable({
  providedIn: 'root'
})
export class FormsWashOrdersService {

  public formWashOrders: FormGroup | undefined;
  public washOrders: WashOrders | undefined;  
  public plate: PlateInterface | undefined;
  public idWashOrders: string = '';
  public cleaners: SelectList[] | undefined;
  public tracks: SelectList[] | undefined;
  public serviceTypes: SelectList[] | undefined;
  public vehicleTypes: SelectList[] | undefined;
  public brands: SelectList[] | undefined;
  public validator = '^([a-zA-z]{2}\[0-9]{4})|([0-9]{6})$';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private washOrdersService: WashOrdersService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formWashOrders = this.fb.group({
      plate: [''],
      serviceType: ['', [Validators.required]],
      cleaner: ['', [Validators.required]],
      washingTrack: ['', [Validators.required]],
      name: [''],
      lastName: [''],
      secondLastName: [''],
      brand: [''],
      vehicleType: [''],
      servicePrice: [''],
      washOrderDate: [''],
      id: [''],
      status: [''],
    }, {
    });    
    
    this.tracks = await this.washOrdersService.getTracks();
    this.serviceTypes = await this.washOrdersService.getserviceTypes();
    const customers = await this.washOrdersService.getCleaners();
    this.cleaners = customers.filter( (item: { title: string; }) => item.title == 'Cleaner')

    if (mode != 'create') {
      const resWashOrders = await this.washOrdersService.getWashOrder(this.idWashOrders);      
      const resBrands = await this.washOrdersService.getBrands(resWashOrders[0].idBrand);
      const resVehicleType = await this.washOrdersService.getVehicleTypes(resWashOrders[0].idVehicleType);
      this.washOrders = resWashOrders[0];

      if (this.washOrders) {
        this.formWashOrders.setValue({
          status: this.washOrders.status ?? '',
          id: this.washOrders.id ?? '',
          plate: this.plate ?? '',
          serviceType: this.washOrders.idCombo ?? '',
          cleaner: this.washOrders.idCleaner?? '',
          washingTrack: this.washOrders.idWashingTrack ?? '',
          name: this.washOrders.customerName ?? '',
          lastName: this.washOrders.customerLastName ?? '',
          secondLastName: this.washOrders.customerSecondLastName ?? '',
          brand: resBrands[0].name ?? '',
          vehicleType: resVehicleType[0].name ?? '',
          servicePrice: this.washOrders.servicePrice ?? '',
          washOrderDate: this.washOrders.washOrderDate ? moment(this.washOrders.washOrderDate).add(1, 'day').format('DD-MMM-YYYY') : '',
        });
      }
    }

    if (mode !== 'edit') {
      this.formWashOrders.controls['serviceType'].disable();
      this.formWashOrders.controls['cleaner'].disable();
      this.formWashOrders.controls['washingTrack'].disable();
    }    
    
    this.formWashOrders.controls['name'].disable();
    this.formWashOrders.controls['lastName'].disable();
    this.formWashOrders.controls['secondLastName'].disable();
    this.formWashOrders.controls['brand'].disable();
    this.formWashOrders.controls['vehicleType'].disable();
    this.formWashOrders.controls['servicePrice'].disable();

    this.configService.setLoadingPage(false);
  }


  public async createFormBySearch(plate: any) {
    this.formWashOrders = this.fb.group({   
      plate: ['', [Validators.required, Validators.pattern(this.validator), Validators.maxLength(6), Validators.minLength(6)]],
      serviceType: [''],
      cleaner: [''],
      washingTrack: [''],
      name: [''],
      lastName: [''],
      secondLastName: [''],
      brand: [''],
      vehicleType: [''],
      servicePrice: [''],
      id: [''],
    }, {
    });
    
    this.tracks = await this.washOrdersService.getTracks();
    this.serviceTypes = await this.washOrdersService.getserviceTypes();
    const customers = await this.washOrdersService.getCleaners();
    this.cleaners = customers.filter( (item: { title: string; }) => item.title == 'Cleaner')

    const result = await this.washOrdersService.getCustomerInfoByPlate(plate);
    this.washOrders = result[0];    
    
    this.formWashOrders.setValue({
      plate: plate,
      id: this.washOrders?.id ?? '',
      name: this.washOrders?.customerName ?? '',
      lastName: this.washOrders?.customerLastName ?? '',
      secondLastName: this.washOrders?.customerSecondLastName ?? '',
      vehicleType: this.washOrders?.vehicleType ?? '',
      brand: this.washOrders?.brand ?? '',
      serviceType: this.washOrders?.serviceType ?? '',
      servicePrice: this.washOrders?.servicePrice ?? '',
      washingTrack: this.washOrders?.washingTrack ?? '',
      cleaner: this.washOrders?.cleaner ?? ''
    });

    this.formWashOrders.controls['name'].disable();
    this.formWashOrders.controls['lastName'].disable();
    this.formWashOrders.controls['secondLastName'].disable();
    this.formWashOrders.controls['brand'].disable();
    this.formWashOrders.controls['vehicleType'].disable();
    this.formWashOrders.controls['servicePrice'].disable();
    
    this.configService.setLoadingPage(false);
  }

}
