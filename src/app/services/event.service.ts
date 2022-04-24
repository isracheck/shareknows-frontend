import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user.model';
import { EventModel } from '../model/event.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EventService {

    private serviceUrl = environment.baseUrl + 'api/events/';

    constructor(private http: HttpClient) { }


    save(data: EventModel): Observable<string> {
        console.log(this.serviceUrl+'save');
        console.log(data);
        return this.http.post<string>(this.serviceUrl+'save', data, httpOptions);
    }

 

}