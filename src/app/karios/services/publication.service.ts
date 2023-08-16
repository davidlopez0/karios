import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Publication} from "../interfaces/publication.interface";
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private publications!: Publication[];
  baseUrl: string = `${environments.baseUrl}`;
  cloudinaryUploadUrl: string = `${environments.cloudinaryUploadUrl}`;

  constructor(private httpClient: HttpClient) {
  }

  get getPublications(): Publication[] {
    return this.publications;
  }

  get getHttpHeaders(): HttpHeaders {
    const token: string = localStorage.getItem("token") || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  getAllPublications(): void {

    const headers = this.getHttpHeaders;
    
    this.httpClient.get<Publication[]>(`${this.baseUrl}/publications/`, { headers })
      .subscribe((resp) => {
        this.publications = resp.reverse();
      })

  }

  getAllPublicationsByUserId(id: number){

    const headers = this.getHttpHeaders;

    return this.httpClient.get(`${this.baseUrl}/publications/user-id/${id}`, { headers });
  }

  uploadImage(file: File) {

    const formData = new FormData();
    formData.append('upload_preset', 'karios');
    formData.append('file', file);

    return this.httpClient.post(`${this.cloudinaryUploadUrl}?w=1080&h=1080`, formData);

  }

  createPublication(publication: Publication) {

    const headers = this.getHttpHeaders;

    return this.httpClient.post(`${this.baseUrl}/publications/create`, publication, { headers });

  }

}
