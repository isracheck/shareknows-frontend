import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { EventService } from '../../../services/event.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { EventModel } from 'src/app/model/event.model';
import { CountryModel } from '../../../model/country.model';
import { CityModel } from '../../../model/city.model';
import { LanguageModel } from '../../../model/language.model';
import { AnyForUntypedForms, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonsService } from '../../../services/commons.service';
import { Router } from '@angular/router';
import { CitiesService } from '../../../services/cities.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {

  eventsList: EventModel[] = [];
  eventSelected: EventModel = new EventModel;
  idCountrySelected: any;
  idCitySelected: any;

  // Combos
  countryList: CountryModel[] = [];
  cityList: CityModel[] = [];
  languagesList: LanguageModel[] = [];

  // Formulario controller
  public saveForm: FormGroup;

  // submit controller
  submitted = false;

  // Outers
  private emailValidator: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // convenience getter for easy access to form fields
  get fc() { return this.saveForm.controls; }


  constructor(private eventService: EventService, private toastService: ToastrService,
    private tokenStorageService: TokenStorageService, private commonsService: CommonsService,
    private router: Router, private citiesService: CitiesService, private datePipe: DatePipe) {
    this.saveForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadCountries();
    this.loadLanguages();
  }

  private loadEvents() {

    this.eventService.getEventsByUser(this.tokenStorageService.getUsername())
      .pipe(first())
      .subscribe(
        data => {
          this.eventsList = data;
        }
      );
  }

  modifyDisplay = "none";
  detailDisplay = "none";
  deleteDisplay = "none";

  modifyPopup(event: EventModel) {
    this.modifyDisplay = "block";
    this.eventSelected = event;
    this.loadForm();
  }

  deletePopup(event: any) {
    this.deleteDisplay = "block";
    this.eventSelected = event;
    this.loadForm();
  }

  closeDeletePopup() {
    this.deleteDisplay = "none";
  }

  closeModifyPopup() {
    this.modifyDisplay = "none";
    this.cleanForm();
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

  private loadLanguages() {
    this.commonsService.getLanguages()
      .pipe(first())
      .subscribe(
        data => {
          this.languagesList = data;
        },
        error => {
          this.toastService.error('Error loading languages: ' + error.error.message);
        }
      );
  }

  onChangeCountry(idCountry: any) {
    this.loadCities(idCountry.target.value);
    this.saveForm.value.idcity = null;
  }

  createForm() {

    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      enddate: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailValidator)]),
      address: new FormControl('', [Validators.required]),
      postalcode: new FormControl('', [Validators.required]),
      idcountry: new FormControl('',),
      idcity: new FormControl('', [Validators.required]),
      value: new FormControl('0', [Validators.required]),
      maxPeople: new FormControl('', [Validators.required]),
      idlanguage: new FormControl('', [Validators.required]),
    });


  }

  loadForm() {

    if (this.eventSelected.idcity != null) {
      this.citiesService.getCountrie(this.eventSelected.idcity)
        .pipe(first())
        .subscribe(
          data => {
            this.idCountrySelected = data.idcountry;
            this.idCitySelected = this.eventSelected.idcity;
            this.loadCities(this.idCountrySelected);

            let startdate: any = this.datePipe.transform(this.eventSelected.startdate, 'yyyy-MM-ddThh:mm');
            let enddate: any = this.datePipe.transform(this.eventSelected.enddate, 'yyyy-MM-ddThh:mm');

            this.saveForm.setValue({
              title: this.eventSelected.title,
              description: this.eventSelected.description,
              startdate: startdate,
              enddate: enddate,
              number: this.eventSelected.number,
              email: this.eventSelected.email,
              address: this.eventSelected.address,
              postalcode: this.eventSelected.postalcode,
              idcountry: this.idCountrySelected,
              idcity: this.idCitySelected,
              value: this.eventSelected.value,
              maxPeople: this.eventSelected.maxPeople,
              idlanguage: this.eventSelected.idlanguage
            });
          }
        );
    }
  }

  cleanForm() {
    this.saveForm.setValue({
      title: '',
      description: '',
      startdate: '',
      enddate: '',
      number: '',
      email: '',
      address: '',
      postalcode: '',
      idcountry: '',
      idcity: '',
      value: '',
      maxPeople: '',
      idlanguage: ''
    });

    this.idCountrySelected = '';
    this.idCitySelected = '';
  }

  deleteEvent() {
    this.eventService.delete(this.eventSelected).subscribe(data => {
      this.toastService.success('Evento eliminado correctamente');
      this.closeDeletePopup();
      this.loadEvents();
    },
      error => {
        this.toastService.error('Parece que tenemos un error', 'Ups!',);
        console.log('Error', error);
      });
  }

  saveData(): void {

    this.submitted = true;

    if (this.saveForm.valid) {
      const eventSave = new EventModel();
      eventSave.idevent = this.eventSelected.idevent;
      eventSave.title = this.saveForm.value.title;
      eventSave.description = this.saveForm.value.description;
      eventSave.startdate = this.saveForm.value.startdate;
      eventSave.enddate = this.saveForm.value.enddate;
      eventSave.number = this.saveForm.value.number;
      eventSave.email = this.saveForm.value.email;
      eventSave.address = this.saveForm.value.address;
      eventSave.postalcode = this.saveForm.value.postalcode;
      eventSave.idcity = this.saveForm.value.idcity;
      eventSave.idlanguage = this.saveForm.value.idlanguage;
      eventSave.value = this.saveForm.value.value;
      eventSave.username = this.tokenStorageService.getUsername();
      eventSave.maxPeople = this.saveForm.value.maxPeople;


      this.eventService.update(eventSave).subscribe(data => {
        this.toastService.success('Evento modificado correctamente', 'Genial');
        this.closeModifyPopup();
        this.loadEvents();
      },
        error => {
          this.toastService.error('Parece que tenemos un error', 'Ups!',);
          console.log('Error', error);
        });


    } else {
      return;
    }
  }

}
