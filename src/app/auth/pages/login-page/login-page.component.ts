import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', Validators.minLength(6)),
  });

  onLogin(form: FormGroup): void {
    throw Error('método que falta por implementar');
  }

}
