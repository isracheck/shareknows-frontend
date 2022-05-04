import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../model/user.model';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public signinForm: FormGroup;
  submitted = false;
  role = '';

  private emailValidator: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // convenience getter for easy access to form fields
  get fc() { return this.signinForm.controls; }

  constructor(private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private toastService: ToastrService) { 
    this.signinForm = this.createForm();
  }

  ngOnInit(): void {
    this.authService.logOut();
  }

  createForm() {
    return new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(0)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  saveData(): void {
    
    this.submitted = true;

    if (this.signinForm.valid) {
      const userSave = new UserModel();
      userSave.password = this.signinForm.value.password;
      userSave.username = this.signinForm.value.username;


      this.authService.attemptAuth(userSave)
      .pipe(first())
      .subscribe(
        data => {
          this.role = this.tokenStorage.getAuthority();

          // Return to source URL
          this.router.navigate(['/home']);
          //this.isLoading = false;
        },

        error => {
          console.log(error);
          this.toastService.error('Error login in. ' + error.error.message);
          //this.isLoading = false;
        }
    );


    } else {
      return;
    }
  }

}
