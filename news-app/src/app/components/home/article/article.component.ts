import { Component, HostListener, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { serviceDetails } from '../home';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  page: number = 0;
  limit = 10;
  articles: any = [];
  totalPages = 0;
  selectedSection: any;


  constructor(private homeService: HomeService) {

  }

  ngOnInit(): void {
    /* subscription for section select */
    this.homeService.onSectionSelect.subscribe((data: any) => {
      if (data) {
        this.page = 0;
        this.articles = [];
        this.selectedSection = data;
        this.getArticles();
      }
    })
  }

  /* function to fetch articles */
  getArticles() {
    const params = {
      "api-key": serviceDetails.apiKey,
      "page": this.page,
      "limit": this.limit,
      "section": this.selectedSection.section
    }

    this.homeService.getArticles(serviceDetails.articleURL, params).subscribe(response => {
      this.totalPages = Math.ceil(response.num_results / this.limit);
      this.articles = [...this.articles, ...response['results']];

    })

  }

  /* function to load next set of articles */
  next() {
    ++this.page;
    this.getArticles();
  }


  /* function to add/remove articles to read later */
  readLater(article: any, ev: any) {
    let readLater = this.homeService.getReadLater();
    if (ev.target.checked) {
      readLater.push(article);
    } else {
      const index = readLater.findIndex((r: any) => r.slug_name === article.slug_name);
      readLater.splice(index, 1);
    }
    this.homeService.setReadLater(readLater);
  }

  /* function to select/deselect read later checkbox based on the data in localStorage */
  checkforReadLater(article: any) {
    let readLater = this.homeService.getReadLater();
    return readLater.some((r: any) => r.slug_name === article.slug_name)
  }

}
