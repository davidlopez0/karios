import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Params, Router } from '@angular/router';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../interfaces/publication.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    userId: 0,
    username: '',
    email: '',
    imageUrl: '',
  }

  publications: any;

  showOptions: boolean = false;

  constructor(private userService: UserService, private router: Router, 
              private publicationService: PublicationService) {  }
              
  ngOnInit(): void {

    const username = this.router.url.split('/')[3];
    const localUser = JSON.parse(localStorage.getItem('user') || '');
    
    if(username === localUser.username){
      this.showOptions = true;
    }

    this.userService.getUserByUsername(username)
    .pipe(
      switchMap(resp => {
                 this.user = resp[0];
          return this.publicationService.getAllPublicationsByUserId(resp[0].userId);
          }
        )
    )
    .subscribe(resp => {
      this.publications = resp;
    })
  }

}
