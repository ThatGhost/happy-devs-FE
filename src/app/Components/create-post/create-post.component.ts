import { Component } from '@angular/core';
import { IPost, PostService } from '../../services/post.service';
import { Id } from '../../app.config';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService } from '../../services/profile.service';
import _ from 'lodash';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  public posts: IPost[] = [];
  public postUsers: IProfile[] = [];

  public displayPosts: Array<IPost & {username: string}> = [];

  public constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
    ) {

  }

  async ngOnInit() {
    await this.getRecentPosts();
  }

  public async savePost(title: string, content: string) {
    const id: Id = await this.postService.makePost(title, content);
    console.log(id);
  }

  private async getRecentPosts() {
    this.posts = await this.postService.getRecentPosts();
    this.postUsers = await this.profileService.getProfiles(_.uniq(this.posts.map(p => p.userId)));
    this.displayPosts = this.posts.map(p => {
      return {
        ...p,
        username: this.getUserFromPostUsers(p.userId)
      }
    })
  }

  private getUserFromPostUsers(id: Id): string {
    return this.postUsers.find(p => p.id == id)?.username ?? "user not found";
  }
}
