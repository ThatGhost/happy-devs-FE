import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';

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
    const parsed: {type: ActivityType, at: Date}[] = activityData.map(data => {
      return {
        type: data.type as ActivityType,
        at: new Date(data.at)
      }
    });
    return parsed.map(this.toActivity);
  }

  private toActivity(data: {type: ActivityType, at: Date}): IActivity {
    const activity: IActivity = {
      type: data.type,
      at: data.at,
      title: "",
      image: "",
    }

    switch(activity.type) {
      case ActivityType.UpdatedProfile: 
        activity.title = "Updated Profile!";
        activity.image = "/assets/profile-icon.png";
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
  AskedQuestion = 2,
  AwnseredQuestion = 3,
  UpdatedDocumentation = 4,
}

export interface IActivity {
  type: ActivityType,
  at: Date,
  title: string,
  image: string,
}