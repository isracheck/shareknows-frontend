import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITY_KEY = 'AuthAuthority';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: any) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): any {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthority(authority: any) {
    window.sessionStorage.removeItem(AUTHORITY_KEY);
    window.sessionStorage.setItem(AUTHORITY_KEY, authority);
  }

  public getAuthority(): any {
    return sessionStorage.getItem(AUTHORITY_KEY);
  }
}
