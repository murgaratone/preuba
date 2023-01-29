import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'accounting', loadChildren:
          () => import('./accounting/accounting.module').then(m => m.AccountingModule), canActivate: []
      },
      {
        path: 'alarms', loadChildren:
          () => import('./alarms/alarms.module').then(m => m.AlarmsModule), canActivate: []
      },
      {
        path: 'inventory', loadChildren:
          () => import('./inventory/inventory.module').then(m => m.InventoryModule), canActivate: []
      },
      {
        path: 'settings', loadChildren:
          () => import('./settings/settings.module').then(m => m.SettingsModule), canActivate: []
      },
      {
        path: 'users', loadChildren:
          () => import('./users/users.module').then(m => m.UserModule), canActivate: []
      },
      {
        path: 'vehicles', loadChildren:
          () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule), canActivate: []
      },
      {
        path: 'wash-orders', loadChildren:
          () => import('./wash-orders/wash-orders.module').then(m => m.WashOrdersModule), canActivate: []
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
