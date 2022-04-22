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
        console.log(this.usersUrl+'signUp');
        console.log(info);
        return this.http.post<string>(this.usersUrl+'signUp', info, httpOptions);
    }

}