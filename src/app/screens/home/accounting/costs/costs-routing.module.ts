import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicWashComponent } from './basic-wash/basic-wash.component';
import { CostsComponent } from './costs.component';
import { CreateComboComponent } from './create-combo/create-combo.component';
import { FixedComponent } from './fixed/fixed.component';
import { ProductComponent } from './product/product.component';
import { SalaryComponent } from './salary/salary.component';
import { ViewComboComponent } from './view-combo/view-combo.component';

const routes: Routes = [
  {
    path: '',
    component: CostsComponent,
    children: [
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full',
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          mode: 'table',
        },
      },
      {
        path: 'product/edit/:id',
        component: ProductComponent,
        data: {
          mode: 'edit',
        },
      },
      {
        path: 'product/add',
        component: ProductComponent,
        data: {
          mode: 'add',
        },
      },
      {
        path: 'salary',
        component: SalaryComponent,
        data: {
          mode: 'table',
        },
      },
      {
        path: 'salary/edit/:id',
        component: SalaryComponent,
        data: {
          mode: 'edit',
        },
      },
      {
        path: 'salary/add',
        component: SalaryComponent,
        data: {
          mode: 'add',
        },
      },
      {
        path: 'fixed',
        component: FixedComponent, // costos fijos
        data: {
          mode: 'table',
        },
      },
      {
        path: 'fixed/edit/:id',
        component: FixedComponent,
        data: {
          mode: 'edit',
        },
      },
      {
        path: 'fixed/add',
        component: FixedComponent,
        data: {
          mode: 'add',
        },
      },
      {
        path: 'basic-wash',
        component: BasicWashComponent,
        data: {
          mode: 'table',
        },
      },
      {
        path: 'basic-wash/edit/:id',
        component: BasicWashComponent,
        data: {
          mode: 'edit',
        },
      },
      {
        path: 'basic-wash/add',
        component: BasicWashComponent,
        data: {
          mode: 'add',
        },
      },
      {
        path: 'create-combo',
        component: CreateComboComponent,
      },
      {
        path: 'view-combo/:combo',
        component: ViewComboComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostsRoutingModule {}
