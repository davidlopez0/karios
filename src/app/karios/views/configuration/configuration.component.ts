import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UserLogin } from 'src/app/auth/interfaces/user-login.interface';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

  constructor(private authService: AuthService){  }

  logout(): void {

    this.authService.logout();

  }

  get currentUser(): UserLogin {
    return JSON.parse(localStorage.getItem('user') || '');
  }

}
