import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,private router: Router,) { }

  isLoged: boolean = false;

  ngOnInit(): void {
    if (this.tokenStorageService.getUsername() !== "" && this.tokenStorageService.getUsername() !== null) {
      this.isLoged = true;
    }
  }



}
