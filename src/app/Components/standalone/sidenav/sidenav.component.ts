import { Component } from '@angular/core';
import { SideNavService } from '../../../services/sidenav.service';
import { Router, RouterModule } from '@angular/router';
import { UserService, userLoggedIn } from '../../../services/user.service';
import { Id } from '../../../app.config';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  imports: [RouterModule],
})
export class SidenavComponent {
  username: string = "";

  constructor(
    private readonly sidenav: SideNavService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly profileService: ProfileService,
  ) 
  { 
    this.profileService.profileChange.subscribe((value) => {
      this.username = value.username;
    });
  }

  public closeSideNav() {
    this.sidenav.close();
  }

  public goToProfile() {
    const profileId: Id = this.userService.getUserId();
    this.router.navigateByUrl("profile/"+profileId);
    this.closeSideNav();
  }

  public goToMakePost() {
    this.router.navigateByUrl("create-post");
    this.closeSideNav(); 
  }

  public signOut() {
    this.userService.signOut()
    this.router.navigateByUrl("");
    this.closeSideNav();
  }

  public goToDocumentation() {
    this.router.navigateByUrl("code");
    this.closeSideNav();
  }

  public openPFP() {
    window.open("https://i.kym-cdn.com/photos/images/newsfeed/001/698/917/183.jpg", "_blank")
  }
}
