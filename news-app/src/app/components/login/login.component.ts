import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loginError: boolean = false;

  constructor(private loginService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.logout();
    /* login formGroup */
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]*')])
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  /* function to perform login action */
  onLogin() {
    this.loginError = false;
    const loginData = this.loginForm.value;
    const userList = this.loginService.getUsers();
    if (this.loginForm.valid) {
      var loggedInUser: any = userList.filter((u: any) => u.email === loginData.email && u.password === loginData.password);
      loggedInUser.length ? this.postLogin(loggedInUser) : this.loginError = true;
    }
  }

  /* function to handle post login logics */
  postLogin(loggedInUser: any) {

    this.loginService.setLoggedInUser(loggedInUser[0]);
    this.loginService.loggedIn.next(true);
    this.router.navigate(['home'])
  }

}
