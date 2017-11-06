import * as authStore from '../store/index';
import { AuthService } from '../../common/services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOGIN, LOGIN_FAIL, REDIRECT } from '../store/actions/auth.actions';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ToastsManager } from 'ng2-toastr';
import { TokenModel } from '../../common/models/token.model';
import { UserState } from '../../common/core/state-management/state/user.state';
import {debounceTime} from 'rxjs/operator/debounceTime';

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
    });
    this.store.select(authStore.selectLoginState).subscribe(res => {
      this.errorMsg = res;
    });
  }

}
