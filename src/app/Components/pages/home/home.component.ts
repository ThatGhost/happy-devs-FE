import { Component } from '@angular/core';
import { RecentPostsComponent } from '../../standalone/recent-posts/recent-posts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecentPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
