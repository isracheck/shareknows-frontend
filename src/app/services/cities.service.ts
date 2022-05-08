import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EventModel } from '../model/event.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CitiesService {

  private serviceCitiesUrl = environment.baseUrl + 'api/cities/';
  private serviceCoutriesUrl = environment.baseUrl + 'api/countries/';

  constructor(private http: HttpClient) { }

  getCountrie(city: any): Observable<any> {
    return this.http.get<any>(this.serviceCitiesUrl + 'find/' + city)
      .pipe(map(events => {
        return events;
      }));
  }

  getPublicEvents(): Observable<any> {
    return this.http.get<any>(this.serviceCoutriesUrl + 'all')
      .pipe(map(events => {
        return events;
      }));
  }

  getEventsFromCity(city: any): Observable<any> {
    return this.http.get<any>(this.serviceCitiesUrl + 'find/' + city)
      .pipe(map(events => {
        return events.eventsList;
      }));
  }

  getCity(city: any): Observable<any> {
    return this.http.get<any>(this.serviceCitiesUrl + 'find/' + city)
      .pipe(map(events => {
        return events;
      }));
  }

}