import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderHomeModule } from 'app/components/header-home/header-home.module';
import { AccountingComponent } from './accounting.component';
import { AccountingRoutingModule } from './accounting-routing.module';
import { PayrollComponent } from './payroll/payroll.component';
import { TableModule } from "../../../components/table/table.module";
import { MatSelectModule } from '@angular/material/select';
import { PricesColaboratorsComponent } from './prices-colaborators/prices-colaborators.component';

@NgModule({
    declarations: [
        AccountingComponent,
        PayrollComponent,
        PricesColaboratorsComponent,
    ],
    providers: [],
    bootstrap: [AccountingComponent],
    imports: [
        AccountingRoutingModule,
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        HeaderHomeModule,
        MatSidenavModule,
        MatSelectModule,
        TableModule

    ]
})
export class AccountingModule { }
