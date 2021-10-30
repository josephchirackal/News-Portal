import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  loggedIn = new BehaviorSubject<Boolean>(false);
  isLoggedIn = this.loggedIn.asObservable();
  constructor() { }


  getUsers() {
    var list = localStorage.getItem('usersList');
    return list ? JSON.parse(list) : []
  }

  setUsers(usersList: any) {
    localStorage.setItem('usersList', JSON.stringify(usersList))
  }

  getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
  setLoggedInUser(loggedInUser: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
  }

  logout() {
    this.loggedIn.next(true);
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('readLater');
  }
}
