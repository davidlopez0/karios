import {Component, OnInit} from '@angular/core';
import {Publication} from "../../interfaces/publication.interface";
import {PublicationService} from "../../services/publication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private publicationService: PublicationService){}

  ngOnInit(): void {
    this.publicationService.getAllPublications();
  }

  get getPublications(): Publication[] {
    return this.publicationService.getPublications;
  }

}
