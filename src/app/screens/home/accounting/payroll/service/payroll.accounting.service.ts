import { Injectable } from '@angular/core';
import {
  Payroll,
  PayrollResult,
} from 'app/shared/models/payrolls.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PayrollAccountingService {
  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) {}

  public getPayrolls(pageNumber?: number): Promise<PayrollResult> {
    return this.dataApiService.getAll(
      `colaborators?pageSize=${this.configService.pageSize}&pageNumber=${
        pageNumber ?? 1
      }`,
      undefined,
      true
    );
  }

  public getPayroll(id: string) {
    return this.dataApiService.getById('colaborators', id);
  }

  public createPayroll(payroll: Payroll): Promise<any> {
    return this.dataApiService.post(payroll, 'admin-pay');
  }

  public updatePayroll(payroll: Payroll): Promise<any> {
    return this.dataApiService.update(payroll, 'admin-pay');
  }
}
