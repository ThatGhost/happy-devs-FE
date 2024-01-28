import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Console } from 'console';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private mainUrl: string = "https://localhost:7194/api/";
  private token: string = "";

  constructor(private readonly http: HttpClient,) { }

  public setToken(token: string) {
    this.token = token;
  }

  public async get<T>(url: string): Promise<T> {
    console.log(this.token);
    return await firstValueFrom(this.http.get<T>(this.mainUrl + url, {
      headers: {
        "Authentication": this.token,
      },
    }));
  }

  public async getblob(url: string): Promise<Blob> {
    console.log(this.token);
    return await firstValueFrom(this.http.get(this.mainUrl + url, {
      headers: {
        "Authentication": this.token,
      },
      reportProgress: false,
      responseType: 'blob',
    }));
  }

  public async post<T>(url: string, body: object): Promise<T> {
    return await firstValueFrom(this.http.post<T>(this.mainUrl + url, body, {
      headers: {
        "Authentication": this.token,
      }
    }));
  }

  public async put(url: string, body: object): Promise<void> {
    await firstValueFrom(this.http.put(this.mainUrl + url, body, {
      headers: {
        "Authentication": this.token,
      }
    }));
  }
}
