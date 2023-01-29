import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'app/shared/models/role';
import { Vehicle } from 'app/shared/models/vehicles.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { FormsVehicleService } from './services/forms-vehicle.service';
import { TableVehicleService } from './services/table-vehicle.service';
import { VehiclesService } from './services/vehicles.service';
import * as moment from 'moment'
import { FormsSearchService } from './services/forms-search.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  @ViewChild('myFormVehicle', { static: false }) myFormVehicle: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public disabled = false;
  public title = 'Lista de Vehículos';
  public hidePassword = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableVehicleService: TableVehicleService,
    public formsVehicleService: FormsVehicleService,
    public formsSearchService: FormsSearchService,
    public configService: ConfigurationService,
    private vehicleService:VehiclesService
  ) {
    this.formsVehicleService.idVehicle = this.route.snapshot.paramMap.get(
      'id'
    ) ?? '';
  }

  ngAfterViewInit(): void {
    this.tableVehicleService.actions.edit = (this.configService.role === this.configService.manageUser.key);
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

  private async initValues() {
    this.configService.setLoadingPage(true);
    if (this.mode === 'table') {
      await this.tableVehicleService.assignInitialValues();
      this.formsSearchService.createForm();
    }
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'view':
          this.title = 'Vehículo';
          this.disabled = true;
          break;

        case 'edit':
          this.title = 'Editar Vehículo';
          break;

        case 'create':
          this.title = 'Agregar Vehículo';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsVehicleService.createForm(this.mode);
    }
  }

  public addVehicleButton() {
    this.router.navigate(['/vehicles/create']);
  }

  public back() {
    this.router.navigate(['/vehicles/']);
  }

  public saveVehicle() {
    if (!this.formsVehicleService.formVehicle?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const {
      name,
      lastName,
      secondLastName,
      phoneNumber,
      dni,
      email,
      registerDate,
      address,
      plate,
      brand,
      vehicleType
    } = this.formsVehicleService.formVehicle?.value;
    const vehicle: Vehicle = {
      name,
      lastName,
      secondLastName,
      phoneNumber,
      dni,
      email,
      address,
      registerDate: moment(registerDate).format('YYYY-MM-DD'),
      plate,
      idBrand: brand,
      idVehicleType: vehicleType
    };
    if (this.mode === 'edit') {
      vehicle.id = this.formsVehicleService.vehicle?.id
    }
    const promise =
      this.mode === 'edit'
        ? this.vehicleService.updateVehicle(vehicle)
        : this.vehicleService.createVehicle(vehicle);

    return promise.then((data) => {
      if (this.mode === 'edit') {
      } else {
        this.router.navigate(['/vehicles/']);
      }
    }).catch(() => {
      this.formsVehicleService.formVehicle?.reset()
      this.myFormVehicle?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });
  }

}
