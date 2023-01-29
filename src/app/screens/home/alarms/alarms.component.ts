import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alarm } from 'app/shared/models/alarms.interfaces';
import { Role } from 'app/shared/models/role';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { AlarmsService } from './services/alarms.service';
import { FormsAlarmsService } from './services/forms-alarms.service';
import { TableAlarmsService } from './services/table-alarms.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss'],
})
export class AlarmsComponent implements OnInit {
  @ViewChild('myFormAlarm', { static: false }) myFormAlarm: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public disabled = false;
  public title = 'Agregar Usuario';
  public hidePassword = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableAlarmsService: TableAlarmsService,
    public formsAlarmsService: FormsAlarmsService,
    public configService: ConfigurationService,
    private alarmsService: AlarmsService
  ) {
    this.formsAlarmsService.idAlarm =
      this.route.snapshot.paramMap.get('id') ?? '';
  }

  ngAfterViewInit(): void {}

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.profileList = [
      this.configService.adminUser,
      this.configService.manageUser,
      this.configService.partnerUser,
      this.configService.cleanerUser,
    ];
    this.mode = this.route.snapshot.data['mode'];
    try {
      await this.initValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    if (this.mode !== 'edit') {
      this.title = 'Alarmas';
      await this.formsAlarmsService.createForm(this.mode);
      await this.tableAlarmsService.assignInitialValues();
    }
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'edit':
          this.title = 'Editar Alarma';
          break;

        case 'create':
          this.title = 'Alarmas';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsAlarmsService.createForm(this.mode);
    }
  }

  public addAlarmButton() {
    this.formsAlarmsService.idAlarm = '';
    this.router.navigate(['/alarms/create']);
  }

  public back() {
    this.router.navigate(['/alarms/']);
  }

  public select(event: any) {
    const product = this.formsAlarmsService.productList.find(
      (data) => data.id === event.value
    );
    this.formsAlarmsService.formAlarm?.patchValue({
      isLiquid: product?.isLiquid,
      statusProduct: product?.status,
    });
  }

  public saveAlarm() {
    if (!this.formsAlarmsService.formAlarm?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    this.formsAlarmsService.formAlarm.controls['isLiquid'].enable();
    this.formsAlarmsService.formAlarm.controls['statusProduct'].enable();
    const { name, isLiquid, quantityTrigger, statusProduct } =
      this.formsAlarmsService.formAlarm?.value;
    const alarm: Alarm = {
      name,
      isLiquid,
      quantityTrigger: parseInt(quantityTrigger),
      statusProduct,
    };
    alarm.idProduct = alarm?.name?.toString()
    delete alarm['name'];
    if (this.mode === 'create') {
      delete alarm['isLiquid'];
      delete alarm['statusProduct'];
    } else{
      alarm.status = Boolean(alarm?.statusProduct);
      alarm.observation = '';
      alarm.id=this.formsAlarmsService.idAlarm;
      delete alarm['statusProduct'];
      alarm.idProduct = parseInt(alarm.idProduct?? '');
    }
    this.formsAlarmsService.formAlarm.controls['isLiquid'].disable();
    this.formsAlarmsService.formAlarm.controls['statusProduct'].disable();
    const promise =
      this.mode === 'edit'
        ? this.alarmsService.updateAlarm(alarm)
        : this.alarmsService.createAlarm(alarm);

    return promise
      .then((data) => {
        if (this.mode === 'edit') {
        } else {
          this.router.navigate(['/alarms/']);
        }
      })
      .catch(() => {
        this.formsAlarmsService.formAlarm?.reset();
        this.myFormAlarm?.resetForm();
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }
}
