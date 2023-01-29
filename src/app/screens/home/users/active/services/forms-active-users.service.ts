import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'app/shared/models/user.interfaces';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { modeViewCrud } from 'app/shared/types/cruds';
import { ActiveUsersService } from './active-users.service';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class FormsActiveUsersService {

  public formUser: FormGroup | undefined;
  public user: User | undefined;
  public idUser: string = '';
  public validator = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';
  public profileSelect: number = 0;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationService,
    private activeUserService: ActiveUsersService
  ) { }

  public async createForm(mode: modeViewCrud) {
    this.formUser = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      phoneNumber: [undefined, [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
      dni: [undefined, [Validators.required]],
      password: [undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern(this.validator)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      startDate: [undefined, [Validators.required]],
      profile: ['', [Validators.required]],
      status: [true, [Validators.required]],
    }, {
    });
    if (mode != 'create') {
      const result = await this.activeUserService.getUser(this.idUser);
      this.user = result[0];
      
      if (this.user) {
        this.formUser.setValue({
          name: this.user.name ?? '',
          lastName: this.user.lastName?? '',
          secondLastName: this.user.secondLastName?? '',
          phoneNumber: this.user.phoneNumber?? 0,
          dni: this.user.dni?? '',
          address: this.user.address?? '',
          email: this.user.email?? '',
          startDate: this.user.startDate? moment(this.user.startDate).add(1, 'day').format('YYYY-MM-DD') : '',
          profile: this.user.title? this.configService.profiles.find(x=> x.role === this.user?.title)?.key: '',
          status: this.user.status?? false,
          password: 'Octubre2021*',
        });
        this.profileSelect = this.formUser?.value.profile
      }      
    }

    if (mode === 'view') {
      this.formUser.controls['name'].disable();
      this.formUser.controls['lastName'].disable();
      this.formUser.controls['secondLastName'].disable();
      this.formUser.controls['phoneNumber'].disable();
      this.formUser.controls['dni'].disable();
      this.formUser.controls['address'].disable();
      this.formUser.controls['email'].disable();
      this.formUser.controls['startDate'].disable();
      this.formUser.controls['profile'].disable();
      this.formUser.controls['status'].disable();
    }

    this.configService.setLoadingPage(false);
  }
}
