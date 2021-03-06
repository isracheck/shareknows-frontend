import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventModel } from '../model/event.model';
import { UserModel } from '../model/user.model';


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

    return this.http.post<string>(this.serviceUrl + 'save', data, httpOptions);
  }

  update(data: EventModel): Observable<string> {
    return this.http.put<string>(this.serviceUrl + 'update/' + data.idevent, data, httpOptions);
  }

  delete(data: EventModel): Observable<string> {
    return this.http.delete<string>(this.serviceUrl + 'delete/' + data.idevent, httpOptions);
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + "all/")
      .pipe(map(events => {
        return events;
      }));
  }

  getEventsByUser(username: any): Observable<any> {

    return this.http.get<any>(this.serviceUrl + "findByUsername/" + username)
      .pipe(map(events => {
        return events;
      }));
  }

  getJoiners(idevent: any): Observable<any> {
    return this.http.get<any>(this.serviceUrl + "findJoiners/" + idevent)
      .pipe(map(events => {
        return events;
      }));
  }

  addJoin(idevent: number, data: UserModel) {
    return this.http.put<string>(this.serviceUrl + 'joinevent/' + idevent, data, httpOptions);
  }

  deleteJoin(idevent: number, data: UserModel) {
    return this.http.put<string>(this.serviceUrl + 'unsuscribevent/' + idevent, data, httpOptions);
  }



}