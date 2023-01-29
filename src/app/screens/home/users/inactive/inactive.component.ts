import { Component, OnInit } from '@angular/core';
import { UserList } from 'app/shared/models/user.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { ActiveUsersService } from '../active/services/active-users.service';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss']
})
export class InactiveComponent implements OnInit {
  headers: string[] = [];
  data: UserList[] = [];
  actions = {
    edit: false,
    view: false,
    delete: false,
    add: false,
    substract: false
  };
  totalPages = 1;
  actualPage = 1;
  viewId = false;

  constructor(
    public activeUserService: ActiveUsersService,
    private configService: ConfigurationService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    try {
      await this.assignInitialValues();
    } finally {
      this.configService.setLoadingPage(false);
    }
  }

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
      }).filter(x => !x.status);
    this.totalPages = result.pages ?? 1;
  }

  public async backPage() {
    try{
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage-1;
      await this.assignInitialValues();
    } finally{
      this.configService.setLoadingPage(false);
    }
  }

  public async nextPage() {
    try{
      this.configService.setLoadingPage(true);
      this.actualPage = this.actualPage+1;
      await this.assignInitialValues();
    } finally{
      this.configService.setLoadingPage(false);
    }
  }

  public changeStatusUser(item: any) {
    return
  }

  public editUser(item: any) {
    return
  }

  public viewUser(item: any) {
    return
  }

}
