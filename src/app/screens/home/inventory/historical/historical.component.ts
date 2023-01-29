import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormsHistoricalService } from './services/forms-historical.service';
import { TableHistoricalService } from './services/table-historical.service'
import { HistoricalService } from './services/historical.service';
import { Role } from 'app/shared/models/role';
import { SearchDates } from 'app/shared/models/search-dates.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  @ViewChild('myFormProduct', { static: false }) myFormProduct: NgForm | undefined;

  public mode: modeViewCrud = 'search';
  public profileList: Role[] = [];
  public title = 'Histórico de inventario';
  public disabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,    
    public tableHistoricalService : TableHistoricalService,
    public formsHistoricalService: FormsHistoricalService,
    public configService: ConfigurationService,
    private historicalService: HistoricalService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.profileList = [this.configService.adminUser, this.configService.manageUser]
    this.mode = this.route.snapshot.data['mode'];
    try {
      this.mode = 'search'
      await this.searchValues();
      this.configService.setLoadingPage(true);
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  private async searchValues(startDate?: any, endDate?: any) {
    if (this.mode === 'search') {
      await this.formsHistoricalService.createForm(this.mode);      
    }
    if (this.mode != 'search') {
      switch (this.mode) {
        case 'table':
          this.disabled = false;
          await this.tableHistoricalService.assignSearchValues(startDate, endDate);
          break;
        
        case 'download':
          this.disabled = false;
          break;

        default:
          this.title = '';
          break;
      }     
    }
  }

  public searchHistoricalProduct() {
    if (!this.formsHistoricalService.formHistoricalProduct?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const {startDate, endDate} = this.formsHistoricalService.formHistoricalProduct?.value;
    const searchDates: SearchDates = {
      startDate: moment(startDate).format('YYYY-MM-DD'), 
      endDate: moment(endDate).format('YYYY-MM-DD')
    };

    const promise = this.historicalService.getHistoricalProducts(searchDates.startDate, searchDates.endDate);

    return promise.then((data) => {
      if (this.mode === 'search') {
        this.mode = 'table';
        this.searchValues(searchDates.startDate, searchDates.endDate);
        this.router.navigate(['/inventory/historical/']);
      } else {
        this.router.navigate(['/inventory/historical/']);
      }
    }).catch(() => {
      this.formsHistoricalService.formHistoricalProduct?.reset()
      this.myFormProduct?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });
  }  

  public downloadReportHistoricalProduct() : void {
    if (!this.formsHistoricalService.formHistoricalProduct?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const {startDate, endDate} = this.formsHistoricalService.formHistoricalProduct?.value;
    const searchDates: SearchDates = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD')
    };
    let fileName = '';
    this.historicalService.getHistoricalProductsPdf(searchDates.startDate, searchDates.endDate).then(response => {
      fileName = 'report.pdf'
      this.managePDFlFile(response, fileName);
    }).catch(() => {
      this.formsHistoricalService.formHistoricalProduct?.reset()
      this.myFormProduct?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });    
  }

  managePDFlFile(response: any, fileName: string): void {
    if (response) {
      let blob: Blob = response as Blob      
      let fileURL = URL.createObjectURL(blob);
      window.open(fileURL); 

      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      a.target = '_blank';
      a.click();
      this.snackBar.open('Archivo descargado', 'x', {
        duration: 100000,
        panelClass: ['snackbar-success'],
      });
    }
  }

}
