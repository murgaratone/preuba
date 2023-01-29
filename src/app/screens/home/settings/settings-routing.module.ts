import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TipoVehiculoComponent} from './tipo-vehiculo/tipo-vehiculo.component';
import {MarcaComponent} from './marca/marca.component';
import {PistaComponent} from './pista/pista.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
        {
            path: '',
            redirectTo: 'tipo-vehiculo',
            pathMatch: 'full'
        },
        {
            path: 'tipo-vehiculo',
            component: TipoVehiculoComponent,
            data: { mode: 'table'}
        },
        {
            path: 'tipo-vehiculo/edit/:id', component: TipoVehiculoComponent,
            data: { mode: 'edit'}
        },
        {
            path: 'tipo-vehiculo/create', component: TipoVehiculoComponent,
            data: { mode: 'create'}
        },
        {
          path: '',
          redirectTo: 'marca',
          pathMatch: 'full'
      },
      {
          path: 'marca',
          component: MarcaComponent,
          data: { mode: 'table'}
      },
      {
          path: 'marca/edit/:id', component: MarcaComponent,
          data: { mode: 'edit'}
      },
      {
          path: 'marca/create', component: MarcaComponent,
          data: { mode: 'create'}
      },

      {
        path: '',
        redirectTo: 'pista',
        pathMatch: 'full'
    },
        {
          path: 'pista',
          component: PistaComponent,
          data: { mode: 'table'}
      },
    {
        path: 'pista/edit/:id', component: PistaComponent,
        data: { mode: 'edit'}
    },
    {
        path: 'pista/create', component: PistaComponent,
        data: { mode: 'create'}
    },
    ]
}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SettingsRoutingModule {}
