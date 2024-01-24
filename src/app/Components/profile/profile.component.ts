import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityChartComponent } from '../activity-chart/activity-chart.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [ActivityChartComponent]
})
export class ProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  profileId = 0;

  constructor() {
    this.profileId = Number(this.route.snapshot.params['id']);
  }
}
