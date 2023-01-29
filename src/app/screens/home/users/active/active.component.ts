import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { FormsActiveUsersService } from './services/forms-active-users.service';
import { TableActiveUsersService } from './services/table-active-users.service';
import { ActiveUsersService } from './services/active-users.service';
import { User } from 'app/shared/models/user.interfaces';
import { Role } from 'app/shared/models/role';
import * as moment from 'moment'

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit, AfterViewInit {
  @ViewChild('myFormUser', { static: false }) myFormUser: NgForm | undefined;

  public mode: modeViewCrud = 'table';
  public profileList: Role[] = [];
  public disabled = false;
  public title = 'Agregar Usuario';
  public hidePassword = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public tableActiveUserService: TableActiveUsersService,
    public formsActiveUserService: FormsActiveUsersService,
    public configService: ConfigurationService,
    private activeUserService: ActiveUsersService
  ) {
    this.formsActiveUserService.idUser = this.route.snapshot.paramMap.get(
      'id'
    ) ?? '';
  }

  ngAfterViewInit(): void {
    this.tableActiveUserService.actions.edit = (this.configService.role === this.configService.manageUser.key);
    this.tableActiveUserService.actions.delete = (this.configService.role === this.configService.manageUser.key);
  }

  async ngOnInit(): Promise<void> {
    this.configService.setLoadingPage(true);
    this.profileList = [this.configService.adminUser, this.configService.manageUser, this.configService.partnerUser, this.configService.cleanerUser]
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
      await this.tableActiveUserService.assignInitialValues();
    }
    if (this.mode != 'table') {
      switch (this.mode) {
        case 'view':
          this.title = 'Usuario';
          this.disabled = true;
          break;

        case 'edit':
          this.title = 'Editar Usuario';
          break;

        case 'create':
          this.title = 'Agregar Usuario';
          break;

        default:
          this.title = '';
          break;
      }
      await this.formsActiveUserService.createForm(this.mode);
    }
  }

  public addUserButton() {
    this.formsActiveUserService.profileSelect = 0;
    this.formsActiveUserService.idUser = '';
    this.router.navigate(['/users/active/create']);
  }

  public back() {
    this.router.navigate(['/users/']);
    this.formsActiveUserService.profileSelect = 0;
  }

  public select(item: any) {
    this.formsActiveUserService.profileSelect = item.value;  }

  public saveUser() {
    if (this.formsActiveUserService.profileSelect === this.configService.cleanerUser.key) {
      this.formsActiveUserService.formUser?.patchValue({
        password: 'Octubre2021*',
        email: 'a@a.com'
      });
    }
    if (!this.formsActiveUserService.formUser?.valid) {
      this.configService.validationError();
      return
    }
    this.configService.setLoadingPage(true);
    const {
      name,
      lastName,
      secondLastName,
      phoneNumber,
      profile,
      status,
      dni,
      email,
      startDate,
      password,
      address
    } = this.formsActiveUserService.formUser?.value;
    const user: User = {
      name,
      lastName,
      secondLastName,
      phoneNumber,
      profile,
      status,
      dni,
      email,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      password,
      address
    };
    if (this.mode === 'edit') {
      user.id = this.formsActiveUserService.user?.id
      delete user['password'];
    }
    if (user.profile === this.configService.cleanerUser.key) {
      delete user['email'];
      delete user['password'];
    }
    const promise =
      this.mode === 'edit'
        ? this.activeUserService.updateUser(user)
        : this.activeUserService.createUser(user);

    return promise.then((data) => {
      if (this.mode === 'edit') {
      } else {
        this.router.navigate(['/users/']);
      }
    }).catch(() => {
      this.formsActiveUserService.formUser?.reset()
      this.myFormUser?.resetForm();
    }).finally(() => {
      this.configService.loading = false;
    });
  }

}
