import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration/registration.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: any;
  loggedInUserDetail: any;
  saveSuccess: boolean = false;
  constructor(private loginService: RegistrationService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    const loggedInUser = this.loginService.getLoggedInUser();
    this.profileForm = new FormGroup({
      displayName: new FormControl(loggedInUser.displayName, [Validators.required]),
      email: new FormControl({value: loggedInUser.email, disabled: true}, [Validators.required]),
      password: new FormControl(loggedInUser.password, [Validators.required])
    }) 
  }

  onSave() {
    this.saveSuccess = false;
    if(this.profileForm.valid) {
      const newData = this.profileForm.getRawValue();
      const userList = this.loginService.getUsers();
      const index = userList.findIndex((u:any) => u.email === newData.email)
      userList[index] = newData;
      this.loginService.setUsers(userList);
      this.loginService.setLoggedInUser(newData);
      this.saveSuccess = true;
      setTimeout(() => {
        this.saveSuccess = false;
      }, 5000);

    }
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.loginService.logout();
      let userList = this.loginService.getUsers();
      const index = userList.findIndex((u:any) => u.email === this.profileForm.getRawValue().email)
      this.loginService.setUsers(userList.splice(index, 1));
      this.router.navigate(['login'])
    }, (reason) => {
   
    });
  }

}
