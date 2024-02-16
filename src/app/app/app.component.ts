import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../Components/standalone/header/header.component';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../Components/standalone/sidenav/sidenav.component';
import { SideNavService } from '../services/sidenav.service';

@Component({
  selector: 'app-app',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterModule, MatSidenavModule, SidenavComponent],
  providers: [SideNavService],
})
export class AppComponent {
  @ViewChild("sidenav") sidenav!: MatSidenav;

  constructor(private sidenavService: SideNavService) {    
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSideNav(this.sidenav);
  }
}
