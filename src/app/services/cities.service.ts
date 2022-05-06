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

    private serviceUrl = environment.baseUrl + 'api/cities/find/';

    constructor(private http: HttpClient) { }

    getCountrie(city: any): Observable<any> {
        return this.http.get<any>(this.serviceUrl+city)
          .pipe(map(events => {
            return events;
          }));
      }

}