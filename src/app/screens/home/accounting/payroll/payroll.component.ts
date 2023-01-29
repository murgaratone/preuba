import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payroll } from 'app/shared/models/payrolls.interfaces';
import { Role } from 'app/shared/models/role';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { FormsPayrollAccountingService } from './service/forms-payroll.accounting.service';
import { PayrollAccountingService } from './service/payroll.accounting.service';
import { TablePayrollAccountingService } from './service/table-payroll.accounting.service';
import * as moment from 'moment';
import { StorageService } from 'app/shared/services/storage.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
})
export class PayrollComponent implements OnInit {
  @ViewChild('myFormPayroll', { static: false }) myFormPayroll:
    | NgForm
    | undefined;

  currentMonth: string;
  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public title = 'Nómina';
  public disabled = false;
  years: any[] = [];
  currentYear = moment().year();
  startYear = 2022;
  endYear = 2080;
  months: any[] = [
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
    private route: ActivatedRoute,
    private router: Router,
    public tablePayrollAccountingService: TablePayrollAccountingService,
    public formsPayrollAccountingService: FormsPayrollAccountingService,
    public configService: ConfigurationService,
    public storageService: StorageService,
    private payrollAccountingService: PayrollAccountingService
  ) {
    this.formsPayrollAccountingService.idPayroll =
      this.route.snapshot.paramMap.get('id') ?? '';
      this.formsPayrollAccountingService.idProfileStatus =
      this.route.snapshot.paramMap.get('idProfileStatus') ?? '';
    console.log(this.formsPayrollAccountingService.idProfileStatus);

    this.currentMonth = this.months[0];
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.years.push(i);
    }
  }

  async ngOnInit(): Promise<void> {
    this.currentMonth = this.months[0];
    this.configService.setLoadingPage(true);
    this.profileList = [
      this.configService.adminUser,
      this.configService.manageUser,
      this.configService.partnerUser,
    ];
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
      await this.tablePayrollAccountingService.assignInitialValues();
    }
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'view':
          this.title = 'Consultar pago';
          this.disabled = false;
          break;

        case 'add':
          this.title = 'Crear pago';
          this.disabled = false;
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsPayrollAccountingService.createForm(this.mode);
    }
  }

  public back() {
    this.router.navigate(['/accounting/payroll/']);
  }

  public select(item: any) {
    this.formsPayrollAccountingService.profileSelect = item.value;
  }

  public generatePyarollSave() {
    if (!this.formsPayrollAccountingService.formPayrollAccounting?.valid) {
      this.configService.validationError();
      return;
    }
    // this.configService.setLoadingPage(true);
    const { name, title, period, yearPay, monthPay, amount,serviceRelatedNotes } =
      this.formsPayrollAccountingService.formPayrollAccounting?.getRawValue();
      const payDate = new Date().toISOString();
    const payrollAccounting: Payroll = {
      name,
      title,
      firstPeriod: period == 'FIRST',
      secondPeriod: period == 'SECOND',
      id: this.formsPayrollAccountingService?.payrollAccounting?.id,
      yearPay: parseInt(yearPay),
      monthPay: this.months.findIndex((item) => monthPay === item) + 1 ?? 0,
      amount,
      payDate,
      idProfilesStatus:
        this.formsPayrollAccountingService.payrollAccounting?.idProfilesStatus,
      view: 'create',
    };

    this.storageService.setValue('payroll-view', payrollAccounting);
    this.tablePayrollAccountingService.confirmValuePay(this.formsPayrollAccountingService.idProfileStatus);
  }

  public generatePyarollView() {
    this.formsPayrollAccountingService.formPayrollAccounting?.patchValue({
      amount: 500000,
    })
    if (!this.formsPayrollAccountingService.formPayrollAccounting?.valid) {
      this.configService.validationError();
      return;
    }

    const { name, title, period, yearPay, monthPay, amount, payDate } =
      this.formsPayrollAccountingService.formPayrollAccounting?.getRawValue();
    const payrollAccounting: Payroll = {
      name,
      title,
      firstPeriod: period == 'FIRST',
      secondPeriod: period == 'SECOND',
      id: this.formsPayrollAccountingService?.payrollAccounting?.id,
      yearPay: parseInt(yearPay),
      monthPay: this.months.findIndex((item) => monthPay === item) + 1 ?? 0,
      amount,
      payDate,
      idProfilesStatus:
        this.formsPayrollAccountingService.payrollAccounting?.idProfilesStatus,
      view: 'view',
    };

    this.tablePayrollAccountingService.viewPage(payrollAccounting);
  }
}
