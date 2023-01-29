import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { TableVehicleService } from './table-vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class FormsSearchService {

  public formSearch: FormGroup | undefined;
  public hideName: boolean = false;
  public hidePlate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private tableService: TableVehicleService
  ) { }

  public async createForm() {
    this.formSearch = this.fb.group({
      name: [''],
      plate: [''],
    }, {
    });
    this.configService.setLoadingPage(false);
  }

  public changeView(item: 'name' | 'plate') {
    if (item === 'name') {
      if (this.hideName) {
        this.formSearch?.patchValue({
          name: '',
        });
      }
      this.hideName = !this.hideName;
    } else {
      if (this.hidePlate) {
        this.formSearch?.patchValue({
          plate: '',
        });
      }
      this.hidePlate = !this.hidePlate;
    }
    this.tableService.assignInitialValues(this.formSearch?.value.name, this.formSearch?.value.plate);
  }
}
