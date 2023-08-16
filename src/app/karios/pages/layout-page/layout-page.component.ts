import {Component, OnInit} from '@angular/core';
import {Publication} from "../../interfaces/publication.interface";
import {PublicationService} from "../../services/publication.service";

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {

  get currentUser(): string {
    const user = JSON.parse(localStorage.getItem('user') || '');
    return user?.username;
  }
}
