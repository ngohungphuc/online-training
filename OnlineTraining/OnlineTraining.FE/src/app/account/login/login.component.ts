import { AuthAction } from '../../common/core/state-management/actions/auth.action';
import { AuthService } from '../../common/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TokenModel } from '../../common/models/token.model';
import { UserState } from '../../common/core/state-management/state/user.state';

@Component({
  selector: 'ota-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store$: Store<UserState>,
    private authAction: AuthAction
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      account: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  login(formData) {
    /* const loginUrl = `auth?grant_type=password&username=${formData.account}&password=${formData.password}`;
    if (this.loginForm.valid) {
      this.authService.Get(loginUrl).subscribe(res => {
        const result = JSON.parse(res.json().data) as TokenModel;
        localStorage.setItem(
          'currentUserInfo',
          JSON.stringify({ 'account': result.account,
             'access_token': result.access_token,
             'expire_in': result.expires_in,
             'refresh_token': result.refresh_token }));
      });
    }*/
    this.store$.dispatch(this.authAction.login({
      account: formData.account,
      password: formData.password
    }));
  }
}
