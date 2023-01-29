import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormsTipoVehiculoSettingsService } from './service/forms-tipo-vehiculo-settings.service';
import { TableTipoVehiculoSettingsService } from './service/table-tipo-vehiculo-settings.service';
import { TipoVehiculoSettingsService } from './service/tipo-vehiculo-settings.service';
import { VehicleType } from 'app/shared/models/settings.interfaces';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.scss'],
})
export class TipoVehiculoComponent implements OnInit {
  @ViewChild('myFormUser', { static: false }) myFormUser: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public title = 'Agregar Vehículo';
  public disabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableTipoVehiculoSettingsService: TableTipoVehiculoSettingsService,
    public formsTipoVehiculoSettingsService: FormsTipoVehiculoSettingsService,
    public configService: ConfigurationService,
    private tipoVehiculoSettingsService: TipoVehiculoSettingsService
  ) {
    this.formsTipoVehiculoSettingsService.vehicleId =
      this.route.snapshot.paramMap.get('id') ?? '';
    this.tableTipoVehiculoSettingsService.vehicleId =
      this.formsTipoVehiculoSettingsService.vehicleId;
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

  newVehicleButton() {
    this.router.navigate(['settings/tipo-vehiculo/create']);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    await this.tableTipoVehiculoSettingsService.assignInitialValues(this.mode);
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'create':
          this.title = 'Agregar Vehículo';
          break;

        case 'edit':
          this.title = 'Editar Vehículo';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsTipoVehiculoSettingsService.createForm(this.mode);
    }
  }

  public vehicleSave() {
    if (!this.formsTipoVehiculoSettingsService.formVehicleType?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const { name } =
      this.formsTipoVehiculoSettingsService.formVehicleType?.value;
    const vehicleType: VehicleType = {
      name,
      id: this.formsTipoVehiculoSettingsService?.vehicleType?.id,
    };

    const promise =
      this.mode === 'edit'
        ? this.tipoVehiculoSettingsService.updateVehicleType(vehicleType)
        : this.tipoVehiculoSettingsService.createVehicleType(vehicleType);

    return promise
      .then((data) => {
        if (this.mode === 'edit') {
          this.router.navigate(['/settings/tipo-vehiculo/']);
        } else {
          this.router.navigate(['/settings/tipo-vehiculo/']);
        }
      })
      .catch(() => {
        this.formsTipoVehiculoSettingsService.formVehicleType?.reset();
        this.myFormUser?.resetForm();
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }
}
