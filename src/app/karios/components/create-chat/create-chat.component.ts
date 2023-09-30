import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { UserService } from '../../services/user.service';
import { forkJoin, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss']
})
export class CreateChatComponent {

  usernameToSearch: string = '';
  users: any[] = [];
  userSelected: any;
  @ViewChild("createChatButton") createChatButton!: ElementRef<HTMLButtonElement>;

  constructor(private ms: MessengerService, private us: UserService, private router: Router){

  }

  changeValue(): void {
    if(this.usernameToSearch.trim().length > 0){
      this.us.getUserByUsername(this.usernameToSearch)
        .subscribe((resp) => {
          this.users = resp;
        })
    }

    this.createChatButton.nativeElement.disabled = true;
    this.users = [];
  }

  updateSelection(user: any){
    this.userSelected = user;
    this.createChatButton.nativeElement.disabled = false;
  }

  close(): void {
    this.ms.openOrClose = false;
    this.usernameToSearch = '';
    this.userSelected = null;
  }

  createChat(): void {
    let chatIdObtenido!: number;
    const { userId } = JSON.parse(localStorage.getItem("user") || '');
    this.ms.createChat({ chatDate: new Date() })
      .pipe(
        switchMap((resp) => {
            chatIdObtenido = resp.chatId;
            return this.ms.createUserChat({ userId: userId, chatId: chatIdObtenido })
        }),
        switchMap((resp) => {
            return this.ms.createUserChat({ userId: this.userSelected.userId, chatId: chatIdObtenido })
        })
      )
      .subscribe((resp) => {
        this.close();
        this.router.navigate([`/karios/messenger/${resp.chatId}`]);
      })
  }

}
