import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MessengerPageComponent } from './pages/messenger-page/messenger-page.component';
import { PartyPageComponent } from './pages/party-page/party-page.component';
import { KariosRoutingModule } from './karios-routing.module';
import { StorieComponent } from './components/storie/storie.component';
import { PrimengModule } from '../primeng/primeng.module';
import { PublicationComponent } from './components/publication/publication.component';
import { ChatsItemComponent } from './components/chats-item/chats-item.component';
import { ChatComponent } from './views/chat/chat.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    MessengerPageComponent,
    PartyPageComponent,
    StorieComponent,
    PublicationComponent,
    ChatsItemComponent,
    ChatComponent,
    ChatPageComponent
  ],
  imports: [
    CommonModule,
    KariosRoutingModule,
    PrimengModule,
  ]
})
export class KariosModule { }
