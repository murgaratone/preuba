import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderHomeModule } from 'app/components/header-home/header-home.module';
import { MenuComponent } from 'app/components/menu/menu.component';


@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HeaderHomeModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
