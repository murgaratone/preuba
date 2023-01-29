import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleByIdGuard } from 'app/shared/guards/role-by-id.guard';
import { RolAdmin, RolManager, RolPartner } from 'app/shared/models/role';
import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [
    {
        path: '',
        component: VehiclesComponent,
        data: {
            mode: 'table',
            roles: [
                new RolAdmin().key,
                new RolManager().key,
                new RolPartner().key,
            ]
        }
        ,
        canActivate: [RoleByIdGuard]
    },
    {
        path: 'view/:id',
        component: VehiclesComponent,
        data: {
            mode: 'view',
            roles: [
                new RolAdmin().key,
                new RolManager().key,
                new RolPartner().key,
            ]
        }
        ,
        canActivate: [RoleByIdGuard]
    },
    {
        path: 'create',
        component: VehiclesComponent,
        data: {
            mode: 'create',
            roles: [
                new RolAdmin().key,
                new RolManager().key,
            ]
        }
        ,
        canActivate: [RoleByIdGuard]
    },
    {
        path: 'edit/:id',
        component: VehiclesComponent,
        data: {
            mode: 'edit',
            roles: [
                new RolManager().key,
            ]
        }
        ,
        canActivate: [RoleByIdGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehiclesRoutingModule { }
