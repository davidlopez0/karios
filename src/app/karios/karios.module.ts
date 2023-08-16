import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { MessengerPageComponent } from './pages/messenger-page/messenger-page.component';
import { PartyPageComponent } from './pages/party-page/party-page.component';
import { KariosRoutingModule } from './karios-routing.module';
import { StorieComponent } from './components/storie/storie.component';
import { PrimengModule } from '../primeng/primeng.module';
import { PublicationComponent } from './components/publication/publication.component';
import { ChatsItemComponent } from './components/chats-item/chats-item.component';
import { ChatComponent } from './views/chat/chat.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { CreatePublicationComponent } from './views/create-publication/create-publication.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ConfigurationComponent } from './views/configuration/configuration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    MessengerPageComponent,
    PartyPageComponent,
    StorieComponent,
    PublicationComponent,
    ChatsItemComponent,
    ChatComponent,
    ChatPageComponent,
    CreatePublicationComponent,
    HomeComponent,
    ConfigurationComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KariosRoutingModule,
    PrimengModule,
    ImageCropperModule
  ]
})
export class KariosModule { }
