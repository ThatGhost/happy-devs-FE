import { Component } from '@angular/core';
import { SideNavService } from '../../services/sidenav.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  imports: [RouterModule],
})
export class SidenavComponent {
  profileId: number = 0;

  constructor(private sidenav: SideNavService) 
  { }

  public closeSideNav() {
    this.sidenav.close();
  }

  public openPFP() {
    window.open("https://i.kym-cdn.com/photos/images/newsfeed/001/698/917/183.jpg", "_blank")
  }
}
