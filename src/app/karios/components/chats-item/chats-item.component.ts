import { Component, Input } from '@angular/core';
import { Chat } from '../../interfaces/chat-item.interface';

@Component({
  selector: 'app-chats-item',
  templateUrl: './chats-item.component.html',
  styleUrls: ['./chats-item.component.scss']
})
export class ChatsItemComponent {

  @Input() chatInformation!: any;
  

}
