import { Injectable } from '@angular/core';
import { DataApiService } from 'app/shared/services/data-api.service';

interface CombosList{
  id: string,
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class CostsService {
  constructor(
    public dataApiService: DataApiService,
  ) {}

  public getCombos(): Promise<CombosList[]> {
    return this.dataApiService.getAll(`combos`, undefined,  true );
  }

}
