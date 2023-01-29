import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alarm, ListInterface, ListProductInterface } from 'app/shared/models/alarms.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import * as moment from 'moment'
import { AlarmsService } from './alarms.service';

@Injectable({
  providedIn: 'root'
})
export class FormsAlarmsService {

  public formAlarm: FormGroup | undefined;
  public alarm: Alarm | undefined;
  public idAlarm: string = '';
  public validator = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';
  public isLiquid: boolean | null= null
  public productList: ListProductInterface[] =[];
  public isLiquidList: ListInterface[] =[{id:true, name: 'SI'}, {id:false, name: 'NO'}];
  public statusList: ListInterface[] =[{id:true, name: 'ACTIVO'}, {id:false, name: 'INACTIVO'}];

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private alarmsService: AlarmsService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formAlarm = this.fb.group({
      name: ['', [Validators.required]],
      isLiquid: ['', [Validators.required]],
      quantityTrigger: [null, [Validators.required]],
      statusProduct: ['', [Validators.required]],
    }, {
    });
    let products = await this.alarmsService.getProducts();
    products =products.filter((data) => data.status);    
    this.productList= products.map((data) =>{
      return{
        id:data.id?? '',
        name: data.name,
        isLiquid: Boolean(data.isLiquid),
        status: Boolean(data.status)
      }
    });
    if (mode != 'create') {
      const result = await this.alarmsService.getAlarm(this.idAlarm);
      
      this.alarm = result[0];
      
      if (this.alarm) {
        this.formAlarm.setValue({
          name: this.alarm.idProduct ?? '',
          isLiquid: this.alarm.isLiquid?? '',
          quantityTrigger: this.alarm.quantityTrigger?? '',
          statusProduct: this.alarm.statusProduct?? '',
        });
      }      
    }
    this.formAlarm.controls['isLiquid'].disable();
    this.formAlarm.controls['statusProduct'].disable();
    this.configService.setLoadingPage(false);
  }
}
