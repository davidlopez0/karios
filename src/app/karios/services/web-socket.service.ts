import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Stomp } from '@stomp/stompjs';
import { Observable, Subject } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import * as SockJS from "sockjs-client";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    stompClient: any;
    responseSubject = new Subject<any>;
    webSocketEndpoint: string = "ws://localhost:8080/ws";
    messages: any[] = []; 

    connect(chatId: number){
      console.log("iniciando bro");
      let ws = new WebSocket(this.webSocketEndpoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function(frame: any){
        _this.stompClient.subscribe(`/user/${chatId}/queue/messages`, function(response: any){
          _this.onMessageReceived(response);
        })
      })
    }

    send(newMessage: any){
      this.stompClient.send("/app/chat", { }, JSON.stringify(newMessage));
    }

    close(){
      this.stompClient.disconnect();
    }

    isOpen(): number {
      return this.stompClient.webSocket.OPEN;
    }

    onMessageReceived(message: any){
      this.messages.push(JSON.parse(message.body));
    }
}

