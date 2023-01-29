import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'app/shared/models/role';
import { PricesColaborators } from 'app/shared/models/priceColaborators.interface';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import * as moment from 'moment';
import { PriceColaboratorsService } from './service/price-colaborators.service';
import { PayrollAccountingService } from '../payroll/service/payroll.accounting.service';
import { Payroll } from 'app/shared/models/payrolls.interfaces';
import { FormsPayrollAccountingService } from '../payroll/service/forms-payroll.accounting.service';

@Component({
  selector: 'app-prices-colaborators',
  templateUrl: './prices-colaborators.component.html',
  styleUrls: ['./prices-colaborators.component.scss'],
})
export class PricesColaboratorsComponent implements OnInit {

  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public title = 'Pago N°';
  public disabled = false;
  payrollView: PricesColaborators | undefined;
  public storageValue: Payroll | undefined;
  idProfileStatus: string = '';
  pricesColaboratorsId: string = '';
  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public storageService: StorageService,
    public configService: ConfigurationService,
    public priceColaboratorsService: PriceColaboratorsService,
    public PayrollAccountingService: PayrollAccountingService,
    public formsPayrollAccountingService: FormsPayrollAccountingService,

  ) {
    this.payrollView = storageService.getValue('payroll-view');
    this.idProfileStatus =
      this.route.snapshot.paramMap.get('id') ?? '';
    this.months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
  }

  public back() {
    this.router.navigate(['/accounting/payroll/']);
  }

  getServicePay() {
    return `Pago desde el ${
      this.payrollView?.firstPeriod
        ? 1
        : this.payrollView?.secondPeriod
        ? 15
        : 1
    } al ${
      this.payrollView?.firstPeriod
        ? 15
        : this.payrollView?.secondPeriod
        ? 30
        : 15
    } de ${
      this.payrollView && this.payrollView.monthPay
        ? this.months[this.payrollView.monthPay - 1]
        : ''
    } de ${this.payrollView?.yearPay}`;
  }

  getFecha() {
    moment.locale('es');
    return moment().format('d-MMM-yy');
}

  async ngOnInit(): Promise<void> {
    this.pricesColaboratorsId = "id",
    this.profileList = [
      this.configService.adminUser,
      this.configService.manageUser,
      this.configService.partnerUser,
    ];
    this.storageValue = this.storageService.getValue('payroll-view');

    if (this.formsPayrollAccountingService.payrollAccounting) {
      console.log(this.storageValue?.view);
      }

  }

  public priceSave() {
    const pricesColaborators: PricesColaborators = {
      idProfilesStatus: parseInt(this.idProfileStatus),
      yearPay: this.storageValue?.yearPay,
      monthPay: this.storageValue?.monthPay,
      firstPeriod: this.storageValue?.firstPeriod,
      secondPeriod: this.storageValue?.secondPeriod,
      payDate: this.storageValue?.payDate,
      serviceRelatedNotes: this.getServicePay(),
      idPricesColaborators: this.storageValue?.id,
    };
    const promise =
      this.PayrollAccountingService.createPayroll(pricesColaborators);

    return promise
      .then((data) => {
        if (this.mode === 'add') {
          this.router.navigate(['/accounting/payroll/']);
        } else {
          this.router.navigate(['/accounting/payroll/']);
        }
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }

  public generatePdf(){
    if (!this.formsPayrollAccountingService.formPayrollAccounting?.valid) {
      this.configService.validationError();
      return;
    }
    const promise = this.priceColaboratorsService.getPricesColaboratorsPdf(this.pricesColaboratorsId);
    promise.then(data => {
      // procesar data
    })
    .catch(error => {
      // manejar error
    });
  }
}
