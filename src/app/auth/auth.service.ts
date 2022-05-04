import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtResponse } from '../model/jwt-response';
import { AuthLoginInfo } from '../model/login.model';
import { TokenStorageService } from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.baseUrl + 'api/auth/signin';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
    ) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.tokenStorage.saveToken(user.accessToken);
            this.tokenStorage.saveUsername(user.username);
            this.tokenStorage.saveAuthority(user.authority);
        } else {
            throw new Error('User not found. Err: PII');
        }

        return user;
    }));
  }

  logOut() {
    // console.log('User logged out');
    this.tokenStorage.signOut();
  }
}

