import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'app/components/confirmation-dialog/confirmation-dialog.component';
import { Dialogs } from 'app/shared/models/dialog.class';
import { User, UserList } from 'app/shared/models/user.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { ActiveUsersService } from './active-users.service';

@Injectable({
  providedIn: 'root'
})
export class TableActiveUsersService {
  headers: string[] = [];
  data: UserList[] = [];
  actions = {
    edit: true,
    view: true,
    delete: true,
    add: false,
    substract: false
  };
  disableEditItemWithStatus = true;
  totalPages = 1;
  actualPage = 1;
  viewId = false;

  constructor(
    public activeUserService: ActiveUsersService,
    private router: Router,
    public dialog: MatDialog,
    private configService: ConfigurationService,
  ) { }

  public async assignInitialValues() {
    this.headers = ['Nombre', 'Primer apellido', 'Segundo apellido', 'Celular', 'Perfil'];
    const result = await this.activeUserService.getUsers(this.actualPage);
    this.data = result.data.map(item =>
      { return {
          id: item.id ?? '',
          name: item.name ?? '',
          lastName: item.lastName ?? '',
          secondLastName: item.secondLastName ?? '',
          phoneNumber: item.phoneNumber ?? '',
          title: item.title ?? '',
          status: item.status ?? ''
        }
      });
    this.totalPages = result.pages ?? 1;
  }

  public changeStatusUser(item: any) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: new Dialogs('confirm', '¿Estás seguro de cambiar el estado del usuario?', 'Este es un porceso revercible', 'Cancel', 'Confirmar'), width: '350px'
    });

    setTimeout(() => {
      this.data.forEach(x => {
        if (x.id === item.id) {
          x.status = !x.status
        }
      })
    }, 80);

    dialog.afterClosed().subscribe(async result => {
      if (result != undefined) {
        if (result.action == 'accept') {
          this.configService.setLoadingPage(true);
          await this.activeUserService.disableUser(item);
          location.reload();
          this.configService.setLoadingPage(false);
        }
      }

    });
  }

  public editUser(item: any) {
    this.router.navigate(['/users/active/edit', item.id]);
  }

  public viewUser(item: any) {
    this.router.navigate(['/users/active/view', item.id]);
  }

  public async backPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage - 1;
      await this.assignInitialValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

  public async nextPage() {
    try {
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage + 1;
      await this.assignInitialValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

}
