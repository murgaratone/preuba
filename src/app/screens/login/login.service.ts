import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public dataApiService: DataApiService,
  ) { }

  public async login(body: any): Promise<any> {
    return await this.dataApiService.postHeader(body, 'login', [{name:'auth-token', key:'token'}]);
  }

}
