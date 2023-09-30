import { Injectable } from '@angular/core';
import { Chat } from '../interfaces/chat-item.interface';
import { environments } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  openOrClose: boolean = false;
  baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient){

  }

  get getHttpHeaders(): HttpHeaders {
    const token: string = localStorage.getItem("token") || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers;
  }

  private __chats: any[] = [
  ]  

  get getChats(): Chat[] {
    return [ ...this.__chats ];
  }

  getAllUserChats(): Observable<any> {

    const { userId } = JSON.parse(localStorage.getItem('user') || ''); 

    return this.http.get<any[]>(`${this.baseUrl}/users-chats/user-id/${userId}`, { headers: this.getHttpHeaders });
  }

  getAllMessagesByChatId(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/messages/chat-id/${id}`, { headers: this.getHttpHeaders });
  }

  createChat(chat: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chats/create`, chat, { headers: this.getHttpHeaders });
  }

  createUserChat(userChatInformation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users-chats/create`, userChatInformation, { headers: this.getHttpHeaders }); 
  }

}
