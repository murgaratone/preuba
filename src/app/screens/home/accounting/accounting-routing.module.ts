import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountingComponent } from './accounting.component';
import { PayrollComponent } from './payroll/payroll.component';
import { RolAdmin, RolManager } from 'app/shared/models/role';
import { RoleByIdGuard } from 'app/shared/guards/role-by-id.guard';
import { PricesColaboratorsComponent } from './prices-colaborators/prices-colaborators.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingComponent,
    children: [
      {
        path: '',
        redirectTo: 'payroll',
        pathMatch: 'full',
      },
      {
        path: 'payroll',
        component: PayrollComponent,
        data: {
          mode: 'table',
          roles: [
            new RolAdmin().key,
            new RolManager().key],
        },
        canActivate: [RoleByIdGuard],
      },
      {
        path: 'payroll/view/:id/:idProfileStatus',
        component: PayrollComponent,
        data: {
            mode: 'view',
            roles: [
                new RolAdmin().key,
                new RolManager().key,
            ]
        },
        canActivate: [RoleByIdGuard]
    },
      {
        path: 'payroll/add/:id/:idProfileStatus',
        component: PayrollComponent,
        data: {
          mode: 'add',
          roles: [
              new RolAdmin().key,
              new RolManager().key],
        },
        canActivate: [RoleByIdGuard]
      },
      {
        path: 'costs', loadChildren:
          () => import('./costs/costs.module').then(m => m.CostsModule), canActivate: [RoleByIdGuard],
          data: {
            roles: [
                new RolAdmin().key,
                new RolManager().key],
          },
      },
      {
        path: 'prices-colaborators/:id',
        component: PricesColaboratorsComponent,
        data: {
          mode: 'table',
          roles: [
              new RolAdmin().key,
              new RolManager().key],
        },
        canActivate: [RoleByIdGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingRoutingModule {}
