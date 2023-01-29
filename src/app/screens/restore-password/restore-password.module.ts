import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestorePasswordComponent } from './restore-password.component';
import { RestorePasswordRoutingModule } from './restore-password-routing.module';

@NgModule({
  declarations: [
    RestorePasswordComponent,
  ],
  imports: [
    RestorePasswordRoutingModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [RestorePasswordComponent]
})
export class RestorePasswordModule { }
