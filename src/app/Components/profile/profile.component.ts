import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityChartComponent } from '../activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [ActivityChartComponent, CommonModule]
})
export class ProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  profileId = 0;

  activities: { title: string, image: string }[] = [
    {title: "Updated docs", image: "/assets/bell-icon.png"},
    {title: "Awnsered question", image: "/assets/news-icon.png"},
    {title: "New bio!", image: "/assets/profile-icon.png"},
    {title: "New bio!", image: "/assets/profile-icon.png"},
    {title: "New bio!", image: "/assets/profile-icon.png"},
    {title: "Updated docs", image: "/assets/bell-icon.png"}];

  profile: IProfile = {
    username: "",
    bio: "",
    title: ""
  };

  constructor(
    private readonly api: ApiService,
    private readonly userService: UserService
  ) {
    this.profileId = Number(this.route.snapshot.params['id']);
  }

  async ngOnInit(): Promise<void> {
    if (!this.userService.isUserLoggedIn()) return;
    this.profile = await this.api.get<IProfile>("Profile/" + this.profileId);
  }

}

interface IProfile {
  bio : string,
  username : string,
  title : string,
}
