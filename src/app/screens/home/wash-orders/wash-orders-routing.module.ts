import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleByIdGuard } from 'app/shared/guards/role-by-id.guard';
import { RolAdmin, RolManager, RolPartner } from 'app/shared/models/role';
import { WashOrdersComponent } from './wash-orders.component';

const routes: Routes = [
    {
        path: '',
        component: WashOrdersComponent,
        data: {
            mode: 'table',
            roles: [
                new RolAdmin().key,
                new RolManager().key,
            ]
        }
        ,
        canActivate: [RoleByIdGuard]
    },
    {
        path: 'view/:id',
        component: WashOrdersComponent,
        data: {
            mode: 'view',
            roles: [
                new RolAdmin().key,
                new RolManager().key,
            ]
        }
        ,
        canActivate: [RoleByIdGuard]
    },
    {
        path: 'create',
        component: WashOrdersComponent,
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
        component: WashOrdersComponent,
        data: {
            mode: 'edit',
            roles: [
                new RolAdmin().key,
                new RolManager().key,
            ]
        }
        ,
        canActivate: [RoleByIdGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WashOrdersRoutingModule {}
