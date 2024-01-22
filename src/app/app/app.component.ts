import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../Components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app',
  standalone: true,
  template: `    
  <main>
    <comp-header></comp-header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>  
  </main>
  `,
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterModule],
})
export class AppComponent {

}
