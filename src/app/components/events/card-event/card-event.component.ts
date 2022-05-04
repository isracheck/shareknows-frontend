import { Component, Input, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { EventModel } from '../../../model/event.model';
import { EventService } from '../../../services/event.service';

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

  constructor(private modalService: NgbModal, private eventService: EventService, private toastService: ToastrService,) { }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal() {
    this.eventService.getJoiners(this.eventData.idevent)
    .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.totalJoined = data.length;
        },
        error => {
          this.toastService.error('Error loading joiners: ' + error.error.message);
        }
      );
  }

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      console.log(res);
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      console.log(res);
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
