import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-text-input-dialog',
  standalone: true,
  templateUrl: './text-input-dialog.component.html',
  styleUrl: './text-input-dialog.component.scss'
})
export class TextInputDialogComponent {
  constructor(private dialogRef: MatDialogRef<TextInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }){

  }

  onSubmit(input: string) {
    this.dialogRef.close(input);
  }
}
