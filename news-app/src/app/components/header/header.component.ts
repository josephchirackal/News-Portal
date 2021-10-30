import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Boolean = false;
  constructor(private loginService: RegistrationService, private router: Router) { }

  ngOnInit(): void {

    this.loginService.isLoggedIn.subscribe((val) => {
      this.isLoggedIn = this.loginService.getLoggedInUser() ? true : false;
    })
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['login'])

  }

}
