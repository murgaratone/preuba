import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    TableComponent
  ],
  providers: [],
  bootstrap: [TableComponent]
})
export class TableModule { }
