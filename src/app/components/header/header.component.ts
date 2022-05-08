import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private authService: AuthService,) { }

  isLoged: boolean = false;

  ngOnInit(): void {
    if (this.tokenStorageService.getUsername() !== "" && this.tokenStorageService.getUsername() !== null) {
      this.isLoged = true;
    }
  }

  redir() {
    this.authService.logOut();
    window.location.reload();
  }


}
