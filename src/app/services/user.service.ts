import { Injectable } from '@angular/core';
import { Id } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;
  private token: string = "";
  private userId: Id = 0;
  private url: string = "https://localhost:7194/api/Users"

  constructor(private readonly http: HttpClient) 
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

  public login(email: string, password: string) {

  }

  public async signUp(UserName: string, email: string, password: string): Promise<void> {
    this.userId = await firstValueFrom(this.http.post<Id>(this.url, {
      userName: UserName,
      email: email,
      password: password,
    }));
    this.loggedIn = true;
  }
}