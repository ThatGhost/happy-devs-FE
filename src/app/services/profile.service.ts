import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Id } from '../app.config';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: IProfile = {
    title: "",
    bio: "",
    username: "",
    id: 0,
  };
  profileChange: Subject<IProfile> = new Subject<IProfile>();

  constructor(
    private readonly api: ApiService,
    private readonly userService: UserService
  ) {
    this.profileChange.subscribe((value) => {
      this.profile = value
    });
    userService.userChange.subscribe((value) => {
      this.reloadProfile();
    })
  }

  public getProfile(): IProfile {
    return this.profile;
  }

  public async updateProfile(profile: IProfile): Promise<void> {
    if (!this.userService.isUserLoggedIn()) return;

    await this.api.put("Profile/" + this.userService.getUserId(), {
      bio: profile.bio,
      username: profile.username,
      title: profile.title,
    });
    this.profileChange.next({
      id: this.userService.getUserId(),
      title: profile.title,
      bio: profile.bio,
      username: profile.username,
    })
  }

  public async loadProfile(): Promise<void> {
    if (!this.userService.isUserLoggedIn()) return;

    if(this.profile.id === 0) {
      const profile = await this.api.get<IProfile>("Profile/" + this.userService.getUserId());
      this.profileChange.next({
        id: profile.id,
        title: profile.title,
        bio: profile.bio,
        username: profile.username,
      })
    }
  }

  public async reloadProfile(): Promise<void> {
    if (!this.userService.isUserLoggedIn()) return;

    const profile = await this.api.get<IProfile>("Profile/" + this.userService.getUserId());
    this.profileChange.next({
      id: profile.id,
      title: profile.title,
      bio: profile.bio,
      username: profile.username,
    })
  }
}

export interface IProfile {
  bio : string,
  username : string,
  title : string,
  id : Id
}