import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Id } from '../app.config';

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
}
