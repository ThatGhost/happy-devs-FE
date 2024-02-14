import { Component } from '@angular/core';
import { IPost, IPostMinimal, PostService } from '../../services/post.service';
import { Id } from '../../app.config';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService } from '../../services/profile.service';
import _ from 'lodash';
import { Router } from '@angular/router';
import { RecentPostsComponent } from '../recent-posts/recent-posts.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, RecentPostsComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  public constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
    private readonly router: Router,
    ) {

  }

  public async savePost(title: string, content: string) {
    const id: Id = await this.postService.makePost(title, content);
    console.log(id);
  }

  public cancelPost() {
    this.router.navigateByUrl("");
  }
}
