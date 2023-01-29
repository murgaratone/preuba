import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { Dialogs } from 'app/shared/models/dialog.class';
import { Payroll } from 'app/shared/models/payrolls.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { PayrollAccountingService } from './payroll.accounting.service';
import { FormsPayrollAccountingService } from './forms-payroll.accounting.service';

@Injectable({
  providedIn: 'root',
})
export class TablePayrollAccountingService {
  headers: string[] = [];
  data: Payroll[] = [];
  actions = {
    edit: false,
    view: true,
    delete: false,
    add: true,
    substract: false,
  };
  disableEditItemWithStatus = true;
  totalPages = 1;
  actualPage = 1;
  viewId = false;
  payrollId?: string;
  viewStatus = true;
  initialData: any[] = [];

  constructor(
    public payrollAccountingService: PayrollAccountingService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
    public formsPayrollAccountingService: FormsPayrollAccountingService
  ) {}

  public async assignInitialValues() {
    this.headers = ['Nombre', 'Cargo'];
    const result = await this.payrollAccountingService.getPayrolls(
      this.actualPage
    );
    this.initialData = result.data;
    this.data = result.data.map((item) => {
      return {
        id: item.id,
        name: item.name + ' ' + item.lastName + ' ' + item.secondLastName,
        title: item.title,
      };
    });
    this.totalPages = result.pages ?? 1;
  }

  public addPayroll(item: any) {
    const actualItem = this.initialData.find((x) => x.id == item.id);
    this.router.navigate([
      '/accounting/payroll/add', actualItem.id,
      actualItem.idProfilesStatus,
    ]);
  }

  public viewPayroll(item: any) {
    const actualItem = this.initialData.find((x) => x.id == item.id);
    this.router.navigate([
      '/accounting/payroll/view', actualItem.id,
      actualItem.idProfilesStatus,
    ]);
  }

  public confirmValuePay(id: string) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: new Dialogs(
        'confirm',
        'El valor a pagar son ' +
          this.formsPayrollAccountingService.formPayrollAccounting?.value
            .amount,
        '¿Estás seguro?',
        'Cancel',
        'Confirmar'
      ),
      width: '350px',
    });

    dialog.afterClosed().subscribe(async (result) => {
      if (result != undefined) {
        if (result.action == 'accept') {
          // redireccionar a la pagina con el pago correspondiente, para posteriormente guardarlo
          this.router.navigate(['/accounting/prices-colaborators', id]);
        }
      }
    });
  }
  public viewPage(item : any) {
    this.router.navigate(['/accounting/pricesColaborators'], {queryParams:item});
  }

  public async backPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage - 1;
      await this.assignInitialValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  public async nextPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage + 1;
      await this.assignInitialValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }
}
