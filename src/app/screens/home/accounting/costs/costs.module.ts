import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CostsComponent } from './costs.component';
import { CostsRoutingModule } from './costs-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { TableModule } from 'app/components/table/table.module';
import { ProductComponent } from './product/product.component';
import { SalaryComponent } from './salary/salary.component';
import { FixedComponent } from './fixed/fixed.component';
import { BasicWashComponent } from './basic-wash/basic-wash.component';
import { CreateComboComponent } from './create-combo/create-combo.component';
import { ViewComboComponent } from './view-combo/view-combo.component';

@NgModule({
    declarations: [
        CostsComponent,
        ProductComponent,
        SalaryComponent,
        FixedComponent,
        BasicWashComponent,
        CreateComboComponent,
        ViewComboComponent,
    ],
    providers: [],
    bootstrap: [CostsComponent],
    imports: [
        CostsRoutingModule,
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSidenavModule,
        MatSelectModule,
        TableModule

    ]
})
export class CostsModule { }
