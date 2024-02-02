import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Id } from '../../app.config';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  public constructor(private readonly postService: PostService) {

  }

  public async savePost(title: string, content: string) {
    const id: Id = await this.postService.makePost(title, content);
    console.log(id);
  }
}
