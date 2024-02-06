import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Id } from '../app.config';
import { getDateString } from '../utils/dateUtils';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private readonly api: ApiService,
    private readonly userService: UserService,
  ) {

  }

  public async makePost(title: string, content: string): Promise<Id> {
    const id: Id = await this.api.post(`Posts/${this.userService.getUserId()}`, {
      title: title,
      content: content,
    });
    return id;
  }

  public async getRecentPosts(): Promise<IPost[]> {
    if (!this.userService.isUserLoggedIn()) return [];

    const raw: IPostData[] =  await this.api.get<IPostData[]>(`Posts/recent`);
    return raw.map(this.toIPost);
  }

  private toIPost(data: IPostData): IPost {
    const atDate: Date = new Date(data.at);
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      content: data.content ?? "",
      at: getDateString(atDate),
    }
  }
}

interface IPostData {
  id: Id,
  userId: Id,
  at: string,
  title: string,
  content: string | null,
}

export interface IPost {
  id: Id,
  userId: Id,
  at: string,
  title: string,
  content: string,
}
