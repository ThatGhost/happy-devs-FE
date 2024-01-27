import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Id } from '../app.config';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;
  private userId: Id = 0;
  private isBrowser: boolean = false;

  private localStorageKey = "token";

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly _platformId: Object
  ) 
  {
    // check localStorage
    this.isBrowser = isPlatformBrowser(_platformId);

    if (this.isBrowser) {
      const token: string | null = localStorage.getItem(this.localStorageKey);
      if(token !== null) {
        api.setToken(token);
        this.loggedIn = true;
        this.userId = Number(token.substring(0, token.indexOf(":")));
      }  
    }
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
    if (this.isBrowser) localStorage.setItem(this.localStorageKey, token.token);
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

  public signOut(): void {
    this.loggedIn = false;
    this.userId = 0;
    this.api.setToken('');
    if (this.isBrowser) localStorage.removeItem(this.localStorageKey);
  }
}