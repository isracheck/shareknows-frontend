import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  eventsList: EventService[] = [];

  constructor(private eventService: EventService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.loadEvents();
  }


  private loadEvents() {
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
