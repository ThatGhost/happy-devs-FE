import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');

  public constructor(private readonly userService: UserService) {
    
  }

  public login(): void {
    this.userService.login(this.email.value ?? "", this.password.value ?? "");
  }
}
