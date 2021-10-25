import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group({
    login: ['', 
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(16)
    ]],
    password: ['', 
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]]
  });

  constructor(
    private fb: FormBuilder, 
    private storage: StorageService, 
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  get _login() {
    return this.signUpForm.get('login');
  }

  get _password() {
    return this.signUpForm.get('password');
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
      case 'loginMin':
        checkRes = this._login?.errors?.minlength;
        break;
      case 'passMin':
        checkRes = this._password?.errors?.minlength;
        break;
      case 'loginMax':
        checkRes = this._login?.errors?.maxlength;
        break;
      case 'passMax':
        checkRes = this._password?.errors?.maxlength;
        break;
      case 'buttonCheck':
        checkRes = !this._password?.valid || !this._login?.valid;
        break;
      default:
        console.log('No correct');
    }
    return checkRes;
  }

  onSubmit() {
    if(this.storage.onSignUp(this._login?.value, this._password?.value)) {
      alert('Welcome new user!');
      this.route.navigate(['/home']);
    }
    else {
      alert('Such user exists!');
    }
  }

}
