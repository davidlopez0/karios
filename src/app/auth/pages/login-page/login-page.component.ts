import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { UserLogin } from '../../interfaces/user-login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  userNotLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router){

  }

  onLogin(form: FormGroup): void {
    

      const username: string = form.controls['username'].value;
      const password: string = form.controls['password'].value;

      this.authService.login(username, password)
      .subscribe((response: HttpResponse<UserLogin>) => {
        this.router.navigate(['/karios/home']);
      })

  }

}
