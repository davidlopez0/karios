import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})

export class UserService {

    baseUrl = environments.baseUrl;
    cloudinaryUploadUrl = environments.cloudinaryUploadUrl;

    constructor(private http: HttpClient) { }

    get getHttpHeaders(): HttpHeaders {
        const token: string = localStorage.getItem("token") || '';
    
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        return headers;
      }

    getUserByUsername(username: string) {
        const headers = this.getHttpHeaders;
        
        return this.http.get<User[]>(`${this.baseUrl}/users/username/${username}`, { headers });
    }
    
}