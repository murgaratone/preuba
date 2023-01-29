import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormsPistaService } from './service/forms-pista.service';
import { TablePistaService } from './service/table-pista.service';
import { PistaService } from './service/pista.service';
import { WashingTracks } from 'app/shared/models/pista.interfaces';

@Component({
  selector: 'app-pista',
  templateUrl: './pista.component.html',
  styleUrls: ['./pista.component.scss'],
})
export class PistaComponent implements OnInit {
  @ViewChild('myFormUser', { static: false }) myFormUser: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public title = 'Agregar Pista';
  public disabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableWashingTracksService: TablePistaService,
    public formsWashingTracksService: FormsPistaService,
    public configService: ConfigurationService,
    private WashingTracksService: PistaService
  ) {
    this.formsWashingTracksService.washingTrackId =
      this.route.snapshot.paramMap.get('id') ?? '';
    this.tableWashingTracksService.washingTrackId =
      this.formsWashingTracksService.washingTrackId;
  }

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.mode = this.route.snapshot.data['mode'];
    try {
      await this.initValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  newWashingTracksButton() {
    this.router.navigate(['settings/pista/create']);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    await this.tableWashingTracksService.assignInitialValues(this.mode);
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'create':
          this.title = 'Agregar Pista';
          break;

        case 'edit':
          this.title = 'Editar Pista';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsWashingTracksService.createForm(this.mode);
    }
  }

  public washingTracksSave() {
    if (!this.formsWashingTracksService.formWashingTracks?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const { name } = this.formsWashingTracksService.formWashingTracks?.value;
    const washingTracks: WashingTracks = {
      name,
      id: this.formsWashingTracksService?.washingTracks?.id,
    };

    const promise =
      this.mode === 'edit'
        ? this.WashingTracksService.updateWashingTracks(washingTracks)
        : this.WashingTracksService.createWashingTracks(washingTracks);

    return promise
      .then((data) => {
        if (this.mode === 'edit') {
          this.router.navigate(['/settings/pista/']);
        } else {
          this.router.navigate(['/settings/pista/']);
        }
      })
      .catch(() => {
        this.formsWashingTracksService.formWashingTracks?.reset();
        this.myFormUser?.resetForm();
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }
}
