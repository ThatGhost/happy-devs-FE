import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: "root",
})
export class SideNavService {
  private matSidenav!: MatSidenav;

  public setSideNav(sidenav: MatSidenav) {
    this.matSidenav = sidenav;
  }

  public open() {
    this.matSidenav.open();
  }

  public close() {
    this.matSidenav.close();
  }

  public toggle() {
    this.matSidenav.toggle();
  }
}
