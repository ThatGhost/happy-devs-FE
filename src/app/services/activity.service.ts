import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Id } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private readonly api: ApiService,
    private readonly userService: UserService
    ) 
  {

  }

  public async getActivity(): Promise<IActivity[]> {
    if (!this.userService.isUserLoggedIn()) return [];

    const activityData: IActivityData[] = await this.api.get<IActivityData[]>(`Activity/${this.userService.getUserId()}`);
    const parsed: {type: ActivityType, at: Date, id: Id}[] = activityData.map(data => {
      return {
        type: data.type as ActivityType,
        at: new Date(data.at),
        id: this.userService.getUserId(),
      }
    });
    return parsed.map(this.toActivity);
  }

  private toActivity(data: {type: ActivityType, at: Date, id: Id}): IActivity {
    const activity: IActivity = {
      type: data.type,
      at: data.at,
      title: "",
      image: "",
      link: "",
    }

    switch(activity.type) {
      case ActivityType.UpdatedProfile: 
        activity.title = "Updated Profile!";
        activity.image = "/assets/profile-icon.png";
        activity.link = `/profile/${data.id}`;
        break;
      case ActivityType.MadePost: 
        activity.title = "Made Post!";
        activity.image = "/assets/news-icon.png";
        activity.link = ``;
        break;
      case ActivityType.CommentedOnPost: 
        activity.title = "Commented On Post!";
        activity.image = "/assets/comment-icon.png";
        activity.link = ``;
        break;
    }
    
    return activity;
  }
}

interface IActivityData {
  type: number,
  at: string,
}

export enum ActivityType {
  UpdatedProfile = 0,
  MadePost = 1,
  CommentedOnPost = 2,
  AskedQuestion = 3,
  AwnseredQuestion = 4,
  UpdatedDocumentation = 5,
}

export interface IActivity {
  type: ActivityType,
  at: Date,
  title: string,
  image: string,
  link: string,
}