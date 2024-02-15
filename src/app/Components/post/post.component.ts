import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { IPost, PostService, defaultPost } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService, defaultProfile } from '../../services/profile.service';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RecentPostsComponent } from '../recent-posts/recent-posts.component';
import { Id } from '../../app.config';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RecentPostsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  public post: IPost = defaultPost;
  public commentUsers: IProfile[] = [];

  public writingComment: boolean = false;

  @ViewChild('commentArea') commentTextArea!: ElementRef;

  public constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
    ) {

  }

  async ngOnInit() {
    const postId = Number((await firstValueFrom(this.route.paramMap)).get('id'));
    this.post = await this.postService.getPost(postId) ?? defaultPost;
    this.commentUsers = await this.profileService.getProfiles(this.post.comments.map(c => c.userId).concat([this.post.userId]));
  }

  onTextAreChange() {
    const element = this.commentTextArea.nativeElement as HTMLTextAreaElement;
    element.style.height = `auto`;
    element.style.height = `${element.scrollHeight}px`;
  }

  addComment() {
    this.writingComment = true;
  }

  cancelComment() {
    this.writingComment = false;
  }

  async saveComment(content: string) {
    this.writingComment = false;
    await this.postService.createComment(content, this.post.id);
    window.location.reload();
  }

  getUsername(userId: Id): string {
    return this.commentUsers.find(c => c.id === userId)?.username ?? "user not found";
  }
}
