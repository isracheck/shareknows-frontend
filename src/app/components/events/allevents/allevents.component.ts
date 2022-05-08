import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import { CitiesService } from '../../../services/cities.service';
import { ActivatedRoute } from '@angular/router';
import { CountryModel } from '../../../model/country.model';
import { CityModel } from '../../../model/city.model';
import { CommonsService } from '../../../services/commons.service';


@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {

  eventsList: EventService[] = [];
  citySelected: String | undefined;
  countryList: CountryModel[] = [];
  cityList: CityModel[] = [];

  constructor(private eventService: EventService, private toastService: ToastrService, private citiesService: CitiesService,
    private activatedRoute: ActivatedRoute, private commonsService: CommonsService,) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.citySelected = params['citySel'];
    });

  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadCountries();

  }


  private loadCountries() {
    this.commonsService.getCountries()
      .pipe(first())
      .subscribe(
        data => {
          this.countryList = data;
        },
        error => {
          this.toastService.error('Error loading countries: ' + error.error.message);
        }
      );
  }

  private loadCities(idCountry: string) {
    this.commonsService.getCities(idCountry)
      .pipe(first())
      .subscribe(
        data => {
          this.cityList = data;
        },
        error => {
          this.toastService.error('Error loading cities: ' + error.error.message);
        }
      );
  }

  onChangeCountry(idCountry: any) {
    this.loadCities(idCountry.target.value);
  }

  onChangeCity(idCity: any) {
    this.citySelected = idCity.target.value;
    this.loadEvents();
  }


  private loadEvents() {


    if (this.citySelected !== null && this.citySelected !== undefined) {

      this.citiesService.getEventsFromCity(this.citySelected)
        .pipe(first())
        .subscribe(
          data => {
            this.eventsList = data;
          },
          error => {
            this.toastService.error('Error loading cities: ' + error.error.message);
          }
        );
    } else {
      this.eventService.getEvents()
        .pipe(first())
        .subscribe(
          data => {
            this.eventsList = data;
          },
          error => {
            this.toastService.error('Error loading cities: ' + error.error.message);
          }
        );
    }
  }

}
