import { Injectable } from '@angular/core';
import { Id } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;
  private userId: Id = 0;

  constructor() 
  {
    // check localStorage
  }

  public isUserLoggedIn(): boolean {
    return this.loggedIn;
  }

  public login(email: string, password: string) {

  }

  public signUp(UserName: string, email: string, password: string) {

  }
}
