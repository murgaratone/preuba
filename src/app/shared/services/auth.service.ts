import { Injectable } from '@angular/core';
import { DataApiService } from './data-api.service';
import { StorageService } from './storage.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public storageService: StorageService,
    public dataApiService: DataApiService,
    ) { }

  public isLogger() {
    const token = this.storageService.getValue('token');
    return firstValueFrom(of(!!token));
  }

}
