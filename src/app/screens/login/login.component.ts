import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { StorageService } from 'app/shared/services/storage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('myFormLogin', { static: false }) myFormLogin: NgForm | undefined;

  public loginForm: FormGroup;

  public loginError = false;
  public wrongPassword = false;
  public hideRegister = true;
  // public statusClosed = new StatusClosed().key;
  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    public configService: ConfigurationService,
    private router: Router,
    private snackBar: MatSnackBar,
    public storageService: StorageService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, {
    });
   }

  ngOnInit(): void {

  }

  login(){
    if (!this.loginForm?.valid) {
      this.configService.loginError();
      return
    }
    this.configService.setLoadingPage(true);
    const{
      email,
      password
    } = this.loginForm?.value;

    const loginSerialized = {
      email: email,
      password
    };

    return this.loginService.login(loginSerialized).then(async (data) => {
      this.storageService.setValue('user', data[0]);
      data && this.snackBar.open('Bienvenido', 'x', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
      this.configService.filterMenu();
      this.router.navigate(['/']);
      this.configService.setLoadingPage(false);
    })
    .catch(err => {
      this.loginError = true;
      this.configService.setLoadingPage(false);
    });
  }

  restorePassword(){
    this.router.navigate(['/restore-password']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

}
