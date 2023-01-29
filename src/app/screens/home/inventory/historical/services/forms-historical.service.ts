import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoricalProduct } from 'app/shared/models/historical-product.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';

@Injectable({
  providedIn: 'root'
})
export class FormsHistoricalService {

  public formHistoricalProduct: FormGroup | undefined;
  public historicalProduct: HistoricalProduct | undefined;
  public startDate: string = '';
  public endDate: string = '';
  public validator = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formHistoricalProduct = this.fb.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
    }, { });

    this.configService.setLoadingPage(false);
  }
}
