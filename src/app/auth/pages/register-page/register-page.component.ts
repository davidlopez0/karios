import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  registerForm: FormGroup = this.fb.group({
    username: this.fb.control('', [ Validators.minLength(3) ]),
    email: this.fb.control('', [ Validators.email ]),
  });

  constructor(private fb: FormBuilder) {}

  onRegister(){
    console.log(this.registerForm);
  }

}
