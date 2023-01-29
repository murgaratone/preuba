import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'app/shared/models/role';
import { WashOrders, WashOrdersList, PlateInterface, WashOrdersCreate } from 'app/shared/models/wash-orders.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { FormsWashOrdersService } from './services/forms-wash-orders.service';
import { TableWashOrdersService } from './services/table-wash-orders.service';
import { WashOrdersService } from './services/wash-orders.service';
import { FormsSearchService } from './services/forms-search-order.service';
import * as moment from 'moment'

@Component({
  selector: 'app-wash-orders',
  templateUrl: './wash-orders.component.html',
  styleUrls: ['./wash-orders.component.scss']
})

export class WashOrdersComponent implements OnInit {
  @ViewChild('myFormWashOrders', { static: false }) myFormWashOrders: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public disabled = false;
  public title = 'Orden de lavado';
  public washOrders: WashOrders | undefined;
  public washOrdersDate: String | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableWashOrdersService: TableWashOrdersService,
    public formsWashOrdersService: FormsWashOrdersService,
    public formsSearchService: FormsSearchService,
    public configService: ConfigurationService,
    private washOrdersService: WashOrdersService
  ) {
    this.formsWashOrdersService.idWashOrders = this.route.snapshot.paramMap.get(
      'id'
    ) ?? '';
  }

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.profileList = [this.configService.adminUser, this.configService.manageUser]
    this.mode = this.route.snapshot.data['mode'];
    try {
      await this.initValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    if (this.mode === 'table') {
      await this.tableWashOrdersService.assignInitialValues();
      this.formsSearchService.createForm();
    }
    if (this.mode != 'table') {
      switch (this.mode) {        
        case 'view':          
          this.title = `Orden de lavado ${this.formsWashOrdersService.idWashOrders}`;
          this.disabled = true;
          break;

        case 'edit':
          this.title = `Editar Orden de lavado ${this.formsWashOrdersService.idWashOrders}`;
          this.disabled = true;
          break;

        case 'create':
          const date = new Date().toJSON();
          this.title = 'Crear Orden de lavado';
          this.washOrdersDate = moment(date).format('DD-MMM-YYYY'),
          this.disabled = true;
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsWashOrdersService.createForm(this.mode);
    }
  }

  public addWashOrderButton() {
    this.router.navigate(['/wash-orders/create']);
  }

  public back() {
    this.router.navigate(['/wash-orders/']);
  }

  public async searchCustomerByPlate() {
    try {      
      if (!this.formsWashOrdersService.formWashOrders?.value.plate) {
        this.configService.validationError();
        return
      }
      this.configService.setLoadingPage(true);
      const { id, plate } = this.formsWashOrdersService.formWashOrders?.value;
      const plateInterface: PlateInterface = { id, plate };
      await this.formsWashOrdersService.createFormBySearch(plateInterface.plate);
    } catch (err) {
      this.formsWashOrdersService.formWashOrders?.reset()
      this.myFormWashOrders?.resetForm();
    } finally {
      this.configService.loading = false;
    }    
  }

  public orderFinished() {
    if (!this.formsWashOrdersService.formWashOrders?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const washOrdersCreate: WashOrdersCreate = {}
    washOrdersCreate.id = this.formsWashOrdersService.washOrders?.orderNumber

    const promise = this.washOrdersService.finishWashOrder(washOrdersCreate);

    return promise.then((data) => {
      this.router.navigate(['/wash-orders/']);
    }).catch(() => {
      this.formsWashOrdersService.formWashOrders?.reset()
      this.myFormWashOrders?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });
  }

  public saveWashOrder() {
    if (!this.formsWashOrdersService.formWashOrders?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const {
      plate,
      cleaner,
      washingTrack,
      serviceType
    } = this.formsWashOrdersService.formWashOrders?.value;
    const washOrdersCreate: WashOrdersCreate = {
      idCleaner: cleaner,
      idWashingTrack: washingTrack,
      idCombo: serviceType
    };
    washOrdersCreate.id = this.formsWashOrdersService.washOrders?.orderNumber
    
    if (this.mode !== 'edit') {
      washOrdersCreate.plate = plate;
      delete washOrdersCreate.id;
    }
    
    const promise =
      this.mode === 'edit'
        ? this.washOrdersService.updateWashOrder(washOrdersCreate)
        : this.washOrdersService.createWashOrder(washOrdersCreate);

    return promise.then((data) => {
      this.router.navigate(['/wash-orders/']);
    }).catch(() => {
      this.formsWashOrdersService.formWashOrders?.reset()
      this.myFormWashOrders?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });
  }

}
