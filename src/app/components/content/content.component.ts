import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CitiesService } from '../../services/cities.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


  eventsPublic: any[] = [];

  constructor(private toastService: ToastrService, private citiesService: CitiesService,
    private router: Router,) { }

  ngOnInit(): void {

    this.loadEventsPublic();
  }

  private loadEventsPublic() {
    this.citiesService.getPublicEvents()
      .pipe(first())
      .subscribe(
        data => {
          this.eventsPublic = data;
        },
        error => {
          this.toastService.error('Error loading cities: ' + error.error.message);
        }
      );
  }

  redir(ruta: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'citySel': ruta.idcity },
    }

    this.router.navigate(['/events/city/'], navigationExtras);
  }

}
