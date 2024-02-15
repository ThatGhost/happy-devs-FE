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

  public async createComment(content: string, postId: Id): Promise<void> {
    await this.api.put(`Posts/comment/${this.userService.getUserId()}`, {
      content: content,
      postId: postId
    });
  }

  public async getRecentPosts(): Promise<IPostMinimal[]> {
    if (!this.userService.isUserLoggedIn()) return [];

    const raw: IPostMinimalData[] =  await this.api.get<IPostMinimalData[]>(`Posts/recent`);
    return raw.map(this.toIPostMinimal);
  }

  public async getPost(id: Id): Promise<IPost | null> {
    if (!this.userService.isUserLoggedIn()) return null;

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
      content: data.content ?? "",
      comments: data.comments.map(c => {
        const commentDate: Date = new Date(c.at);
        return {
          content: c.content,
          id: c.id,
          userId: c.userId,
          at: getDateString(commentDate)  
        }
      }),
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
  comments: IPostCommentData[],
}

interface IPostCommentData {
  id: Id,
  userId: Id,
  at: string,
  content: string,
}

export interface IPostMinimal {
  id: Id,
  userId: Id,
  at: string,
  title: string,
}

export interface IPost extends IPostMinimal {
  content: string,
  comments: IPostComment[]
}

export const defaultPost: IPost = {
  title: "",
  comments: [],
  content: "",
  userId: 0,
  id: 0,
  at: "",
};

export interface IPostComment {
  id: Id,
  userId: Id,
  at: string,
  content: string,
}