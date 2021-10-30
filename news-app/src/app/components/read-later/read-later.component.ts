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
  page = 1;
  limit =2;
  ngOnInit(): void {
    this.articles = this.readService.getReadLater();
  }

  onRemove(article:any) {
    const index = this.articles.findIndex((a:any) => a.slug_name == article.slug_name)
    this.articles.splice(index,1);
    this.readService.setReadLater(this.articles);
  }

  paginateArticle() {
    return this.articles.slice(0,(this.limit*this.page))
  }

  next() {
    ++this.page;
  }

}
