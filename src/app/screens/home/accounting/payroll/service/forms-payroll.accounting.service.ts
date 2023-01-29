import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payroll } from 'app/shared/models/payrolls.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { PayrollAccountingService } from './payroll.accounting.service';

@Injectable({
  providedIn: 'root',
})
export class FormsPayrollAccountingService {
  public formPayrollAccounting: FormGroup | undefined;
  public payrollAccounting: Payroll | undefined;
  public profileSelect: number = 0;
  idProfileStatus: string = '';
  idPayroll : string = '';
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
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private payrollAccountingService: PayrollAccountingService
  ) {}

  public async createForm(mode: modeViewCrud) {
    this.formPayrollAccounting = this.fb.group(
      {
        name: ['', [Validators.required]],
        title: ['', [Validators.required]],
        yearPay: ['', [Validators.required]],
        monthPay: ['', [Validators.required]],
        period: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        payDate: '',
      },
      {}
    );
    console.log(this.formPayrollAccounting);

    if (mode != 'table') {
      const result = await this.payrollAccountingService.getPayroll(
        this.idPayroll
      );
      this.payrollAccounting = result[0];
      if (this.payrollAccounting) {
        let period = '';
        if (this.payrollAccounting.firstPeriod) {
          period = 'FIRST';
        } else if (this.payrollAccounting.secondPeriod) {
          period = 'SECOND';
        }
        this.formPayrollAccounting.setValue({
          name: (this.payrollAccounting.name ?? '') + ' ' + (this.payrollAccounting.lastName ?? ''),
          title: this.payrollAccounting.title ?? '',
          yearPay: this.payrollAccounting.yearPay ?? '',

        // recordad posible cambio para fechas +1 o -1
          monthPay:
            this.months[(this.payrollAccounting.monthPay ?? 0)  ] ?? '',
          period: period,
          amount: this.payrollAccounting.amount ?? '',
          payDate: this.payrollAccounting.payDate ?? '',
        });
      }
    }

    this.formPayrollAccounting.controls['name'].disable();
    this.formPayrollAccounting.controls['title'].disable();
    if (mode === 'view') {
      this.formPayrollAccounting.controls['yearPay'].enable();
      this.formPayrollAccounting.controls['monthPay'].enable();
      this.formPayrollAccounting.controls['amount'].enable();
    }

    this.configService.setLoadingPage(false);
  }
}
