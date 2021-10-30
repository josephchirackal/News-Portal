import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.css']
})
export class ReadLaterComponent implements OnInit {

  constructor(private readService: HomeService) { }
  articles: any;
  ngOnInit(): void {
    this.articles = this.readService.getReadLater();
  }

  onRemove(article:any) {
    const index = this.articles.findIndex((a:any) => a.slug_name == article.slug_name)
    this.articles.splice(index,1);
    this.readService.setReadLater(this.articles);
  }

}
