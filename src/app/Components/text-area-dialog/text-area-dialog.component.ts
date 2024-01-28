import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-text-area-dialog',
  standalone: true,
  templateUrl: './text-area-dialog.component.html',
  styleUrl: './text-area-dialog.component.scss'
})
export class TextAreaDialogComponent {
  constructor(private dialogRef: MatDialogRef<TextAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, previousData: string }){
  }

  onSubmit(input: string) {
    this.dialogRef.close(input);
  }
}
