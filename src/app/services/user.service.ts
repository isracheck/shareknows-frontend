import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl = environment.baseUrl + 'api/users/';

  constructor(private http: HttpClient) { }


  signUp(info: UserModel): Observable<string> {

    return this.http.post<string>(this.usersUrl + 'signUp', info, httpOptions);
  }

  signIn(info: UserModel): Observable<string> {

    return this.http.post<string>(this.usersUrl + 'signIn', info, httpOptions);
  }

  update(info: UserModel): Observable<string> {
    return this.http.put<string>(this.usersUrl + 'update/'+ info.username, info, httpOptions);
  }

  getUserdata(user: String): Observable<any> {

    return this.http.get<any>(this.usersUrl + 'find/' + user)
      .pipe(map(events => {
        return events;
      }));
  }



}