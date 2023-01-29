import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleByIdGuard } from 'app/shared/guards/role-by-id.guard';
import { RolAdmin, RolManager, RolPartner } from 'app/shared/models/role';
import { HistoricalComponent } from './historical/historical.component';
import { ProductsComponent } from './products/products.component';
import { InventoryComponent } from './inventory.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
    {
        path: '',
        component: InventoryComponent,
        children: [
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full',
            },
            {
                path: 'products',
                component: ProductsComponent,
                data: {
                    mode: 'table',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                    ],
                    fragment: 'stock'
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'products/edit/:id', 
                component: ProductsComponent,
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
                path: 'products/create', 
                component: ProductsComponent,
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
                path: 'historical',
                component: HistoricalComponent,
                data: {
                    mode: 'search',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'stock',
                component: StockComponent,
                data: {
                    mode: 'table',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                        new RolPartner().key
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'stock/add/:id', 
                component: StockComponent,
                data: {
                    mode: 'add',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
                    ]
                },
                canActivate: [RoleByIdGuard]
            },
            {
                path: 'stock/substract/:id', 
                component: StockComponent,
                data: {
                    mode: 'substract',
                    roles: [
                        new RolAdmin().key,
                        new RolManager().key,
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
export class InventoryRoutingModule {}
