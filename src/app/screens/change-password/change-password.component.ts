import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { Subscription } from 'rxjs';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('myResetPasswordForm', { static: false }) myResetPasswordForm: NgForm | undefined;

  public resetPasswordForm: FormGroup;
  public resetError = false;
  public resetSuccess = false;
  public hideRegister = true;
  public hideRegisterConfirm = true;
  public validator = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$';
  private token:string =""
  private sub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public configService: ConfigurationService,
    public changePasswordService: ChangePasswordService,
  ) {
    this.configService.setLoadingPage(true);
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20), Validators.pattern(this.validator)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.configService.mustMatch('password', 'confirmPassword'),
    });
    this.configService.setLoadingPage(false);
  }

  ngOnInit(): void {
    this.sub = this.actRoute.params.subscribe(params => {
      this.token = params['token'];
   });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

   resetPassword(){
    if (!this.resetPasswordForm?.valid) {
      this.configService.changeError();
      return
    }
     const{
       password,
       confirmPassword
     } = this.resetPasswordForm?.value;

     if (password !== confirmPassword)
       return;

     const resetSerialized = {
       password: password
     };

     return this.changePasswordService.changePassword(resetSerialized, this.token).then((data) => {
       data && this.snackBar.open('Tu contraseña se ha restaurado de forma exitosa', 'x', {
         duration: 2000,
         panelClass: ['snackbar-success'],
       });
       this.router.navigate(['login']);
     })
     .catch(err => {
       this.resetError = true;
     });
   }

}
