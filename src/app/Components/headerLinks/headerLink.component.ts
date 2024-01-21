import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headerLink',
  standalone: true,
  template: `
    <a [href] = "link">
      home works!
    </a>
  `,
  styleUrl: './headerLink.component.scss'
})
export class HeaderLinkComponent {
  @Input() link!: string;
}
