import { Injectable } from '@angular/core';
import { Chat } from '../interfaces/chat-item.interface';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private __chats: Chat[] = [
    {
      chat_id: 85952,
      user_id: 5599,
      username: "pancho",
      last_message: "hola",
      date: "19:30"
    },
    {
      chat_id: 859252,
      user_id: 5596,
      username: "mario",
      last_message: "adios",
      date: "19:30"
    },
    {
      chat_id: 8595265,
      user_id: 55991,
      username: "pedro",
      last_message: "buenas tardes",
      date: "19:30"
    }
  ]  

  get getChats(): Chat[] {
    return [ ...this.__chats ];
  }

}
