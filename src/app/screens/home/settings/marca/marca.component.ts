import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormMarcaService } from './service/form-marca.service';
import { TableMarcaService } from './service/table-marca.service';
import { MarcaService } from './service/marca.service';
import { BrandVehicle } from 'app/shared/models/marca.interfaces';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss'],
})
export class MarcaComponent implements OnInit {
  @ViewChild('myFormUser', { static: false }) myFormUser: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public title = 'Agregar Marca';
  public disabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableMarcaService: TableMarcaService,
    public formMarcaService: FormMarcaService,
    public configService: ConfigurationService,
    private marcaService: MarcaService
  ) {
    this.formMarcaService.brandId =
      this.route.snapshot.paramMap.get('id') ?? '';
    this.tableMarcaService.brandId =
      this.formMarcaService.brandId;
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

  newBrandButton() {
    this.router.navigate(['settings/marca/create']);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private async initValues() {
    this.configService.setLoadingPage(true);
    await this.tableMarcaService.assignInitialValues(this.mode);
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'create':
          this.title = 'Agregar Marca';
          break;

        case 'edit':
          this.title = 'Editar Marca';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formMarcaService.createForm(this.mode);
    }
  }

  public brandSave() {
    if (!this.formMarcaService.formBrandVehicle?.valid) {
      this.configService.validationError();
      return;
    }
    this.configService.setLoadingPage(true);
    const { name } =
     this.formMarcaService.formBrandVehicle?.value;
    const brandVehicle: BrandVehicle = {
      name,
      id: this.formMarcaService?.brandVehicle?.id,
    };

    const promise =
      this.mode === 'edit'
        ? this.marcaService.updateBrandVehicle(brandVehicle)
        : this.marcaService.createBrandVehicle(brandVehicle);

    return promise
      .then((data) => {
        if (this.mode === 'edit') {
          this.router.navigate(['/settings/marca/']);
        } else {
          this.router.navigate(['/settings/marca/']);
        }
      })
      .catch(() => {
        this.formMarcaService.formBrandVehicle?.reset();
        this.myFormUser?.resetForm();
      })
      .finally(() => {
        this.configService.loading = false;
      });
  }
}
