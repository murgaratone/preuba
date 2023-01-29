import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WashingTracks } from 'app/shared/models/pista.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { PistaService } from './pista.service';

@Injectable({
  providedIn: 'root'
})
export class FormsPistaService {

  public formWashingTracks: FormGroup | undefined;
  public washingTracks: WashingTracks | undefined;
  public washingTrackId: string = '';

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private washingTracksService: PistaService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formWashingTracks = this.fb.group({
      name: ['', [Validators.required]],
    }, {
    });
    if (mode != 'create') {
      const result = await this.washingTracksService.getWashingTrack(this.washingTrackId);
      this.washingTracks = result[0];

      if(this.washingTracks){
        this.formWashingTracks.setValue({
          name: this.washingTracks.name ?? '',
        });
      }
    }

    if (mode === 'view') {
      this.formWashingTracks.controls['name'].disable();
    }

    this.configService.setLoadingPage(false);
  }
}
