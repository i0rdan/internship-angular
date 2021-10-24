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
