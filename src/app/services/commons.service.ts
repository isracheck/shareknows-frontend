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

export class CommonsService {

    private serviceCityUrl = environment.baseUrl + 'api/cities/';
    private serviceCountryUrl = environment.baseUrl + 'api/countries/';
    private serviceLanguagesUrl = environment.baseUrl + 'api/languages/';

    constructor(private http: HttpClient) { }

    getCountries(): Observable<any> {
      return this.http.get<any>(this.serviceCountryUrl+"all")
        .pipe(map(countries => {
          return countries;
        }));
    }

    getCities(idCountry: string): Observable<any> {
      return this.http.get<any>(this.serviceCityUrl+"findByCountry/"+idCountry)
        .pipe(map(cities => {
          return cities;
        }));
    }

    getLanguages(): Observable<any> {
      return this.http.get<any>(this.serviceLanguagesUrl+"all")
        .pipe(map(languages => {
          return languages;
        }));
    }
}