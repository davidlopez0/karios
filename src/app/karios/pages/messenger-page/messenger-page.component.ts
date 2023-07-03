import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from '../../services/messenger.service';
import { Chat } from '../../interfaces/chat-item.interface';


@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss']
})
export class MessengerPageComponent implements OnInit {

  chats: Chat[] = [];

  url?: string;

  constructor(private router: Router, private messengerService: MessengerService){}

  ngOnInit(): void {
    this.url = this.router.url;
    this.chats = this.messengerService.getChats;
  }

}
