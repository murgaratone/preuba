import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
// import { ConfirmationDialogComponent } from './confirmation-dialog.component';
@NgModule({
  declarations: [
    // ConfirmationDialogComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    // ConfirmationDialogComponent
  ],
  providers: [],
  // bootstrap: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule { }
