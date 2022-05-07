import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { UserModel } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-myuser',
  templateUrl: './myuser.component.html',
  styleUrls: ['./myuser.component.css']
})
export class MyuserComponent implements OnInit {

  public userForm: FormGroup;
  submitted = false;
  userData: UserModel | undefined;

  

  private emailValidator: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // convenience getter for easy access to form fields
  get fc() { return this.userForm.controls; }

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router,
    private userService: UserService, private tokenStorageService: TokenStorageService,
    private toastService: ToastrService,) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  createForm() {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required]),
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailValidator)]),
      createAt: new FormControl('', []),
    });
  }

  private loadUserData() {
    this.userService.getUserdata(this.tokenStorageService.getUsername())
      .pipe(first())
      .subscribe(
        data => {
          this.userData = data;
          this.loadForm();
        },
        error => {
          this.toastService.error('Error loading userdata: ' + error.error.message);
        }
      );
  }

  loadForm() {

    if (this.userData != null) {
      this.userForm.setValue({
        username: this.userData.username,
        name: this.userData.name,
        lastname: this.userData.lastname,
        phone: this.userData.phone,
        email: this.userData.email,
        createAt: this.userData.createAt,
      });
    }
  }

  saveData(): void {

    this.submitted = true;

    if (this.userForm.valid) {
      const userSave = new UserModel();
      userSave.username = this.userForm.value.username;
      userSave.name = this.userForm.value.name;
      userSave.lastname = this.userForm.value.lastname;
      userSave.phone = this.userForm.value.phone;
      userSave.email = this.userForm.value.email;

      this.userService.update(userSave).subscribe(data => {
        this.toastr.success('Datos actualizados correctamente');
        this.router.navigate(['/home']);
      },
        error => {
          this.toastr.error('Parece que tenemos un error', 'Ups!',);
          console.log('Error', error);
        });
    } else {
      return;
    }
  }

}
