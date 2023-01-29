import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { TableWashOrdersService } from './table-wash-orders.service';

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
    private tableWashOrdersService: TableWashOrdersService
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
    this.tableWashOrdersService.assignInitialValues(this.formSearch?.value.name, this.formSearch?.value.plate);
  }
}
