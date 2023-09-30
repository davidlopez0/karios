import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { NavigationEnd, Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { webSocket } from'rxjs/webSocket'
import { switchMap, map, filter, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatPageComponent } from '../../pages/chat-page/chat-page.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  chat: any;
  currentUrl: any;
  currentUserId!: number;
  messages: any[] = [];
  @ViewChild('chatWindow') chatWindow!: ElementRef<HTMLDivElement>;
  @ViewChild('inputMessage') inputMessage!: ElementRef<HTMLInputElement>;
  public subscriber!: Subscription;

  constructor(private messengerService: MessengerService, private router: Router,
    private webSocketService: WebSocketService, private cpc: ChatPageComponent){

  }

  ngOnInit(): void {
    console.log("SE REINICIA CHAT")
    const { userId } = JSON.parse(localStorage.getItem("user") || '');
    this.currentUserId = userId;
    this.currentUrl = this.router.url;
    let chats: any[] = [];
    let chatFound: any;
    this.messengerService.getAllUserChats()
      .pipe(
        switchMap((resp) => {
          chats = resp;

          chatFound = chats.find((value) => value.chatId == parseInt(this.currentUrl.split("/")[3]));
          this.chat = chatFound;

          return this.messengerService.getAllMessagesByChatId(parseInt(this.currentUrl.split("/")[3]));
        })
      )
      .subscribe((resp) => {
        this.webSocketService.messages = resp;
        setInterval(()=> {
          this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
        },500)
      })

      
        console.log('holaaaalalsldalsdlalsd');
        this.subscriber = this.router.events.pipe(
          filter((event: any) => event instanceof NavigationEnd)
        )
        .subscribe((event) => {
            this.currentUrl = this.router.url;
            chatFound = chats.find((value) => value.chatId == parseInt(this.currentUrl.split("/")[3]));
            this.chat = chatFound;
            if(this.currentUrl.split("/")[3]){
              this.messengerService.getAllMessagesByChatId(parseInt(this.currentUrl.split("/")[3]))
              .subscribe((resp) => {
                this.webSocketService.messages = resp;
              });
            }
        });
      
  }

  ngOnDestroy(): void {
    console.log("se destruye")
    this.subscriber.unsubscribe();
    this.webSocketService.close();
  }

  get getMessages(): any[] {
    return this.webSocketService.messages;
  }

  enviarMensaje(event: any){
    const message = event.target.value;
    const chatId = this.currentUrl.split("/")[3];
    const { userId } = JSON.parse(localStorage.getItem("user") || '');
    const newMessage = {
      message,
      messageDate: new Date(),
      userId,
      chatId
    };
    this.webSocketService.send(newMessage);
    this.inputMessage.nativeElement.value = '';
    this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
  }

}
