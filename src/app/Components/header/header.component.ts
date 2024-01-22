import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavService } from '../../services/sidenav.service';
@Component({
  standalone: true,
  selector: 'comp-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule],
})
export class HeaderComponent {
  title = 'Happy-devs';

  constructor(private sidenavService: SideNavService) 
  { }

  public openSideNav() {
    this.sidenavService.open();
  }
}
