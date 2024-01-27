import { Component } from '@angular/core';
import { SideNavService } from '../../services/sidenav.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Id } from '../../app.config';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  imports: [RouterModule],
})
export class SidenavComponent {
  constructor(
    private readonly sidenav: SideNavService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) 
  { }

  public closeSideNav() {
    this.sidenav.close();
  }

  public goToProfile() {
    const profileId: Id = this.userService.getUserId();
    this.router.navigateByUrl("profile/"+profileId);
    this.closeSideNav();
  }

  public openPFP() {
    window.open("https://i.kym-cdn.com/photos/images/newsfeed/001/698/917/183.jpg", "_blank")
  }
}
