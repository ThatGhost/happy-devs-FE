import { Injectable } from '@angular/core';
import { Id } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;
  private token: string = "";
  private userId: Id = 0;
  private url: string = "https://localhost:7194/api/Users"

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) 
  {
    // check localStorage
  }

  public isUserLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getUserId(): Id {
    if(!this.loggedIn) throw Error("User was not logged in when trying to get user Id");
    return this.userId;
  }

  public async login(email: string, password: string): Promise<void> {
    this.token = (await firstValueFrom(this.http.post<{token: string}>(this.url + "/login", {
      email: email,
      password: password,
    }))).token;
    this.loggedIn = true;
    this.router.navigateByUrl("");
  }

  public async signUp(UserName: string, email: string, password: string): Promise<void> {
    this.userId = await firstValueFrom(this.http.post<Id>(this.url, {
      userName: UserName,
      email: email,
      password: password,
    }));
    await this.login(email, password);
    this.router.navigateByUrl("profile/"+this.userId);
  }
}