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

  public async getRecentPosts(): Promise<IPostMinimal[]> {
    if (!this.userService.isUserLoggedIn()) return [];

    const raw: IPostMinimalData[] =  await this.api.get<IPostMinimalData[]>(`Posts/recent`);
    return raw.map(this.toIPostMinimal);
  }

  public async getPost(id: Id): Promise<IPost> {
    if (!this.userService.isUserLoggedIn()) throw new Error('UserNotLoggedIn');

    const raw: IPostData =  await this.api.get<IPostData>(`Posts/${id}`);
    return this.toIPost(raw);
  }

  private toIPostMinimal(data: IPostMinimalData): IPostMinimal {
    const atDate: Date = new Date(data.at);
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      at: getDateString(atDate),
    }
  }

  private toIPost(data: IPostData): IPost {
    const atDate: Date = new Date(data.at);
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      at: getDateString(atDate),
      content: data.content ?? ""
    }
  }
}

interface IPostMinimalData {
  id: Id,
  userId: Id,
  at: string,
  title: string,
}

interface IPostData extends IPostMinimalData {
  content: string | null,
}

export interface IPostMinimal {
  id: Id,
  userId: Id,
  at: string,
  title: string,
}

export interface IPost extends IPostMinimal {
  content: string,
}