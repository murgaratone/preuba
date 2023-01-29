import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigurationService } from 'app/shared/services/configuration.service';
import { RestorePasswordService } from './restore-password.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})

export class RestorePasswordComponent implements OnInit {
  @ViewChild('myRestoreForm', { static: false }) myRestoreForm:
    | NgForm
    | undefined;

  public restoreForm: FormGroup;
  public emailNotFound = false;
  public linkSent = false;

  constructor(
    private fb: FormBuilder,
    public restorePasswordService: RestorePasswordService,
    public configService: ConfigurationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.restoreForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      },{
    });
  }

  ngOnInit(): void {
  }

  restorePassword() {
    const { email } = this.restoreForm?.value;

    const restoreSerialized = {
      email: email,
    };

    return this.restorePasswordService
      .restorePassword(restoreSerialized)
      .then((data) => {
        data &&
          this.snackBar.open(
            'Te hemos enviado un enlace para poder recuperar tu contraseña',
            'x',
            {
              duration: 10000,
              panelClass: ['snackbar-success'],
            }
          );
        this.router.navigate(['login']);
      });
  }
}
