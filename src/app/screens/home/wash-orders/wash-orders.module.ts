import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WashOrdersComponent } from './wash-orders.component';
import { WashOrdersRoutingModule } from './wash-orders-routing.module';
import { TableModule } from 'app/components/table/table.module';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    WashOrdersComponent,
  ],
  imports: [
    WashOrdersRoutingModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TableModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMomentDateModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        display: {
          dateInput: 'DD-MMM-YYYY',
        },
      },
    },
  ],
  bootstrap: [WashOrdersComponent]
})
export class WashOrdersModule { }
