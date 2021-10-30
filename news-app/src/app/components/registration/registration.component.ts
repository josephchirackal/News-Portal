import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: any;
  userExist: boolean = false;
  constructor(private regService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.regService.logout();
    /* registration formGroup */
    this.registrationForm = new FormGroup({
      displayName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')])
    })
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get displayName() {
    return this.registrationForm.get('displayName');
  }

  /* function to do registration */
  onRegister() {
    this.userExist = false;
    if (this.registrationForm.valid) {
      const usersList = this.regService.getUsers();
      if (this.checkIfUserExist(usersList, this.registrationForm.value)) {
        this.userExist = true;
      } else {
        usersList.push(this.registrationForm.value);
        this.regService.setUsers(usersList);
        this.router.navigate(['login']);

      }
    }
  }

  /* function to check if user already exist */
  checkIfUserExist(usersList: any, data: any) {

    if (usersList.length) {
      return usersList.filter((u: any) => u.email === data.email).length ? true : false;
    } else {
      return false;
    }
  }

}
