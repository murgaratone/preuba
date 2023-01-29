import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public dataApiService: DataApiService,
  ) { }


}
