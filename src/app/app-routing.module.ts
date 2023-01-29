import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsExampleComponent } from './screens/components-example/components-example.component';
import { HomeGuard } from './shared/guards/home.guard';
import { NoAuthGuard } from './shared/guards/noAuth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./screens/home/home.module').then(m => m.HomeModule), canActivate: [HomeGuard]},
  { path: 'login', loadChildren: () => import('./screens/login/login.module').then(m => m.LoginModule), canActivate: [NoAuthGuard]},

  {
      path: 'new-password/:token', loadChildren:
          () => import('./screens/change-password/change-password.module').then(m => m.ChangePasswordModule), canActivate: [NoAuthGuard]
  },
  {
      path: 'restore-password', loadChildren:
          () => import('./screens/restore-password/restore-password.module').then(m => m.RestorePasswordModule), canActivate: [NoAuthGuard]
  },
  {
    path: 'examples',
    component: ComponentsExampleComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
