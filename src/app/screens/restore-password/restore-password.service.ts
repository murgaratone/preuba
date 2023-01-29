import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class RestorePasswordService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public restorePassword(body: any): Promise<any> {
    return this.dataApiService.post(body, 'recovery-password');
  }


}
