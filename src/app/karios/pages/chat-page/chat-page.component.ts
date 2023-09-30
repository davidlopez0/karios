import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { Chat } from '../../interfaces/chat-item.interface';
import { NavigationEnd, Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy{

  
  public subscriberChatPage!: Subscription;
  chats!: any[];

  constructor(private messengerService: MessengerService, private router: Router,
      private webSocketService: WebSocketService) {}

  ngOnInit(): void {

    let chatId = parseInt(this.router.url.split('/')[3]);
    console.log("SE REINICIA CHATPAGE");
    this.messengerService.getAllUserChats()
      .subscribe((resp) => {
        this.chats = resp;
        this.webSocketService.connect(chatId);
      });
    
      this.subscriberChatPage = this.router.events.pipe(
        filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event) => {
        chatId = parseInt(this.router.url.split('/')[3]);
        if(chatId){
          if(this.webSocketService.isOpen() == 1){
            this.webSocketService.close();
          }
          this.webSocketService.connect(chatId);
        }
      });
    
  }

  ngOnDestroy(): void {
    this.subscriberChatPage?.unsubscribe();
  }

}
