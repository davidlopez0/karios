import {Component, OnInit} from '@angular/core';
import {Publication} from "../../interfaces/publication.interface";
import {PublicationService} from "../../services/publication.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private publicationService: PublicationService){}

  ngOnInit(): void {
    this.publicationService.getAllPublications();
  }

  get getPublications(): Publication[] {
    return this.publicationService.getPublications;
  }

}
