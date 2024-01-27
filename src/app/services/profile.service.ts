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
   }

    public getProfile(): IProfile {
      return this.profile;
    }

    public async reloadProfile(): Promise<void> {
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
}

export interface IProfile {
  bio : string,
  username : string,
  title : string,
  id : Id
}