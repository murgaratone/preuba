import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandVehicle} from 'app/shared/models/marca.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { MarcaService } from './marca.service';

@Injectable({
  providedIn: 'root'
})
export class FormMarcaService {

  public formBrandVehicle: FormGroup | undefined;
  public brandVehicle: BrandVehicle | undefined;
  public brandId: string = '';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private brandService: MarcaService
  ) { }

  public async createForm(mode: modeViewCrud, id?: any) {
    this.formBrandVehicle = this.fb.group({
      name: ['', [Validators.required]],
    }, {
    });
    if (mode != 'create') {
      const result = await this.brandService.getBrandVehicle(this.brandId);
      this.brandVehicle = result[0];

      if(this.brandVehicle){
        this.formBrandVehicle.setValue({
          name: this.brandVehicle.name ?? '',
        });
      }
    }

    if (mode === 'view') {
      this.formBrandVehicle.controls['name'].disable();
    }

    this.configService.setLoadingPage(false);
  }
}
