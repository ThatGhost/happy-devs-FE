import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavService } from '../../services/sidenav.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'comp-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule, CommonModule],
})
export class HeaderComponent {
  title = 'Happy-devs';

  constructor(
     private sidenavService: SideNavService,
     public usersService: UserService
  ) 
  { }

  public openSideNav() {
    this.sidenavService.open();
  }
}
