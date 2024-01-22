import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavService } from '../../services/sidenav.service';
@Component({
  standalone: true,
  selector: 'comp-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule],
  providers: [SideNavService]
})
export class HeaderComponent {
  title = 'Happy-devs';

  constructor(private sidenav: SideNavService) 
  { }

  public openSideNav() {
    this.sidenav.open();
  }
}
