import { Component, ElementRef, Inject, Input, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityChartComponent } from '../activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService } from '../../services/profile.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextInputDialogComponent } from '../text-input-dialog/text-input-dialog.component';
import { TextAreaDialogComponent } from '../text-area-dialog/text-area-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [ActivityChartComponent, CommonModule, MatDialogModule]
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<Input>;

  route: ActivatedRoute = inject(ActivatedRoute);
  title: string = "";
  username: string = "";
  bio: string = ""
  profileImage: any | null = null;

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
    private readonly sanitizer: DomSanitizer
  ) {
    this.profileService.profileChange.subscribe((value) => {
      this.title = value.title;
      this.bio = value.bio;
      this.username = value.username;
    });
    this.profileService.profilePictureChange.subscribe((value) => {
      if(value === null) {
        this.profileImage = null;
      } else {
        let objectURL: string = URL.createObjectURL(value);
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
    })
  }

  async ngOnInit() {
    await this.profileService.loadProfilePicture();
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
    const dialogRef = this.dialog.open(UserNameAndTitleInput, {
      data: {
        username: this.username,
        title: this.title,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.username = result.username;
        this.title = result.title;
        this.updateProfile();
      }
    });
  }

  public editBio() {
    const dialogRef = this.dialog.open(TextAreaDialogComponent, {
      data: {
        title: "New Bio"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.bio = result;
        this.updateProfile();
      }
    });
  }

  public editProfilePicture() {
    let element: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    element.click();
  }

  public uploadProfilePicture() {
    const element = event?.currentTarget as HTMLInputElement;
    const pfp: File | null = element.files?.item(0) ?? null;
    if(pfp === null) return;

    let objectURL: string = URL.createObjectURL(pfp as Blob);
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);

    this.profileService.uploadProfilePicture(pfp);
  }
}

@Component({
  standalone: true,
  template: `
  <section class = "input-dialog">
    <h2 class = "title">Username</h2>
    <textarea class = "input" #username>{{data.username}}</textarea>
    <h2 class = "title">title</h2>
    <textarea class = "input" #title>{{data.title}}</textarea>
    <button class = "submit" (click)="onSubmit(username.value, title.value)">Submit</button>    
</section>`,
  styles: `
    @import "../../styles/main";

    .input-dialog {
      background-color: $c-medium;
      min-height: 100px;
      min-width: 250px;
      border: 5px solid $c-light;
      border-radius: 5px;
      position: relative;

      padding: 20px;

      .title {
          color: $c-white;
      }

      .input {
          width: 75%;
          margin-right: 5px;
          background-color: $c-dark;
          color: $c-white;
          font-size: large;
          font-family:$default-font;
      }

      .submit {
          position: absolute;
          height: 20%;
          background-color: $c-dark;
          @include light-glow;
          color: $c-white;
          padding: 5px;
          bottom: 10px;
          right: 10px;
      }
  }
  `
})
class UserNameAndTitleInput {
  constructor(private dialogRef: MatDialogRef<TextInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, username: string }){

  }

  onSubmit(username: string, title: string) {
    this.dialogRef.close({
      username: username,
      title: title,
    });
  }
}
