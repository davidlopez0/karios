import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Publication} from "../interfaces/publication.interface";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private publications!: Publication[];
  url: string = "http://localhost:8080/publications/";

  constructor(private httpClient: HttpClient) {
  }

  get getPublications(): Publication[] {
    return this.publications;
  }

  getAllPublications(): void {

    const authHeader = btoa(`user:0e6173b8-c7c7-4def-99c3-81081b19fb77`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${authHeader}`
    });

    this.httpClient.get<Publication[]>(this.url, { headers })
      .subscribe((resp) => {
        this.publications = resp;
      })

  }

}
