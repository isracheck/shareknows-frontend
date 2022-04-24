import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public signinForm: FormGroup;
  submitted = false;

  private emailValidator: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // convenience getter for easy access to form fields
  get fc() { return this.signinForm.controls; }

  constructor(private userService: UserService) { 
    this.signinForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    return new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailValidator)]),
    });
  }

  saveData(): void {
    
    this.submitted = true;

    if (this.signinForm.valid) {
      const userSave = new UserModel();
      userSave.password = this.signinForm.value.password;
      userSave.email = this.signinForm.value.email;

      
      this.userService.signIn(userSave).subscribe( data => {
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
