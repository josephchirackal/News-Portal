import { Component, Input, OnInit } from '@angular/core';
import { serviceDetails } from '../home';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  sections: any;
  selectedSectionIdx = 0;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getSections();
  }

  getSections() {
    this.homeService.getSections(serviceDetails.sectionURL, {"api-key": serviceDetails.apiKey}).subscribe((response: any)=> {
      this.sections = response.results;
      this.homeService.sectionSelect.next(this.sections[0]);
    })
  }

  onsectionChange(section: any, i: number ) {
    this.selectedSectionIdx = i;
    this.homeService.sectionSelect.next(section);
  }

}
