import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService) { 
    this.signupForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    return new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailValidator)]),
    });
  }

  saveForm(): void {
    
    this.submitted = true;

    if (this.signupForm.valid) {
      const userSave = new UserModel();
      userSave.user = this.signupForm.value.user;
      userSave.password = this.signupForm.value.password;
      userSave.name = this.signupForm.value.name;
      userSave.lastname = this.signupForm.value.lastname;
      userSave.phone = this.signupForm.value.phone;
      userSave.email = this.signupForm.value.email;

      
      this.userService.signUp(userSave).subscribe( data => {
        console.log('OK',data);
      },
      error => {
        console.log('Error',error);
      });
    } else {
      return;
    }
  }

}
