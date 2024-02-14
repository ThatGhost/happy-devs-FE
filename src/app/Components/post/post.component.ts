import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { IPost, PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { IProfile, ProfileService } from '../../services/profile.service';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RecentPostsComponent } from '../recent-posts/recent-posts.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RecentPostsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  public thisPost!: IPost;
  public thisPostUser!: IProfile;

  public writingComment: boolean = true;

  @ViewChild('commentArea') commentTextArea!: ElementRef;

  public constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
    ) {

  }

  async ngOnInit() {
    const postId = Number((await firstValueFrom(this.route.paramMap)).get('id'));
    this.thisPost = await this.postService.getPost(postId);
    this.thisPostUser = (await this.profileService.getProfiles([this.thisPost.userId]))[0];
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

  saveComment() {
    this.writingComment = false;
  }
}
