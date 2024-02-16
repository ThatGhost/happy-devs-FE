import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  username = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');

  public constructor(private readonly userService: UserService) {
  }

  public signUp(): void {
    // do validation
    this.userService.signUp(this.username.value ?? "", this.email.value ?? "", this.password.value ?? "")
  }
}
