import { Component } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { Chat } from '../../interfaces/chat-item.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  chats!: Chat[];

  constructor(private messengerService: MessengerService, private router: Router) {}

  ngOnInit(): void {
    this.chats = this.messengerService.getChats;
    
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        console.log('hola');
      }
    })
    
  }

}
