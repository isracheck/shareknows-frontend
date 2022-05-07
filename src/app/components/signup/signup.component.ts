import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../model/user.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  submitted = false;

  private emailValidator: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // convenience getter for easy access to form fields
  get fc() { return this.signupForm.controls; }

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router,) { 
    this.signupForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailValidator)]),
    });
  }

  

  saveData(): void {
    
    this.submitted = true;

    if (this.signupForm.valid) {
      const userSave = new UserModel();
      userSave.username = this.signupForm.value.username;
      userSave.hash = this.signupForm.value.password;
      userSave.name = this.signupForm.value.name;
      userSave.lastname = this.signupForm.value.lastname;
      userSave.phone = this.signupForm.value.phone;
      userSave.email = this.signupForm.value.email;

      
      this.authService.signup(userSave).subscribe( data => {
        this.toastr.success('Alta procesada correctamente','Bienvenido');
        this.router.navigate(['/home']);
      },
      error => {
        this.toastr.error('Parece que tenemos un error','Ups!',);
        console.log('Error',error);
      });
    } else {
      return;
    }
  }

}
