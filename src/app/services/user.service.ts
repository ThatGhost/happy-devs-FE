import { Injectable } from '@angular/core';
import { Id } from '../app.config';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;
  private userId: Id = 0;

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
  ) 
  {
    // check localStorage
  }

  public isUserLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getUserId(): Id {
    if(!this.loggedIn) return 0;
    return this.userId;
  }

  public async login(email: string, password: string): Promise<void> {
    const token: {token:string } = await this.api.post<{token: string}>('Users/login', {
      email: email,
      password: password,
    });

    this.userId = Number(token.token.substring(0, token.token.indexOf(":")));
    this.loggedIn = true;
    this.api.setToken(token.token);
    this.router.navigateByUrl("");
  }

  public async signUp(UserName: string, email: string, password: string): Promise<void> {
    this.userId = await this.api.post<Id>('Users', {
      userName: UserName,
      email: email,
      password: password,
    });
    await this.login(email, password);
    this.router.navigateByUrl("profile/"+this.userId);
  }
}