import { Component, inject } from '@angular/core';
import { Id } from '../../../app.config';
import { IPostMinimal, PostService } from '../../../services/post.service';
import { IProfile, ProfileService } from '../../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import _ from 'lodash';
import { userLoggedIn } from '../../../services/user.service';

@Component({
  selector: 'app-recent-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-posts.component.html',
  styleUrl: './recent-posts.component.scss'
})
export class RecentPostsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  public posts: IPostMinimal[] = [];
  public postUsers: IProfile[] = [];

  public displayPosts: Array<IPostMinimal & {username: string}> = [];

  public constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
    private readonly router: Router,
    ) {
      userLoggedIn.subscribe(() => this.getRecentPosts());
  }

  async ngAfterContentInit() {
    await this.getRecentPosts();
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

  public async goToPost(id: Id) {
    await this.router.navigateByUrl("post/"+id);
    window.location.reload();
  }
}
