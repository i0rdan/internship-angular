import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [StorageService]
})
export class SignInComponent implements OnInit {
  signInForm = this.fb.group({
    login: ['', 
      Validators.required
    ],
    password: ['', 
      Validators.required
    ]
  });

  constructor(
    private fb: FormBuilder, 
    private storage: StorageService, 
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  get _login() {
    return this.signInForm.get('login');
  }

  get _password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    if(this.storage.onSignIn(this._login?.value, this._password?.value)) {
      alert('Welcome!');
      this.route.navigate(['/home']);
    }
    else {
      alert('Check login or password');
    }
  }

  checkValid(param: string) {
    let checkRes: boolean | undefined;
    switch (param) {
      case 'showLoginErr':
        checkRes = this._login?.invalid && (this._login?.dirty || this._login?.touched);
        break;
      case 'showPassErr':
        checkRes = this._password?.invalid && (this._password?.dirty || this._password?.touched);
        break;
      case 'loginReq':
        checkRes = this._login?.errors?.required;
        break;
      case 'passReq':
        checkRes = this._password?.errors?.required;
        break;
      case 'buttonCheck':
        checkRes = !this._password?.valid || !this._login?.valid;
        break;
      default:
        console.log('No correct');
    }
    return checkRes;
  }
}
