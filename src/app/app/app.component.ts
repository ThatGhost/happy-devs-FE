import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../Components/sidenav/sidenav.component';
import { SideNavService } from '../services/sidenav.service';

@Component({
  selector: 'app-app',
  standalone: true,
  template: `    
  <main>
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="over" position="end">
        <app-sidenav></app-sidenav>
      </mat-sidenav>

      <mat-sidenav-content>
        <comp-header></comp-header>
        <section class="content">
          <router-outlet></router-outlet>
        </section>  
      </mat-sidenav-content>
    </mat-sidenav-container>
  </main>
  `,
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterModule, MatSidenavModule, SidenavComponent],
  providers: [SideNavService],
})
export class AppComponent {
  @ViewChild("sidenav") sidenav!: MatSidenav;

  constructor(private sidenavService: SideNavService) {    
  }

  ngOnInit(): void {
    this.sidenavService.setSideNav(this.sidenav);
    console.log("init side nav " + this.sidenav);
  }
}
