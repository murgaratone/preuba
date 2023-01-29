import { Injectable } from '@angular/core';
import {
  WashingTracks,
  WashingTracksResult,
} from 'app/shared/models/pista.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { DataApiService } from 'app/shared/services/data-api.service';
import { firstValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PistaService {
  constructor(
    public dataApiService: DataApiService,
    private configService: ConfigurationService
  ) {}

  public getWashingTracks(pageNumber?: number): Promise<WashingTracksResult> {
    return this.dataApiService.getAll(
      `washing-tracks?pageSize=${this.configService.pageSize}&pageNumber=${
        pageNumber ?? 1
      }`,
      undefined,
      true
    );
  }

  public getWashingTrack(id: string) {
    return this.dataApiService.getById('washing-tracks', id);
  }

  public createWashingTracks(washingTracks: WashingTracks): Promise<any> {
    return this.dataApiService.post(washingTracks, 'washing-tracks');
  }

  public updateWashingTracks(washingTracks: WashingTracks): Promise<any> {
    return this.dataApiService.update(washingTracks, 'washing-tracks');
  }
}
