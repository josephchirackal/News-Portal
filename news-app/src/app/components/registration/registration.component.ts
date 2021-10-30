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
    this.registrationForm = new FormGroup({
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }) 
  }

  onRegister() {
    this.userExist = false;
    if(this.registrationForm.valid) {
      const usersList = this.regService.getUsers();
      if(this.checkIfUserExist(usersList, this.registrationForm.value)) {
        this.userExist = true;
      } else {
        usersList.push(this.registrationForm.value);
        this.regService.setUsers(usersList);
        this.router.navigate(['login']);

      }
    }
  }

  checkIfUserExist(usersList: any, data: any) {
    
    if(usersList.length) {
      return usersList.filter((u:any) => u.email === data.email).length ? true : false;
    } else {
      return false;
    }
  }

}
