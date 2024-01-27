import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityChartComponent } from '../activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [ActivityChartComponent, CommonModule]
})
export class ProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  title: string = "";
  username: string = "";
  bio: string = ""

  activities: { title: string, image: string }[] = [
    {title: "Updated docs", image: "/assets/bell-icon.png"},
    {title: "Awnsered question", image: "/assets/news-icon.png"},
    {title: "New bio!", image: "/assets/profile-icon.png"},
    {title: "New bio!", image: "/assets/profile-icon.png"},
    {title: "New bio!", image: "/assets/profile-icon.png"},
    {title: "Updated docs", image: "/assets/bell-icon.png"}];

  constructor(
    public readonly profileService: ProfileService,
  ) {
    this.profileService.profileChange.subscribe((value) => {
      this.title = value.title;
      this.bio = value.bio;
      this.username = value.username;
    });
  }

  async ngOnInit() {
    const profile: IProfile = this.profileService.getProfile();
    this.bio = profile.bio;
    this.title = profile.title;
    this.username = profile.username;
  }
}
