import { AuthService } from '../../common/services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TokenModel } from '../../common/models/token.model';
import { UserState } from '../../common/core/state-management/state/user.state';
import { UserCredentials } from '../../common/core/state-management/models/user.credential';
import { LOGIN, LOGIN_FAIL } from '../../common/core/state-management/actions/auth.actions';

import * as authStore from '../../common/core/state-management/reducers/auth.reducer';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'ota-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<any>,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      account: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  login(formData) {
    this.store.dispatch({
      type: LOGIN,
      payload: {
        account: formData.account.trim(),
        password: formData.password.trim()
      }
    });/*
     this.store.select(authStore.getAuthState).subscribe(res => {
        this.toastr.error(res.loggedIn.valueOf.toString());
    }); */
  }
}
