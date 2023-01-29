import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public changePassword(body: any, token: string): Promise<any>{
    const headers = {
      'Content-Type': 'application/json'
     }
    return this.dataApiService.update(body, 'change-password/'+token, headers);
  }

}
