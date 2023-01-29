import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public dataApiService: DataApiService,
  ) { }


}
