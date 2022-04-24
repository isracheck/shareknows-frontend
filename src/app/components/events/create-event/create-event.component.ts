import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../../services/event.service';
import { EventModel } from '../../../model/event.model';
import { CountryModel } from 'src/app/model/country.model';
import { CityService } from '../../../services/city.service';
import { first } from 'rxjs/operators';
import { CityModel } from '../../../model/city.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  // Combos
  countryList: CountryModel[] = [];
  cityList: CityModel[] = [];

  // Formulario controller
  public saveForm: FormGroup;

  // submit controller
  submitted = false;

  // Outers
  private emailValidator: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // convenience getter for easy access to form fields
  get fc() { return this.saveForm.controls; }

  constructor(private eventService: EventService, private toastService: ToastrService, private cityService: CityService) { 
  
    this.saveForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  private loadCountries() {
    this.cityService.getCountries()
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
    this.cityService.getCities(idCountry)
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
      idcountry: new FormControl('', ),
      idcity: new FormControl('', [Validators.required]),
      value: new FormControl('0', [Validators.required]),
      maxPeople: new FormControl('', [Validators.required]),
    });
  }

  

  saveData(): void {
    console.log(this.saveForm);
    this.submitted = true;

    if (this.saveForm.valid) {
      const eventSave = new EventModel();
      eventSave.title = this.saveForm.value.title;
      eventSave.description = this.saveForm.value.description;
      eventSave.startdate = this.saveForm.value.startdate;
      eventSave.enddate = this.saveForm.value.enddate;
      eventSave.number = this.saveForm.value.number;
      eventSave.email = this.saveForm.value.email;
      eventSave.address = this.saveForm.value.address;
      eventSave.postalcode = this.saveForm.value.postalcode;
      eventSave.idcity = this.saveForm.value.idcity;
      eventSave.value = this.saveForm.value.value;
      eventSave.iduser = 3;
      eventSave.maxPeople = this.saveForm.value.maxPeople;

      
      this.eventService.save(eventSave).subscribe( data => {
        this.toastService.success('Evento creado correctamente','Genail');
        console.log('OK',data);
      },
      error => {
        this.toastService.error('Parece que tenemos un error','Ups!',);
        console.log('Error',error);
      });
    } else {
      return;
    }
  }

}
