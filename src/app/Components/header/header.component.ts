import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'comp-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule]
})
export class HeaderComponent {
  title = 'Happy-devs';
}
