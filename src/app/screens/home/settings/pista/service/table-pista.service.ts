import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { Dialogs } from 'app/shared/models/dialog.class';
import { WashingTracks } from 'app/shared/models/pista.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { async } from 'rxjs';
import { PistaService } from './pista.service';

@Injectable({
  providedIn: 'root'
})
export class TablePistaService {
  headers: string[] = [];
  data: WashingTracks[] = [];
  actions = {
    edit: true,
    view: false,
    delete: false,
    add: false,
    substract: false
  };
  totalPages = 1;
  actualPage = 1;
  viewId = false;
  washingTrackId?: string;

  constructor(
    public washingTracksService: PistaService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues(mode: modeViewCrud) {
    this.headers = ['Nombre'];
    const result = await this.washingTracksService.getWashingTracks(this.actualPage);
    this.data = result.data.map(data =>({...data, select: data.id == this.washingTrackId, status: (mode === 'edit' || mode === 'create')? false: true }));
    this.totalPages = result.pages ?? 1;
  }

  public scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  public editWashingTracks(item: any) {
    this.router.navigate(['/settings/pista/edit', item.id]);
  }

  public viewWashingTracks(item: any) {
    this.router.navigate(['/settings/pista/view', item.id]);
  }

  public async backPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage - 1;
      await this.assignInitialValues('table');
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  public async nextPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage + 1;
      await this.assignInitialValues('table');
    } finally {
      this.configService.setLoadingPage(false);
    }
  }
}
