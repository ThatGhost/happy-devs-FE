import { Component } from '@angular/core';
import { SideNavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  imports: [],
  providers: [SideNavService]
})
export class SidenavComponent {
  constructor(private sidenav: SideNavService) 
  { }

  public closeSideNav() {
    this.sidenav.close();
  }
}
