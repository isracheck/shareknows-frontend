import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { EventModel } from '../../../model/event.model';
import { EventService } from '../../../services/event.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { UserModel } from '../../../model/user.model';
import { CitiesService } from '../../../services/cities.service';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {

  @Input() eventData: any | undefined;
  @Input() imagen: any | true;

  closeModal: string | undefined;
  totalJoined: number = 0;
  usersJoined: UserModel[] = [];
  userLogedIsJoined: boolean | undefined;
  cityData: String = "";

  constructor(private citiesService: CitiesService, private eventService: EventService, private toastService: ToastrService, private tokenStorageService: TokenStorageService) {


  }


  ngOnInit(): void {
    this.getTotal();
  }

  getTotal() {
    this.eventService.getJoiners(this.eventData.idevent)
      .pipe(first())
      .subscribe(
        data => {
          this.totalJoined = data.length;
          this.usersJoined = data;

          if (this.tokenStorageService.getUsername() !== null && this.tokenStorageService.getUsername() !== undefined) {
            let users = this.usersJoined.map(a => a.username);
            this.userLogedIsJoined = users.includes(this.tokenStorageService.getUsername());
          }

          this.getCityData();
        },
        error => {
          this.toastService.error('Error loading totals: ' + error.error.message);
        }
      );
  }

  getCityData() {
    this.citiesService.getCity(this.eventData.idcity)
      .pipe(first())
      .subscribe(
        data => {
          this.cityData = data.name;
        },
        error => {
          this.toastService.error('Error loading cities: ' + error.error.message);
        }
      );
  }


  deleteDisplay = "none";
  joinDisplay = "none";
  detailDisplay = "none";

  deletePopup(event: any) {
    this.deleteDisplay = "block";
  }

  closeDeletePopup() {
    this.deleteDisplay = "none";
  }

  unsuscribeEvent() {
    const userJoinSave = new UserModel();
    userJoinSave.username = this.tokenStorageService.getUsername();

    this.eventService.deleteJoin(this.eventData.idevent, userJoinSave).subscribe(data => {
      this.toastService.success('Se ha desuscrito al evento correctamente', 'Genial');
      this.closeDeletePopup();
      this.getTotal();
    },
      error => {
        this.toastService.error('Parece que tenemos un error', 'Ups!',);
        console.log('Error', error);
      });
  }

  joinPopup(event: any) {
    this.joinDisplay = "block";
  }

  closeJoinPopup() {
    this.joinDisplay = "none";
  }

  joinEvent() {
    const userJoinSave = new UserModel();
    userJoinSave.username = this.tokenStorageService.getUsername();

    this.eventService.addJoin(this.eventData.idevent, userJoinSave).subscribe(data => {
      this.toastService.success('Se ha suscrito al evento correctamente', 'Genial');
      this.closeJoinPopup();
      this.getTotal();
    },
      error => {
        this.toastService.error('Parece que tenemos un error', 'Ups!',);
        console.log('Error', error);
      });
  }

  detailPopup() {
    this.detailDisplay = "block";
  }

  closeDetailPopup() {
    this.detailDisplay = "none";
  }
}
