import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  registerForm: FormGroup = this.fb.group({
    username: this.fb.control('', [ Validators.minLength(3), Validators.required ]),
    email: this.fb.control('', [ Validators.email, Validators.required ]),
    password: this.fb.control('', [ Validators.minLength(6), Validators.required ]),
  });

  usernameField = this.registerForm.get('username');
  emailField = this.registerForm.get('email');
  passwordField = this.registerForm.get('password');

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router) {}

  onRegister(){

    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.register({ ...this.registerForm.value, google: 0 })
    .subscribe(resp => {
      this.router.navigate(['/auth/login']);
    })

    this.registerForm.reset();
  }

}
