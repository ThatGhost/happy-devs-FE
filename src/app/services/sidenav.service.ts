import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SideNavService {
  private matSidenav!: MatSidenav;

  public setSideNav(sidenav: MatSidenav) {
    this.matSidenav = sidenav;
  }

  public open() {
    console.log("trying to open "+this.matSidenav);
    this.matSidenav.open();
  }

  public close() {
    this.matSidenav.close();
  }

  public toggle() {
    this.matSidenav.toggle();
  }
}
