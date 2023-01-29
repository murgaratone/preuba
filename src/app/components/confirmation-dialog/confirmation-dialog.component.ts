import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialogs } from 'app/shared/models/dialog.class';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  public img = ''
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialogs) {
    switch (data.type) {
      case 'alert':
        this.img = 'alert.png'
        break;
      case 'warning':
        this.img = 'warning.png'
        break;
      case 'success':
        this.img = 'success.png'
        break;
      case 'error':
        this.img = 'error.png'
        break;
      case 'confirm':
        this.img = 'confirm.png'
        break;

      default:
        break;
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close();
  }
}

