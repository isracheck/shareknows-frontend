import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../../services/event.service';
import { EventModel } from '../../../model/event.model';
import { CountryModel } from 'src/app/model/country.model';
import { CommonsService } from '../../../services/commons.service';
import { first } from 'rxjs/operators';
import { CityModel } from '../../../model/city.model';
import { LanguageModel } from '../../../model/language.model';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myevents-detail',
  templateUrl: './myevents-detail.component.html',
  styleUrls: ['./myevents-detail.component.css']
})
export class MyeventsDetailComponent implements OnInit {




  constructor(private eventService: EventService, private toastService: ToastrService,
    private commonsService: CommonsService, private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }




}
