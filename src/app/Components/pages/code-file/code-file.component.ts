import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-code-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-file.component.html',
  styleUrl: './code-file.component.scss'
})
export class CodeFileComponent {
  code = `
  @Component({
    selector: 'app-code-file',
    standalone: true,
    imports: [],
    templateUrl: './code-file.component.html',
    styleUrl: './code-file.component.scss'
  })
  export class CodeFileComponent {
    code = '';
  }`;
  fileTitle = "code-file.components.ts";

  replacetabs(code: string): string {
    return code.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  }
}
