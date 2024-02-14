import { Component, inject } from '@angular/core';
import { IPost, IPostMinimal, PostService } from '../../services/post.service';
import { Id } from '../../app.config';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService } from '../../services/profile.service';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  public thisPost!: IPost;
  public thisPostUserName!: string;

  public posts: IPostMinimal[] = [];
  public postUsers: IProfile[] = [];

  public displayPosts: Array<IPostMinimal & {username: string}> = [];

  public constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
    private readonly router: Router,
    ) {

  }

  async ngOnInit() {
    const postId = Number((await firstValueFrom(this.route.paramMap)).get('id'));
    this.thisPost = await this.postService.getPost(postId);
    await this.getRecentPosts();
    this.thisPostUserName = this.getUserFromPostUsers(this.thisPost.userId);
  }

  private async getRecentPosts() {
    this.posts = await this.postService.getRecentPosts();
    this.postUsers = await this.profileService.getProfiles(_.uniq(this.posts.map(p => p.userId)).concat([this.thisPost.userId]));
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

  public async goToPost(id: Id) {
    await this.router.navigateByUrl("post/"+id);
    window.location.reload();
  }
}
