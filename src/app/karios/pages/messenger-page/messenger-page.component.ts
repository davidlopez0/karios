import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import { Chat } from '../../interfaces/chat-item.interface';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss']
})
export class MessengerPageComponent implements OnInit {
  
  chats: any[] = [];
  
  url?: string;

  constructor(private router: Router, private messengerService: MessengerService,
    private webSocketService: WebSocketService){}

  ngOnInit(): void {
    this.url = this.router.url;
    this.messengerService.getAllUserChats()
      .subscribe((resp)=> {
        this.chats = resp;
      });
  }

  get createChat(): boolean {
    return this.messengerService.openOrClose;
  }

  open(): void {
    this.messengerService.openOrClose = true;
  }

  

}
