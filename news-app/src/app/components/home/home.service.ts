import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  sectionSelect = new BehaviorSubject(null);
  onSectionSelect = this.sectionSelect.asObservable();
  constructor(private http: HttpClient) { }


  getSections(url: string, params: any) {
    return this.http.get(url, { params })
  }

  getArticles(url: string, params: any) {
    return this.http.get<any>(url, { params })
  }

  setReadLater(readLater: any) {
    localStorage.setItem('readLater', JSON.stringify(readLater));
  }

  getReadLater() {
    const article = localStorage.getItem('readLater')
    return  article? JSON.parse(article) : [];
  }
}
