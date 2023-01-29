import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleByIdGuard } from 'app/shared/guards/role-by-id.guard';
import { RolAdmin, RolManager, RolPartner } from 'app/shared/models/role';
import { ActiveComponent } from './active/active.component';
import { InactiveComponent } from './inactive/inactive.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full'
            },
            {
                path: 'active',
                component: ActiveComponent,
                data: {
                    mode: 'table',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                        new RolPartner().key,
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'active/view/:id', component: ActiveComponent,
                data: {
                    mode: 'view',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                        new RolPartner().key,
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'active/edit/:id', component: ActiveComponent,
                data: {
                    mode: 'edit',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'active/create', component: ActiveComponent,
                data: {
                    mode: 'create',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'inactive',
                component: InactiveComponent,
                data: {
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                        new RolPartner().key,
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
