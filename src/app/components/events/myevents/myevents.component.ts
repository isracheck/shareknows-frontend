import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { EventService } from '../../../services/event.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { EventModel } from 'src/app/model/event.model';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {

  eventsList: EventModel[] = [];

  constructor(private eventService: EventService, private toastService: ToastrService,
    private tokenStorageService: TokenStorageService,) { }

  ngOnInit(): void {
    this.loadEvents();
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

}
