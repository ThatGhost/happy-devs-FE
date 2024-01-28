import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityChartComponent } from '../activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService } from '../../services/profile.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TextInputDialogComponent } from '../text-input-dialog/text-input-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [ActivityChartComponent, CommonModule, MatDialogModule]
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
    public readonly dialog: MatDialog,
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

  public updateProfile() {
    this.profileService.updateProfile({
      title: this.title,
      username: this.username,
      bio: this.bio,
      id: 0,
    });
  }

  public editUsername() {
    const dialogRef = this.dialog.open(TextInputDialogComponent, {
      data: {
        title: "New username"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.username = result;
        this.updateProfile();
      }
    });
  }

  public editTitle() {
    const dialogRef = this.dialog.open(TextInputDialogComponent, {
      data: {
        title: "New title"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.title = result;
        this.updateProfile();
      }
    });
  }
}
