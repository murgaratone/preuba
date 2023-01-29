import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { MarcaComponent } from './marca/marca.component';
import { PistaComponent } from './pista/pista.component';
import { TableModule } from '../../../components/table/table.module';

@NgModule({
  declarations: [
    SettingsComponent,
    TipoVehiculoComponent,
    MarcaComponent,
    PistaComponent,
  ],
  imports: [
    SettingsRoutingModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TableModule
  ],
  providers: [],
  bootstrap: [SettingsComponent]
})
export class SettingsModule { }
