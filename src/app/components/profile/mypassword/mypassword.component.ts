import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../providers/custom-validators';

@Component({
  selector: 'app-mypassword',
  templateUrl: './mypassword.component.html',
  styleUrls: ['./mypassword.component.css']
})
export class MypasswordComponent implements OnInit {

  public userForm: FormGroup;
  submitted = false;
  userData: UserModel | undefined;

  // convenience getter for easy access to form fields
  get fc() { return this.userForm.controls; }

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router,
    private userService: UserService, private tokenStorageService: TokenStorageService,
    private toastService: ToastrService,) {
    this.userForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    return new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
    );
  }


  saveData(): void {

    this.submitted = true;

    if (this.userForm.value.password != this.userForm.value.confirmPassword) {
      this.toastr.error('El password no coincide');
       return;
    }

    if (this.userForm.valid) {
      const userSave = new UserModel();
      userSave.username = this.tokenStorageService.getUsername();
      userSave.hash = this.userForm.value.password;

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
